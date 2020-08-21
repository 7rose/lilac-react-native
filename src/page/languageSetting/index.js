import React, {useEffect, useState, useRef, Fragment} from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    ImageBackground,
    ScrollView,
    Text, TouchableOpacity, Image, TextInput,
} from 'react-native';
import {observer} from 'mobx-react-lite';
import _ from 'lodash';
import homeStore from '../../model/homeStore';
import accountStore from '../../model/accountStore';
import {RegularColorCode} from '../../asset/theme';
import {home} from '../../asset/image';
import FBToast from '../../common/utils/fbToast';
import navigatorHelper from '../../common/navigators/navigatorHelper';
import LinearGradient from 'react-native-linear-gradient';
import TopBar from '../../common/elements/bar/topBar';
import initAppStore from '../../model/initAppStore';

let country = {
    Singapore:['中文','ENGLISH'],
}

function Page() {

    function getItem(countryStr) {
        return (
            <View style={{marginHorizontal:25,marginTop:20}}>
                {/*<Text style={{fontSize:14,color:'#989898'}}>{countryStr}</Text>*/}
                <View style={{marginTop:10,flexDirection:'row',alignItems:'center'}}>
                    {/*<Image source={home[countryStr]} style={{width:30,height:30}}/>*/}
                    {
                        country[countryStr].map((item,index)=>{
                            return (
                                <TouchableOpacity style={{alignItems:'center',height:30,flexDirection:'row'}} onPress={()=>{
                                    ChangeLanguage(item)
                                }}>
                                    <Text style={{marginHorizontal:17,fontSize:14,color:'#666666'}}>{item}</Text>
                                    {index<=country[countryStr].length-2?<View style={{backgroundColor:'#D8D8D8',width:1,height:15}}/>:null}
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>);
    }

    function ChangeLanguage(item) {
        switch (item) {
            case 'ENGLISH':{
                initAppStore.setLocate('en')
                navigatorHelper.popToBack()
                break;
            }
            case '中文':{
                initAppStore.setLocate('zh')
                navigatorHelper.popToBack()
                break;
            }
            case 'MALAY':{
                initAppStore.setLocate('my')
                navigatorHelper.popToBack()
                break;
            }
            case 'BHS INDONESIA':{
                initAppStore.setLocate('id')
                navigatorHelper.popToBack()
                break;
            }
            case 'เมืองไทย':{
                initAppStore.setLocate('th')
                navigatorHelper.popToBack()
                break;
            }
            case 'Việt Nam':{
                initAppStore.setLocate('vi')
                navigatorHelper.popToBack()
                break;
            }
        }
    }

    return (
        <View style={{backgroundColor: '#E9E9E9', flex: 1}}>
            <TopBar title={'Region and Language'}/>
            <View>
                {Object.keys(country).map((item,index)=>{
                    return getItem(item)
                })}
            </View>
        </View>);
}


export default observer(Page);
