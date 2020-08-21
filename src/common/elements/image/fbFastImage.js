import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import FastImage from "react-native-fast-image";
import PropTypes from "prop-types";
import _ from 'lodash'
const propTypes = {
  source: PropTypes.any.isRequired,
  children: PropTypes.any,
  isPreload: PropTypes.any.bool,
  resizeMode: PropTypes.string,
  defaultSource: PropTypes.any //默认图
};

const defaultProps = {
  isPreload: true, //true: 在加载前显示默认图，加载完毕再替换新图（会闪烁如果加载快速），false: 在加载前显示放默认图，待加载完毕后如图链接报错才会加载默认图
  resizeMode: "contain"
};

// 判断链接格式是否正确
export const isValidUrl = url =>
    !_.isEmpty(url) &&
    (_.startsWith(url, "http://") || _.startsWith(url, "https://"));

export const getValidUrl = url => {
  return isValidUrl(url) ? url : `http://${url}`;
};

export default function FbFastImage({
  source,
  children,
  isPreload,
  resizeMode,
  defaultSource,
  style,
  ...rest
}) {
  const [isLoadError, setIsLoadError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  let finalSource = source || defaultSource;
  // 只要source加载不了FastImage随时会报错，需要严苛检验
  if (source) {
    const hasUriProperty = Object.prototype.hasOwnProperty.call(source, "uri");
    if (hasUriProperty) {
      // 判断如果uri为空或无效，默认个uri值，否则会报错
      finalSource = { uri: getValidUrl(source.uri) };
    }
  }
  const isShowDefault = isPreload ? isLoadError || !isLoaded : isLoadError;
  // 由于FastImage不如Image支持defaultSource, 需以两个FastImage来做兼容
  return (
    <View style={style}>
      {/* 加载图 */}
      {finalSource && (
        <FastImage
          source={finalSource}
          resizeMode={resizeMode}
          // onLoadStart={e => {}}
          // onProgress={e => {}}
          // onLoad={e => {}}
          onLoadEnd={e => {
            setIsLoaded(true);
          }}
          onError={e => setIsLoadError(true)}
          style={[style, styles.img, { opacity: isShowDefault ? 0 : 1 }]}
          {...rest}
        >
          {children}
        </FastImage>
      )}

      {/* 默认图 */}
      {isShowDefault && defaultSource && (
        <FastImage
          source={defaultSource}
          resizeMode={resizeMode}
          style={[style, styles.img]}
          {...rest}
        >
          {children}
        </FastImage>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    position: "absolute"
  }
});

FbFastImage.propTypes = propTypes;
FbFastImage.defaultProps = defaultProps;
