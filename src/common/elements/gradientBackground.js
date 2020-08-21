import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewPropTypes,
  View
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import PropTypes from "prop-types";

const gradientBackground = ({
  colors,
  buttonText,
  buttonStyle,
  onPress,
  buttonTextStyle,
  containerStyle,
  isbutton,
  children,
  isUnable,
  unClickColors
}) => {
  return (
    <LinearGradient
      colors={isUnable ? unClickColors : colors}
      style={[containerStyle]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      {isbutton ? (
        isUnable ? (
          <View style={[styles.btnStyle, buttonStyle]}>
            <Text style={[styles.btnTextStyle, buttonTextStyle]}>
              {buttonText}
            </Text>
          </View>
        ) : (
          <TouchableOpacity
            style={[styles.btnStyle, buttonStyle]}
            onPress={onPress}
          >
            <Text style={[styles.btnTextStyle, buttonTextStyle]}>
              {buttonText}
            </Text>
          </TouchableOpacity>
        )
      ) : (
        children
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  btnTextStyle: {
    fontSize: 12,
    textAlign: "center",
    color: "#ffffff",
    backgroundColor: "transparent"
  },
  btnStyle: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  }
});

gradientBackground.propTypes = {
  colors: PropTypes.array,
  buttonText: PropTypes.string,
  buttonStyle: ViewPropTypes.style,
  buttonTextStyle: PropTypes.object,
  containerStyle: ViewPropTypes.style,
  onPress: PropTypes.func,
  isbutton: PropTypes.bool,
  isUnable: PropTypes.bool
};

gradientBackground.defaultProps = {
  colors: RegularColorCode.gradientColor.theme1,
  isbutton: false,
  isUnable: false,
  unClickColors: ["#999", "#999"]
};

export default gradientBackground;
