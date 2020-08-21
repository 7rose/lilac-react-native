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
import I18nNew from '../../asset/language';
import initAppStore from '../../model/initAppStore';


function Page() {

    const textInput1 = useRef({value: 1});
    const textInput2 = useRef({value: 1});
    const [loading, setLoading] = useState(false);

    let [countdown,setCountdown] = useState(60);

    return (
        <View
            argForRefresh={initAppStore.argForRefresh}
            style={{backgroundColor: '#01478D', flex: 1, alignItems: 'center'}}>

            <Image
                // source={home.loginBottom}
                   resizeMode={'cover'}
                   style={{position: 'absolute', bottom: 100, width: SCREEN_W, height: 200}}/>

            <Image
                // source={home.logo}
                   style={{width: 124, height: 86, marginTop: 80}}/>

            <View style={{
                paddingHorizontal: 20,
                width: SCREEN_W - 40,
                marginTop: 26,
                borderRadius: 8,
                backgroundColor: 'rgba(255,255,255,0.1)',
            }}>
                <View style={{borderRadius: 5, backgroundColor: 'rgba(255,255,255,0.6)', marginTop: 20}}>
                    <TextInput
                        onChangeText={(d) => {
                            accountStore.InputText1 = d;
                        }}
                        autoCapitalize={'none'}
                        ref={textInput1}
                        defaultValue={_.isEmpty(accountStore.loginInfo.username) ? null : accountStore.loginInfo.username}
                        keyboardAppearance={'light'}
                        clearButtonMode={'while-editing'}
                        autoFocus={false}
                        placeholderTextColor={'#4A4A4A'}
                        placeholder={I18nNew.t('user_entryPhone')}
                        style={{
                            color: '#333333', height: 38,
                            fontSize: 14, marginHorizontal: 10, fontWeight: 'bold',
                        }}/>
                </View>

                <View style={{borderRadius: 5, backgroundColor: 'rgba(255,255,255,0.6)', marginTop: 20}}>
                    <TextInput
                        onChangeText={(d) => {
                            accountStore.InputText2 = d;
                        }}
                        ref={textInput1}
                        secureTextEntry={true}
                        keyboardAppearance={'light'}
                        clearButtonMode={'while-editing'}
                        placeholderTextColor={'#4A4A4A'}
                        placeholder={I18nNew.t('user_entryVerificationCode')}
                        style={{
                            color: '#333333', height: 38,
                            fontSize: 14, marginHorizontal: 10, fontWeight: 'bold',
                        }}/>
                </View>


                <View style={{marginTop: 18, justifyContent: 'space-between', flexDirection: 'row'}}>
                    <TouchableOpacity>
                        {/*<Text style={{fontSize: 14}}>Forget Password？</Text>*/}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{
                        if (loading){
                            return
                        }
                        if (!accountStore.isPhoneNumber(accountStore.InputText1)){
                            FBToast.showShortCenter('请输入正确的手机号')
                            return;
                        }

                       let t =  setInterval(()=>{
                           setCountdown(countdown--)
                           if (countdown === 0){
                               clearInterval(t)
                               setCountdown(60)
                               setLoading(false)
                           }
                        },1000)
                        setLoading(true)
                        accountStore.getSMS()
                    }}>
                        <Text style={{color: 'white', fontSize: 14}}>{loading?(countdown +' s'):I18nNew.t('user_getVerificationCode')}</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={d => {
                    accountStore.login();
                }}>
                    <LinearGradient
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                        colors={['#0D76D0', '#40BCF9']} style={{
                        borderRadius: 5,
                        height: 34,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 27,
                        marginTop: 27,
                    }}>
                        <Text style={{color: 'white', fontSize: 14}}>{I18nNew.t('user_login')}</Text>
                    </LinearGradient>
                </TouchableOpacity>

            </View>

            <TouchableOpacity
                onPress={() => {
                    navigatorHelper.gotoOnLanguageSetting();
                }}
                style={{position: 'absolute', bottom: 40}}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 34}}>
                    <Image source={home.language} style={{width: 22, height: 22}}/>
                    <Text style={{color: 'white', marginLeft: 7, fontSize: 14}}>{I18nNew.t('home_language')}</Text>
                </View>
            </TouchableOpacity>


        </View>);
}

export default observer(Page);
