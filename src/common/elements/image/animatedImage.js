import React, { Component } from "react";
import { StyleSheet, View, Animated, Easing } from "react-native";

class animatedImage extends Component {
  constructor(props) {
    super(props);
    this.spinValue = new Animated.Value(0);
  }
  //旋转方法
  spin = () => {
    this.spinValue.setValue(0);
    return Animated.timing(this.spinValue, {
      toValue: 100, // 最终值 为1，这里表示最大旋转 360度
      duration: 100000,
      easing: Easing.linear
    });
  };
  render() {
    //映射 0-1的值 映射 成 0 - 360 度
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1], //输入值
      outputRange: ["0deg", "360deg"] //输出值
    });
    return (
      <View style={styles.container}>
        <Animated.Image
          style={[
            this.props.styless ? this.props.styless : styles.circle,
            { transform: [{ rotate: spin }] }
          ]}
          source={this.props.imgSrc}
        />
      </View>
    );
  }

  startAnimated() {
    this.spin().start(() => this.spin());
  }

  stopAnimated() {
    this.spin().stop(() => this.spin());
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  circle: {
    width: 22,
    height: 22
  }
});

export default animatedImage;
