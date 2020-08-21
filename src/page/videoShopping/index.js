import React, {useEffect, useState, useRef, Fragment} from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    ImageBackground,
    ScrollView,
    Text,
    TouchableOpacity, Image, RefreshControl, Clipboard,
} from 'react-native';
import {observer} from 'mobx-react-lite';
import _ from 'lodash';
import navigatorHelper from '../../common/navigators/navigatorHelper';
import videoShoppingStore from '../../model/videoShoppingStore';
import {DefaultTabBar, ScrollableTabBar, ScrollableTabView} from 'react-native-vtron-scrollable-tab';
import {StatusBarHeight} from '../../asset/screen';
import FBToast from '../../common/utils/fbToast';
import {Style2} from './style2';

function Page(items) {
    useEffect(() => {
        videoShoppingStore.getPageData(0);
    }, []);

    let titleArr = ['热门', '关注'];
    // let titleArr = ['热门','百变穿搭','时尚潮男','舒适好物','美妆达人',]

    return (
        <View style={{flex: 1}}>
            <ScrollableTabView
                onChangeTab={(fromIndex, toIndex) => {
                    if (_.isEmpty(videoShoppingStore.pageData[toIndex])) {
                        videoShoppingStore.getPageData(toIndex);
                    }
                }}
                scrollEnabled={true}
                renderTabBar={() => {
                    return (
                        <DefaultTabBar
                            containerStyle={{
                                backgroundColor: '#0D76D0',
                                borderBottomWidth: 0.5,
                                borderBottomColor: '#EEEEEE',
                            }}
                            tabContainerStyle={{marginHorizontal:100,marginTop: StatusBarHeight, height: 40, justifyContent: 'space-around'}}
                            activeTabStyle={{paddingHorizontal: 15}}
                            activeTabTitleStyle={{fontSize: 17, color: 'white'}}
                            inactiveTabStyle={{paddingHorizontal: 15}}
                            inactiveTabTitleStyle={{fontSize: 15, color: '#fecdc8'}}
                            tabBgStyle={{height: 0}}
                        />
                    );
                }}
            >
                {titleArr.map((item, index) => {
                    let listIndex = index;
                    return (
                        <FlatList
                            listKey={`index=${index}`}
                            numColumns={2}
                            columnWrapperStyle={
                                {marginTop: 10}
                            }
                            tab={{title: item}}
                            refreshing={videoShoppingStore.refreshing}
                            onRefresh={d => {
                                videoShoppingStore.getPageData();
                            }}
                            keyExtractor={(item, index) => `1videoShopping${item}${index}`}
                            data={videoShoppingStore.pageData ? videoShoppingStore.pageData[index] : 0}
                            // ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
                            renderItem={
                                ({item, index}) => (
                                    renderRow(item, listIndex, index))
                            }
                        />);
                })}
            </ScrollableTabView>
        </View>
    );
}


function renderRow(category, listIndex, index) {
    return (
        <Style2 data={category} onPress={() => {
            navigatorHelper.gotoVideoShoppingDetail(index, listIndex);
        }}/>
    );
}


export default observer(Page);


const styles = StyleSheet.create({
    listSeparator: {
        paddingBottom: 5,
    },

    indicatorContainer: {
        alignItems: 'center',
    },
    indicator: {
        color: 'red',
        margin: 10,
    },

});
