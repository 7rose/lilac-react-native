/**
 /**
 * Created by  old father on 2017/1/5.
 * Copyright © 2016年 JX. All rights reserved.
 */
import NavigationService from './navigationService';
import homeStore from '../../model/homeStore';
import accountStore from '../../model/accountStore';
// import Toast from "../utils/fbToast";
const Helper = new class Helper {
};
// import dismissKeyboard from "dismissKeyboard";
// import FBHelper from "../utils/fbHelper";
import _ from 'lodash';

export default Helper;

import FBToast from '../utils/fbToast';
import {getGameUrl, getSlotGameUrl} from '../services/requestService';
import {Linking} from 'react-native';
import initAppStore from '../../model/initAppStore';
import I18nNew from '../../asset/language';

Helper.popToBack = () => {
    // dismissKeyboard();
    NavigationService.goBack();
};

Helper.popToTop = () => {
    // dismissKeyboard();
    NavigationService.popToTop();
};

Helper.checkLoginStatus = () => {
    let isLogin = accountStore.isLogin;
    if (!isLogin) {
        Helper.gotoOnLogin();
        return false;
    }
    return true;
};

Helper.checkUserWhetherLogin = () => {
    return accountStore.isLogin;
};
/**
 * 返回多级页面
 * @param n
 * @param routers
 * @param navigation
 */
Helper.popN = (n, routers, navigation) => {
    let length = routers.length;
    if (n === length - 1) {
        Helper.popToTop();
    } else if (n < length - 1) {
        let backRouter = routers[length - n - 1];
        navigation.goBack(backRouter.key);
    } else {
        return;
    }
};

Helper.popToN = n => {
    NavigationService.popN(n);
};

// function routInStack(routeName, navigator) {
//   let routes = navigator.getCurrentRoutes();
//   if (routes.length >= 2) {
//     let lastRoute = routes[routes.length - 2];
//     if (lastRoute.name === routeName) {
//       return true;
//     } else {
//       return false;
//     }
//   } else {
//     return false;
//   }
// }

/**
 * 控制页面返回任意指定页面
 * @param routers
 * @param navigation
 */
Helper.goBack = navigation => {
    let routers = NavigationService.getRoutes();
    JXLog('xxxxx5', routers);
    if (!routers) {
        Helper.popToTop();
        return;
    }
    let curentRoute = routers[routers.length - 1];
    if (curentRoute.routeName === 'BillSucceedPage') {
        let backToPathName = curentRoute.params.pagePathName;
        for (let i = 0; i < routers.length; i++) {
            if (routers[i].routeName === backToPathName) {
                // if (i + 1 === routers.length) {
                //     navigation.goBack(null);
                //     return;
                // }
                navigation.goBack(routers[i + 1].key);
                return;
            }
        }
    } else {
        Helper.popToBack();
    }
};

////////////////////////////////////////////////跳转到指定页面//////////////////

////////////////////////////////////////////////共用相关页面//////////////////

/**
 * @param url
 * @param title
 */
Helper.goToLiveChat = () => {
    let url = `https://secure.livechatinc.com/licence/${initAppStore.liveChatId}/v2/open_chat.cgi`;
    NavigationService.navigate('webView', {url, title: I18nNew.t('home_liveChat')});
};

Helper.goToBasicWebView = (url, title) => {
    if (_.isEmpty(url)) {
        return;
    }
    if (_.startsWith(url, 'http://') || _.startsWith(url, 'https://')) {
        NavigationService.navigate('webView', {url, title});
    }
};

Helper.goToTabWebView = (action) => {
    if (_.isEmpty(action)) {
        return;
    }
    if (!Helper.checkLoginStatus()){ return;}
    NavigationService.navigate('tabWebView', {action});
};

Helper.gotoLinkOpenURL = (url) => {
    Linking.canOpenURL(url).then(supported => {
        if (!supported) {
        } else {
            return Linking.openURL(url);
        }
    }).catch(err =>{}
        // console.error('An error occurred', url)
    );
};


/**
 * 切换tab页面
 * @param pageName
 */
Helper.changeTab = (pageName, params) => {
    NavigationService.navigate(pageName, params);
};

Helper.goToTabUserCenter = () => {
    Helper.changeTab('UserCenter');
};

/**
 * 登陆
 */
Helper.gotoOnLogin = () => {
    NavigationService.navigate('Login');
};

/**
 * 注册
 */
Helper.gotoOnRegister = () => {
    NavigationService.navigate('Register');
};

Helper.gotoOnRegisterWithPhone = () => {
    NavigationService.navigate('registerPhone');
};

Helper.gotoOnLanguageSetting = () => {
    NavigationService.navigate('languageSetting');
};



Helper.gotoWebGameFullView = (url) => {
    NavigationService.navigate('WebGameFullView', {
        gameUrl: url,
    });
};

Helper.gotoWebGameFullViewNew = (url) => {
    NavigationService.navigate('WebGameFullViewNew', {
        gameUrl: url,
    });
};

//  params
// {
//       platform:item.platform,
//       category:item.category,
//       gameId:'XXX'
// }
Helper.startGame = (params) => {
    if (!Helper.checkLoginStatus()){ return;}
    if (params.category === 'Slot') {
        let action = 'ElectronicGameListPage';
        let url = '';
        if (params.name === '918kiss' || params.name === 'Mega888' || params.name === 'Pussy888') {
            action = 'PlatformInfoPage';
            //             //category，platform,demo,icon
            let data = {
                platform: params.platform,
                demo: _.get(params,'demo',false),
                category: params.category,
                icon: params.icon,
            };
            let dataJson = JSON.stringify(data)
            dataJson = encodeURIComponent(dataJson)
            url = `${accountStore.domain}?action=${action}&token=${accountStore.token}&data=${dataJson}&language=${initAppStore.getLocale()}`;
            Helper.gotoWebGameFullView(url);
        } else {
            let data = {
                platform: params.platform,
                demo: _.get(params,'demo',false),
            };
            let dataJson = JSON.stringify(data)
            url = `${accountStore.domain}?action=${action}&token=${accountStore.token}&data=${dataJson}&language=${initAppStore.getLocale()}`;

            JXLog('\n'+url)

            Helper.gotoWebGameFullView(url);
        }

        // getSlotGameUrl(params.platform, params.gameId).then(d => {
        //     if (_.get(d, 'rs')) {
        //         let url = _.get(d, 'content.path', 'https://goo.com');
        //         // Helper.goToBasicWebView(url);
        //         NavigationService.navigate("WebGameFullView", {
        //             gameUrl: url,
        //             // platformType: platformType
        //         })
        //     } else {
        //         FBToast.showShortCenter('err2');
        //     }
        // });
    } else {
        getGameUrl(params.platform).then(d => {
            if (_.get(d, 'rs')) {
                let url = _.get(d, 'content.path', 'https://goo.com');
                Helper.gotoWebGameFullView(url);
            } else {
                FBToast.showShortCenter('err');
            }
        });
    }
};

/**
 * 在线客服
 */
Helper.gotoOnlineService = () => {
    NavigationService.navigate('ContactUs');
};
////////////////////////////////////////////////首页相关页面//////////////////


/**
 * 边看边买详情
 */
Helper.gotoVideoShoppingDetail = (listIndex,tabIndex) => {
    NavigationService.navigate("VideoShoppingDetail",{listIndex,tabIndex});
};






