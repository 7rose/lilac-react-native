/**
 * Created by  old father on 2020-3-29.
 * Copyright © 2020年 MMFashion. All rights reserved.
 *
 */

import React, {useEffect, useCallback} from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    ImageBackground,
    ScrollView,
    Text,
} from 'react-native';
import {AppState} from 'react-native';
import CreaterTab from '../../common/navigators/routers';
import NavigationService from '../../common/navigators/navigationService';
import {Provider} from 'mobx-react';
import accountStore from '../../model/accountStore';
import FBToast from '../../common/utils/fbToast';
import navigatorHelper from '../../common/navigators/navigatorHelper';
import _ from 'lodash';

let firstLaunch = true;

const appStores = {
    accountStore,
};

export default function App() {
    const handleAppStateChange = useCallback(nextAppState => {
        if (nextAppState === 'active') {

        }
    }, []);

    useEffect(() => {
        AppState.addEventListener('change', handleAppStateChange);
        return () => {
            AppState.removeEventListener('change', handleAppStateChange);
        };
    }, [handleAppStateChange]);

    if (firstLaunch) {
        firstLaunch = false;
    }

    return (
        <Provider {...appStores}>
            <CreaterTab
                ref={navigatorRef => {
                    NavigationService.setTopLevelNavigator(navigatorRef);
                }}
            />
        </Provider>
    );
}
