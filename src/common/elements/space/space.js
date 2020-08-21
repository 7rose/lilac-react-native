import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

const propTypes = {
  value: PropTypes.number,
  horizontal: PropTypes.bool
};

const defaultProps = {
  value: 10,
  horizontal: false
};

export default function Space({ value, horizontal }) {
  return (
    <View
      style={horizontal ? { marginRight: value } : { marginBottom: value }}
    />
  );
}

Space.propTypes = propTypes;
Space.defaultProps = defaultProps;
