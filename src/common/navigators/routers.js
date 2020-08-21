/**
 * Created by  old father on 2019-07-09.
 * Copyright © 2019年 JX. All rights reserved.
 */
import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator, DrawerView} from 'react-navigation-drawer';

import {createBottomTabNavigator} from 'react-navigation-tabs';
import {fadeIn, fromRight} from 'react-navigation-transitions';
import {createStackNavigator, TransitionPresets} from 'react-navigation-stack';
import {tabPages, mainPages, account} from './pageConfig';
import navigatorHelper from './navigatorHelper';
import {
    TabIconView,
    TabIconViewWithBadge,
} from '../elements/homeIconWithBadge';
import {home} from '../../asset/image';
import userStatusStore from '../../model/accountStore';
import initAppStore from '../../model/initAppStore';
import MyDrawerView from './drawerNavigationView';
import FBToast from '../utils/fbToast';
import {View, Text} from 'react-native';
import NavigationService from './navigationService';
import {observer} from 'mobx-react';
import homeStore from '../../model/homeStore';


let CreateTab = createBottomTabNavigator(
    tabPages,
    {
        defaultNavigationOptions: ({navigation}) => ({
            tabBarButtonComponent: props => {
                const {routeName} = navigation.state;
                let IconComponent = TabIconView;
                let normalIcon, selectedIcon, title, bgImage;
                switch (routeName) {
                    case 'Home':
                        normalIcon = home.bottomButtonHome;
                        selectedIcon = home.bottomButtonHomeLight;
                        bgImage = null;
                        title = 'home_home'
                        break;
                    case 'PROMOTION':
                        normalIcon = home.bottomButtonVideoShopping;
                        selectedIcon = home.bottomButtonVideoShoppingLight;
                        bgImage = null;
                        title = 'home_ticket';
                        break;
                    case 'ACCOUNT':
                        normalIcon = home.bottomButtonFaxian;
                        selectedIcon = home.bottomButtonFaxianLight;
                        bgImage = null;
                        title = 'home_userCenter';
                        break;
                }

                return (
                    // <Icon name="search" color={tintColor} />
                    <IconComponent
                        iconName={normalIcon}
                        selectedIconName={selectedIcon}
                        title={title}
                        bgImage={bgImage}
                        {...props}
                    />
                );
            },
            tabBarLabel: ({focused: boolean, tintColor: string}) => {
                return null;
            },
            tabBarOnPress: ({defaultHandler}) => {
                const navData = navigation.state;
                const routeName = navData.routeName;
                if (routeName === 'LIVE CHAT') {
                   navigatorHelper.goToLiveChat()
                    return;
                }
                defaultHandler();
            },
        }),
    },
    {swipeEnabled: false, animationEnabled: false},
);

const Drawer = createDrawerNavigator({
        TabBar: {
            screen: observer(CreateTab),
            navigationOptions: {
                header: null,
            },
        },
    },
    {
        drawerPosition: 'left',
        drawerWidth: 86,
        drawerLockMode: 'locked-closed',
        useNativeAnimations: true,
        contentComponent: props => {
            return <MyDrawerView/>;
        },
    });

const AppRootStack = createStackNavigator(
    {
        main: Drawer,
        ...mainPages,
        ...account,
    },
    {
        defaultNavigationOptions: {
            header: null,
            ...TransitionPresets,
        },
        cardStyle: {opacity: 1},
        transparentCard: true,
        transitionConfig: nav => {
            initAppStore.rootStack = nav.index;
            const isFirstStack = initAppStore.rootStack === 0;
            if (isFirstStack) {
                initAppStore.setSystemModalVisibility(true);
            }
            return handleCustomTransition(nav);
        },
    },
);

const handleCustomTransition = ({scenes}) => {
    const prevScene = scenes[scenes.length - 2];
    const nextScene = scenes[scenes.length - 1];

    if (
        prevScene &&
        prevScene.route.routeName === 'main'
    ) {
        return fadeIn();
    }
    return fromRight();
};

export default createAppContainer(AppRootStack);
