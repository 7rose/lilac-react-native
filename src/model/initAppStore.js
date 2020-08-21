import {action, observable} from 'mobx';
import _ from 'lodash';
import userStore from './accountStore';

import FBToast from '../common/utils/fbToast';
import {getAppVersion, getCountry, getGuide, getSEO} from '../common/services/requestService';
import {StorageKey, StorageUtils} from '../common/utils/storageUtils';

import I18n from '../asset/language';
import {Alert, Linking, NativeModules, Platform} from 'react-native';
import navigatorHelper from '../common/navigators/navigatorHelper';
import DeviceInfo, {getDeviceId, getUniqueId} from 'react-native-device-info';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import ApolloClient from 'apollo-boost';


class InitAppStore {
    @observable refSpinner = null;
    @observable countryList = [];
    @observable argForRefresh = 0;
    @observable guide = {};
    @observable logo = '';
    @observable liveChatId = '';
    @observable lastUserSettingLanguage = 'en';


    constructor() {
        this.initAppCacheData();
        this.requestUserPermission();
        this.createNotificationListeners();
    }

    // 设置语言
    @action
    setLocate(name) {
        this.argForRefresh += 1;
        I18n.locale = name;

        //存储用户设置语言
        StorageUtils.saveDataToStorage(StorageKey.LastUserSettingLanguage, name);
    }

    @action
    getLocale() {
        return I18n.currentLocale().toUpperCase().replace('ZH', 'CN');
    }


    @action
    setArgForRefresh() {
        this.argForRefresh += 1;
    }


    getApolloClient() {
        let client = new ApolloClient({
            uri: 'https://lilac.viirose.com/graphql',
            headers: {
                'device-id': getUniqueId(),
                'Authorization':'Bearer '+userStore.token
            },
        });
        return client
    }

    getInfo() {
        this.getAppVersion();
    }

    async initAppCacheData() {
        let results = await StorageUtils.getAllStorageData().catch(error => {
        });
        if (results && results.length > 0) {
            if (!_.isEmpty(results[5])) {
                userStore.loginInfo = results[5];
                userStore.isLogin = true;
                userStore.InputText1 = _.get(userStore.loginInfo, 'username');
                setTimeout(() => {
                    if (_.isEmpty(userStore.token)) {
                        navigatorHelper.gotoOnLogin();
                    }
                }, 10);
            } else {
                //空token 直接跳转去登录
                setTimeout(() => {
                    if (_.isEmpty(userStore.token)) {
                        navigatorHelper.gotoOnLogin();
                    }
                }, 10);
            }

            if (!_.isEmpty(results[4])) {
                userStore.userInfo = results[4];
            }
            if (!_.isEmpty(results[7])) {
                // searchStore.historyWorlds = results[7];
            }
            if (!_.isEmpty(results[8])) {
                this.setLocate(results[8]);
            }
            if (!_.isEmpty(results[6])) {
                this.countryList = results[6];
            }
        }
        this.getInfo();
    }

    // 设定全局化Loading Spinner是否显示
    @action
    setSpinnerVisibility(show) {
        if (!this.refSpinner) {
            return;
        }

        setTimeout(() => {
            show ? this.refSpinner.show() : this.refSpinner.hide();
        }, 100);
    }

    @action
    setSystemModalVisibility(b) {

    }

    //检测app更新
    getAppVersion() {
        getAppVersion().then((d) => {
            if (d.rs) {
                let info = _.get(d, 'content.' + Platform.OS, false);
                if (info) {
                    //native 版本号存储
                    if (DeviceInfo.getVersion() !== info.version) {
                        //去升级
                        if (Platform.OS === 'ios') {
                            Alert.alert('NEW VERSION', '\n' + info.content.replace(/n/g, '\n'), [
                                {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                                {
                                    text: 'upgrade', onPress: () => {
                                        navigatorHelper.gotoLinkOpenURL(info.url);
                                    },
                                },
                            ]);
                        } else {
                            this.appUpdate(info);
                        }
                    }
                }
            }
        });
    }

    /**
     * 安卓应用内更新
     */
    appUpdate(info) {
        let url = info.url;
        let isBrowserDownload = 2;
        let compulsory = 0;
        //android 这里要进行判断，如是是需要跳转浏览器则直接跳转浏览器，如果是不支持，直接应用内更新
        if (isBrowserDownload === 1) {
            Linking.openURL(url);
        } else if (isBrowserDownload === 2) {
            NativeModules.FBHelper.updateApp(
                url,
                compulsory,
                info.version,
                info.content,
            );
        }
    }

    async requestUserPermission() {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log('Authorization status:', authStatus);
        }
        this.createNotificationListeners();
    }

    async createNotificationListeners() {
        messaging().onMessage(async remoteMessage => {
            this.showAlert(remoteMessage.notification.title, remoteMessage.notification.body);
        });
    }

    showAlert(title, body) {
        Alert.alert(
            title, body,
            [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
        );
    }
}

const initAppStore = new InitAppStore();
export default initAppStore;
