import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native";

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

export default function Button({ children, ...rest }) {
  return <TouchableOpacity {...rest}>{children}</TouchableOpacity>;
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
