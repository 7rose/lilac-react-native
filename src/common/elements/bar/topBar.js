import {Image, ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import _ from 'lodash';
import {RegularColorCode} from '../../../asset/theme';
import {home} from '../../../asset/image';
import navigatorHelper from '../../navigators/navigatorHelper';
import {StatusBarHeight, NavBarHeight} from '../../../asset/screen';

export default function topBar({title, rightButtonTitle, rightButtonEvent, leftItem,style}) {
    return (
        <View
            style={[{flexDirection: 'row',width:SCREEN_W,justifyContent:'center' ,backgroundColor: 'white', height: NavBarHeight, paddingTop: StatusBarHeight},style]}>


            {
                leftItem ? leftItem :
                    <TouchableOpacity style={{position:'absolute',left:0,top:StatusBarHeight,width: 45, height: 45, justifyContent: 'center', alignItems: 'center'}}
                                      onPress={() => {
                                          navigatorHelper.popToBack();
                                      }}>
                        <Image style={{tintColor: '#B1B1B1', width: 25, height: 25}} source={home.goBack}/>
                    </TouchableOpacity>
            }

            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text numberOfLines={1} ellipsizeMode={'tail'} style={{
                    fontSize: 18,
                    textAlign: 'center',
                    color:'#333333',
                }}>{title}</Text>
            </View>

            {rightButtonTitle ? <View>
                <TouchableOpacity style={{position:'absolute',right:0,top:StatusBarHeight,width: 60, height: 50, justifyContent: 'center', alignItems: 'center'}}
                                  onPress={() => {
                                      rightButtonEvent && rightButtonEvent();
                                  }}>
                    <Text style={{fontSize: 14, color: '#333333'}}>{rightButtonTitle}</Text>
                </TouchableOpacity>
            </View> : null}
        </View>
    );
}
