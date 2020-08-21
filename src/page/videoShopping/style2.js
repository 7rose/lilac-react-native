import {Image, ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import FbFastImagePhd from '../../common/elements/image/fbImage-placeholder';
import _ from 'lodash';
// import {element, home} from '../../../asset/image';
import {getBuyFee, getSellNumber, showPrice} from '../../common/utils/helper';
import {home} from '../../asset/image';

export function Style2({data, onPress, type = 'hdk'}) {

    let title = data.content.title;
    let sub_title = data.content.sub_title;
    let url = _.get(data, 'content.cover');
    let rate_total = '123';
    let w = (SCREEN_W - 30) / 2;

    return (
        <TouchableOpacity onPress={onPress}
                          style={{
                              borderRadius: 5,
                              marginLeft: 10, backgroundColor: 'white', width: w,
                          }}
        >
            <FbFastImagePhd
                // defaultSource={element.defaultIMG}
                resizeMode={'cover'}
                url={url}
                width={w}
                height={w}
                style={{borderRadius: 5, width: w, height: w}}
            />
            <View style={{
                paddingHorizontal: 3,
                paddingVertical: 2,
                borderRadius: 3,
                alignItems: 'center',
                left: 10,
                top: 5,
                backgroundColor: 'rgba(0,0,0,0.5)',
                position: 'absolute',
                flexDirection: 'row',
            }}>
                <Image
                    source={home.animated}
                    style={{width: 20, height: 20}}/>
                <Text style={{marginLeft: 0, color: 'white'}}> {rate_total}观看</Text>
            </View>
            <Image
                // source={element.videoShopping.bofang}
                style={{position: 'absolute', width: 40, height: 40, left: w / 2 - 20, top: w / 2 - 20}}/>
            <View style={{width: w, borderBottomWidth: 0.44, paddingHorizontal: 4, borderBottomColor: '#EEEEEE'}}>
                <ImageBackground resizeMode={'stretch'}
                    // source={data['user_type'] === 0 ? element.taobao : element.tianmao}
                                 style={{position: 'absolute', top: 12, left: 4, width: 30, height: 15}}/>
                <Text numberOfLines={2} style={{
                    lineHeight: 18,
                    height: 42,
                    marginTop: 12,
                    width: w,
                    fontSize: Size.font15,
                    color: '#333333',
                }}> {title}</Text>
                <View style={{marginTop: 5, flexDirection: 'row', justifyContent: 'space-between'}}>

                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', height: 28}}>
                    <Text style={{color:'#666666'}}> {sub_title}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

