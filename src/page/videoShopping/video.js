import Video from 'react-native-video';
import videoShoppingStore from '../../model/videoShoppingStore';
import {TouchableOpacity} from 'react-native';
import React from 'react';
import {observer} from 'mobx-react-lite';
import _ from 'lodash'

function getVideo(item,index) {
    JXLog('mmxm111 '+JSON.stringify(item))
    JXLog('mmxm222 '+'')

    function onBuffer() {

    }

    return  <Video
        count = {videoShoppingStore.count}
        source={{uri:_.get(item,'item.content.url')}}
        poster={_.get(item,'item.content.cover')}
        style={{flex: 1,backgroundColor:'#000'}}
        repeat={true}
        paused={item.index===videoShoppingStore.current?videoShoppingStore.isPause:true}
        resizeMode='contain'
        posterResizeMode="cover"
        onBuffer={()=>{onBuffer()}}                // Callback when remote video is buffering
        // onError={()=>{videoError()}}
    />
}

export default observer(getVideo);
