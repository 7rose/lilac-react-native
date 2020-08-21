import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import FbFastImagePhd from '../../common/elements/image/fbImage-placeholder';
import _ from 'lodash'
// import {element} from '../../../asset/image';
import {getBuyFee, getSellNumber,showPrice} from '../../common/utils/helper';

export function Style3({data,onPress,type = 'hdk'}) {
    let coupon_info_money = _.get(data,'coupon_info_money',0)
    let is_coupon = coupon_info_money > 0
    if (is_coupon){
        coupon_info_money = _.replace(coupon_info_money,'.00','')
    }
    let title = data.title
    let shop_title = data.shop_title
    let url = _.get(data,'pict_url')
    let fee = getBuyFee(data.quanhou_jiage,data.tkrate3)[0]
    let sellCount = getSellNumber(data.sellCount)
    let qhjg = showPrice(data.quanhou_jiage);
    let yj = data.size
    if(type==='self'){
        url =  _.get(data,'pict_url')
        fee = data.commission
        sellCount = data.volume
        is_coupon = data.is_coupon
        coupon_info_money = data.coupon_amount
        qhjg = showPrice(data.jh_price)
        yj = data.zk_price
    }else if(type === 'hdk'){
        title = data.itemtitle
        shop_title = data.shopname
        url =  _.get(data,'itempic')
        fee = getBuyFee(data.itemendprice,data.tkrates)[0]
        sellCount = getSellNumber(data.itemsale)
        is_coupon = data.couponmoney > 0
        coupon_info_money = data.couponmoney
        qhjg = showPrice(data.itemendprice)
        yj = data.zk_price
    }
    return (
        <TouchableOpacity onPress={onPress} style={{
            borderRadius:6,
            width:SCREEN_W-22,
            backgroundColor:'white',height:97,flexDirection:'row'}}
        >
            <FbFastImagePhd
                // defaultSource={element.defaultIMG}
                url={url}
                width={130}
                height={130}
                style={{borderRadius:5,width:83,height:83,margin:10}}/>
            <View style={{height:150,borderBottomWidth:0.44,borderBottomColor:'#EEEEEE'}}>
                <ImageBackground resizeMode={'stretch'}
                                 // source={data['user_type'] === 0?element.taobao:element.tianmao}
                                 style={{position:'absolute',top:12,width:30,height:15}}/>
                <Text numberOfLines={1} style={{lineHeight:18,height:21,marginTop:12,width:SCREEN_W-130,fontSize:Size.font15, color:'#333333'}}>{'       '+title}</Text>
                <View style={{marginTop:5,flexDirection:'row',justifyContent:'space-between'}}>

                    {is_coupon?<ImageBackground resizeMode={'stretch'}
                                                // source={element.youhuiquan}
                                                style={{flexDirection:'row',padding:1,justifyContent:'center',alignItems:'center',height:17}}>
                        <Text style={{marginLeft:5,fontSize:Size.font11,color:'white'}} >￥</Text>
                        <Text style={{fontSize:Size.font12,color:'white'}}>{coupon_info_money}</Text>
                        <Text style={{marginRight:5,fontSize:Size.font12,color:'white'}} > 券</Text>
                    </ImageBackground>:<View/>}


                    <View style={{backgroundColor:"#ffe9ea",marginRight:10,
                        justifyContent:'center',alignItems:'center',height:20}}>
                        <Text style={{marginLeft:5,marginRight:5,fontSize:11,color:'#ff3b30'}}>预估收益:¥{fee}</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',height:28}}>
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'baseline'}}>
                        <Text style={{color:'#ff3b30',fontSize:Size.font12}}>￥</Text>
                        <Text style={{color:'#ff3b30',fontSize:Size.font18}}>{qhjg}</Text>
                        <Text style={{textDecorationLine:'line-through',color:'#999999',marginLeft:10,fontSize:Size.font12}}>{}</Text>
                    </View>
                    <Text style={{marginRight:10,marginTop:10,color:'#999999'}}>月销{sellCount}件</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}
