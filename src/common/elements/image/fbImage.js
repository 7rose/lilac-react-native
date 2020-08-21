import React from "react";
import { Image } from "react-native";
import PropTypes from "prop-types";
import { isValidUrl } from "../../../common/utils/helperUtils";

const propTypes = {
  source: PropTypes.any.isRequired,
  children: PropTypes.any,
  resizeMode: PropTypes.string,
  defaultSource: PropTypes.any //注：fbImage的defaultSource（默认图）热更后会消失，所以有使用默认图时最好用fbFastImage
};

const defaultProps = {
  resizeMode: "contain"
};
// 判断链接格式是否正确
export const isValidUrl = url =>
    !_.isEmpty(url) &&
    (_.startsWith(url, "http://") || _.startsWith(url, "https://"));

export const getValidUrl = url => {
  return isValidUrl(url) ? url : `http://${url}`;
};

export default function FbImage({
  source,
  children,
  resizeMode,
  defaultSource,
  ...rest
}) {
  if (source) {
    const hasUriProperty = Object.prototype.hasOwnProperty.call(source, "uri");
    if (hasUriProperty) {
      // 判断如果uri为空或无效，默认个uri值，否则安卓的默认图显示不了
      source = isValidUrl(source.uri) ? source : { uri: "null" };
    }
  }

  return (
    <Image
      defaultSource={defaultSource}
      // 当source为空时，defaultSource依然被覆盖，所以需置放{source || defaultSource}
      source={source || defaultSource}
      resizeMode={resizeMode}
      {...rest}
    >
      {children}
    </Image>
  );
}

FbImage.propTypes = propTypes;
FbImage.defaultProps = defaultProps;
