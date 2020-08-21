import {observer} from 'mobx-react-lite';
import React, {useEffect} from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    ActivityIndicator,
    Clipboard
} from 'react-native';
import Video from 'react-native-video';
import {StatusBarHeight} from '../../asset/screen';
import videoShoppingStore from '../../model/videoShoppingStore';
// import {element} from '../../asset/image';
import navigatorHelper from '../../common/navigators/navigatorHelper';
import {Style3} from './style3';
import FBToast from '../../common/utils/fbToast';
import Video1 from './video';
import homeStore from '../../model/homeStore';
// import favoriteStore from '../../model/favoriteStore';
import _ from 'lodash';
import userStore from '../../model/accountStore';

function Page(items) {
    let myTabIndex = items.navigation.state.params.tabIndex
    let myListIndex = items.navigation.state.params.listIndex
    JXLog(' \n x111 '+myTabIndex)
    JXLog(' \n x222 '+myListIndex)

    videoShoppingStore.setCurrent(myListIndex);

    useEffect(() => {

    }, []);

   function _onViewableItemsChanged({viewableItems, changed}) {
        //这个方法为了让state对应当前呈现在页面上的item的播放器的state
        //也就是只会有一个播放器播放，而不会每个item都播放
        //可以理解为，只要不是当前再页面上的item 它的状态就应该暂停
        //只有100%呈现再页面上的item（只会有一个）它的播放器是播放状态
        if(viewableItems.length === 1){
            videoShoppingStore.setCurrent(viewableItems[0].index)
            console.log('当选第 '+changed[0].index+' 个视频')
        }
       // console.log('111 '+ JSON.stringify(viewableItems));
        console.log('\n 222 '+ JSON.stringify(changed[0].index));
   }

    function onBuffer() {
       return <ActivityIndicator
           size={'small'}
       />
    }

    function videoError() {
        return <View><Text>视频加载出错</Text></View>
    }

    function renderItem(item,index){
        let title = _.get(item,'content.title');
        let cover = _.get(item,'content.cover');

        return(
            <View style={{flex:1,width:SCREEN_W,height:SCREEN_H+StatusBarHeight}}>
                <TouchableOpacity style={{flex:1}} onPress={()=>{
                    // this.setState({
                    //     isPause:!this.state.isPause,
                    // })
                    JXLog('点击了暂停按键')
                    // videoShoppingStore.setPause(!videoShoppingStore.isPause)
                }}>
                    <Video1 item={item} index={index}/>
                </TouchableOpacity>
                {/*信息（头像，标题等）、写评论*/}
                <View style={{position:'absolute',top:StatusBarHeight,left:20,borderRadius:8,padding:5,backgroundColor:'rgba(1,1,1,0.4)'}}>
                    <Text style={{fontSize:17,color:'white'}}>{item.shopname}</Text>
                    <Text style={{marginTop:5,fontSize:14,color:'white'}}>{item.dy_video_like_count} 点赞</Text>
                </View>

                {/*关闭按钮*/}
                <TouchableOpacity column
                                  onPress={()=>{
                                      navigatorHelper.popToBack();
                                  }}
                                  style={{
                                      width:44,height:44,
                                      position:'absolute',right:20,top:40}}>
                    <Image
                        // source={element.videoShopping.guanbi}
                        style={{width:22,height:22}}/>
                </TouchableOpacity>

                {/*右边的按钮 收藏 复制*/}
                <View column style={{position:'absolute',bottom:250,right:10}}>
                    <TouchableOpacity column
                                      onPress={()=>{
                                          favorites(true,item.itemid)
                                      }}>
                        <Image
                            // source={element.videoShopping.shoucang}
                               style={{width:44,height:44}}/>
                    </TouchableOpacity>

                    <TouchableOpacity column
                                      style={{marginTop:20}}
                                      onPress={()=>{
                                          Clipboard.setString(item.itemtitle);
                                          FBToast.showShortCenter('标题复制成功')
                                      }}>
                        <Image
                            // source={element.videoShopping.fuzhibiaoti}
                            style={{width:44,height:44}}/>
                    </TouchableOpacity>
                </View>

                {/*底部 */}
                <View column style={{position:'absolute',bottom:StatusBarHeight+30,left:10}}>
                    <View style={{borderRadius:8,padding:3,marginRight:10,marginBottom:5,backgroundColor:'rgba(1,1,1,0.4)'}}>
                    <Text style={{fontSize:16,color:'white'}}>{title}</Text>
                    </View>

                </View>
                {/* 屏幕中央 播放按钮 */}
                {/*{*/}
                {/*    videoShoppingStore.isPause?*/}
                {/*        <View column center flex style={{position:'absolute',justifyContent:'center',alignItems:'center',width:SCREEN_W,height:h-200,top:100,}}>*/}
                {/*            <TouchableOpacity*/}
                {/*                onPress={()=>{*/}
                {/*                    videoShoppingStore.isPause = !videoShoppingStore.isPause;*/}
                {/*                }}*/}
                {/*            >*/}
                {/*                <Image source={element.videoShopping.bofang} resizeMode={'contain'} style={{width:60,height:60}} />*/}
                {/*            </TouchableOpacity>*/}
                {/*        </View>:null*/}
                {/*}*/}
            </View>
        )
    }

    const VIEWABILITY_CONFIG = {
        waitForInteraction: false,
        viewAreaCoveragePercentThreshold: 100
    }

    return (
        <View style={{height:SCREEN_H+StatusBarHeight}}>
        <FlatList
            style={{flex:1}}
            initialScrollIndex={myListIndex}
            data={videoShoppingStore.pageData[myTabIndex]}
            renderItem={({ item, index })=>renderItem(item,index)}
            horizontal={false}
            pagingEnabled={true}
            getItemLayout={(data, index) => {
                return {length: SCREEN_H+StatusBarHeight, offset: (SCREEN_H+StatusBarHeight) * index, index}
            }}
            keyExtractor={(item, index) => index.toString()}
            viewabilityConfig={VIEWABILITY_CONFIG}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            onViewableItemsChanged={({viewableItems,changed})=>_onViewableItemsChanged({viewableItems,changed})}
        />
            {/*顶部 关闭、搜索 按钮*/}
            {/*<View style={{position:'absolute',width:SCREEN_W,}}>*/}
            {/*    <View row style={{justifyContent: 'space-between',alignItems: 'center',width:SCREEN_W,padding:20}} >*/}
            {/*        <TouchableOpacity onPress={()=>{*/}
            {/*            this.props.navigation.goBack();*/}
            {/*        }}>*/}
            {/*            <Image source={element.dianpu}*/}
            {/*                   style={{width:30,height:30}} />*/}
            {/*        </TouchableOpacity>*/}
            {/*        <TouchableOpacity >*/}
            {/*            <Image source={element.dianpu}*/}
            {/*                   style={{width:30,height:30}} />*/}
            {/*        </TouchableOpacity>*/}
            {/*    </View>*/}
            {/*</View>*/}
        </View>
    )
}

function favorites(add,goods_id){
    if (!userStore.isLogin){
        FBToast.showShortCenter('登录后才可以收藏')
        return
    }
    if(add){
        FBToast.showShortCenter('收藏成功')
        // homeStore.setSpinnerVisibility(true)
        // favoriteStore.add(goods_id).then(d=>{
        //     homeStore.setSpinnerVisibility(false)
        //     if (_.get(d,'content.status') === 0){
        //         // goodsDetailsStore.refreshData(goods_id)
        //         FBToast.showShortCenter('收藏成功')
        //     }else {
        //         FBToast.showLongCenter(_.get(d,'content.message'))
        //     }
        // })
    }else{
        FBToast.showShortCenter('取消收藏成功')
        // homeStore.setSpinnerVisibility(true)
        // favoriteStore.del(goods_id).then(d=>{
        //     homeStore.setSpinnerVisibility(false)
        //     if (_.get(d,'content.status') === 0){
        //         // goodsDetailsStore.refreshData(goods_id)
        //         FBToast.showShortCenter('取消收藏成功')
        //     }else {
        //         FBToast.showLongCenter(_.get(d,'content.message'))
        //     }
        // })
    }
}



export default observer(Page);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomRightBn:{
        width:50,
        height:50,
        marginTop:20,
    },
    bottomRightImage:{
        width:30,
        height:30,
    },
    bottomRightText:{
        fontSize:14,
        color:'#fff',
        marginTop:5,
    }
});
