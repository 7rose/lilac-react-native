import {Alert, DeviceEventEmitter, Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import homeStore from '../../model/homeStore';
import {home} from '../../asset/image';
import {StatusBarHeight} from '../../asset/screen';
import AntDesign from "react-native-vector-icons/AntDesign"

const title = ['Home', 'Promotion', 'Language','Log Out'];
const imageArr = ['home', 'shoppingcart', 'setting', 'logout'];
import navigatorHelper from './navigatorHelper';
import accountStore from '../../model/accountStore';
import I18nNew from '../../asset/language';
import initAppStore from '../../model/initAppStore';
import FBToast from '../utils/fbToast';

let titleArr = [I18nNew.t('home_home'), I18nNew.t('home_ticket'), I18nNew.t('home_language'), I18nNew.t('home_about'), I18nNew.t('home_logout')];

export default function Drawer() {

    useEffect(() => {
        titleArr = [I18nNew.t('home_home'), I18nNew.t('home_ticket'), I18nNew.t('home_language'), I18nNew.t('home_logout')];
    }, [initAppStore.argForRefresh]);

    titleArr = [I18nNew.t('home_home'), I18nNew.t('home_ticket'), I18nNew.t('home_language'), I18nNew.t('home_logout')];

    return (
        <View
            count={initAppStore.argForRefresh}
            style={{flex: 1, backgroundColor: '#171717', paddingTop: StatusBarHeight}}>
            {titleArr.map((item, index) => {
                return getDrawerItem(item, index);
            })}
        </View>);
}

function getDrawerItem(item, index) {
    return (
        <TouchableOpacity
            onPress={() => {
                if (index === 0) {
                    navigatorHelper.changeTab('Home');
                } else if (index === 1) {
                    navigatorHelper.changeTab('PROMOTION');
                } else if (index === 2) {
                    navigatorHelper.gotoOnLanguageSetting();
                } else if (index === 3) {
                    accountStore.loginOut();
                    navigatorHelper.gotoOnLogin();
                }
                setTimeout(() => {
                    DeviceEventEmitter.emit('closeDrawer');
                }, 500);
            }}
            style={{
                marginTop: 20,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <AntDesign name={imageArr[index]} size={40} color="white" />
            {/*<Image resizeMode={'contain'} source={imageArr[index]} style={{width: 40, height: 40}}/>*/}
            <Text style={{marginTop: 5, fontSize: 14, color: '#FFFFFF'}}>{item}</Text>
        </TouchableOpacity>
    );
}
