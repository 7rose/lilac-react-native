import React, {useEffect, useRef} from 'react';

import {
    Animated,
} from 'react-native';
import {home} from '../../../asset/image';


export default function LoadingView() {
    let fadeAnim = useRef(new Animated.Value(0.8)).current;  // 透明度初始值设为0
    let sizeAnim = useRef(new Animated.Value(0.8)).current;  // 透明度初始值设为0

    useEffect(() => {
        runAnimated();
    }, [fadeAnim, sizeAnim]);

    function runAnimated() {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,              // 让动画持续一段时间
                useNativeDriver: true,
            }),
            Animated.timing(sizeAnim, {
                toValue: 1,
                duration: 500,              // 让动画持续一段时间
                useNativeDriver: true,
            }),
        ]).start(o => {
            if (o.finished) {
                Animated.parallel([
                    Animated.timing(fadeAnim, {
                        toValue: 0.8,
                        duration: 1000,              // 让动画持续一段时间
                        useNativeDriver: true,
                    }),
                    Animated.timing(sizeAnim, {
                        toValue: 0.8,
                        duration: 1000,              // 让动画持续一段时间
                        useNativeDriver: true,
                    }),
                ]).start(o => {
                    if (o.finished) {
                        runAnimated();
                    }
                });
            }
        });
    }

    return (
        <Animated.Image                 // 使用专门的可动画化的View组件
            style={{
                opacity: fadeAnim,
                transform: [{scale: sizeAnim}],
                width: 140 / 1.5,
                height: 66 / 1.5,
                // 将透明度绑定到动画变量值
            }}
            source={home.placeholderImage}
        >
            {/*<Image source={home.placeholderImage} style={{width:140,height:66}}/>*/}
        </Animated.Image>
    );
}
