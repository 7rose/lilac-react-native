import React, { useState } from "react";
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import GradientBackground from "../gradientBackground";
import Space from "../space/space";

const SideNavBar = ({ data, index, onPress }) => {
  const [selectedIndex, setIndex] = useState(index);

  const handleClick = (platformCode, index) => {
    onPress(platformCode, index);
    setIndex(index);
  };

  return (
    <ScrollView style={styles.container}>
      {data.map((item, i) => {
        let viewItem;
        const isGap = i !== data.length - 1;
        if (selectedIndex === i) {
          viewItem = (
            <TouchableOpacity containerStyle={styles.btnSelectedStyle}>
              <View style={{height:51,justifyContent: "center",
                alignItems: "center",backgroundColor:'#ffffff'}}>
                <View style={{position: 'absolute', top: 18, left: 0, backgroundColor: '#FF3B30', width: 4, height: 16}}/>
              <Text style={styles.btnSelectedTextStyle}>{item}</Text>
              </View>
            </TouchableOpacity>
          );
        } else {
          viewItem = (
            <TouchableOpacity
              style={styles.btnStyle}
              onPress={() => handleClick(item, i)}
            >
              <View style={{height:51,justifyContent: "center",}}>
              <Text style={styles.btnTextStyle}>{item}</Text>
            </View>
            </TouchableOpacity>
          );
        }
        return (
          <View key={i}>
            {viewItem}
            {/*{isGap && <Space />}*/}
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft:0 ,
    marginRight: 10,
    backgroundColor: "#F6F6F6",
    width: 91,
  },
  btnStyle: {
    // marginVertical: 5,
    width: 91,
    alignItems: "center",
  },
  btnTextStyle: {
    fontSize: 14,
    textAlign: "center",
    color: "#333333",
  },
  btnSelectedStyle: {
  },
  btnSelectedTextStyle: {
    width: 91,
    fontSize: 15,
    textAlign: "center",
    color: "#333333",
    fontWeight: "bold",
  }
});

SideNavBar.defaultProps = {
  index: 0,
  onPress: () => null
};

export default SideNavBar;
