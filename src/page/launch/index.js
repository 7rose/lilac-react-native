/**
 * Created by  old father on 2020-3-29.
 * Copyright © 2020年 MMFashion. All rights reserved.
 *
 */
import React from 'react';
// import StatusBar from "@react-native-community/status-bar";
import homeStore from '../../model/homeStore';

import {observer} from 'mobx-react';
import Main from './main';
import LoadingSpinnerOverlay from '../../common/elements/loading/loadingSpinnerOverlay';
import {StatusBar} from 'react-native';
import Login from '../../page/Login/login';
import {initialMode} from 'react-native-dark-mode';

function getLoginView() {
    return <Login/>
}

function getContentView() {
    return (
        <>
            {addStatusBar()}
            <Main/>
            <LoadingSpinnerOverlay
                ref={component => (homeStore.refSpinner = component)}
            />
        </>
    );
}

function addStatusBar() {
    return (
        <StatusBar
            hidden={false}
            animated={true}
            translucent={true}
            backgroundColor={'transparent'}
            barStyle= { initialMode === 'dark' ? "light-content" : "dark-content" }
        />
    );
}

function launch() {
    // let isDarkMode = useDarkMode();
    return (
        <>
            {getContentView()}
            {/*{accountStore.isLogin?this.getContentView():this.getLoginView()}*/}
        </>
    )
}

export default observer(launch);
