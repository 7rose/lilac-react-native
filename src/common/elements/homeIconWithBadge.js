/**
 */

import React from "react";
import {StyleSheet, View, Text, TouchableWithoutFeedback, Image, Platform} from 'react-native';
import userStatusStore from "../../model/accountStore";
import { observer } from "mobx-react";
import FastImage from "react-native-fast-image";
import homeStore from '../../model/homeStore';
import I18n from '../../asset/language/index';
import initAppStore from '../../model/initAppStore';
// import { TouchableOpacity } from "react-native-gesture-handler";

/**
 * 带badge的tab bar
 */
@observer
class TabIconView extends React.Component {
  render() {
    const {
      // isSelected,
      iconName,
      selectedIconName,
      badgeCount,
      title,
      bgImage,
      accessibilityStates
    } = this.props;
    let focused =
      accessibilityStates && accessibilityStates[0] === "selected"
        ? true
        : false;
    return (
      <TouchableWithoutFeedback
          count = {initAppStore.argForRefresh}
          style={styles.container}
        onPress={this.props.onPress}
      >
        <View style={styles.container}>
          {bgImage !== null && (
            <View>
              <View style={styles.walletBackground}>
                <FastImage
                  source={bgImage}
                  defaultSource={bgImage}
                  style={styles.backdrop}
                  resizeMode={"contain"}
                />
              </View>
              <FastImage
                source={focused ? selectedIconName : iconName}
                defaultSource={iconName}
                style={[styles.walletIcon, styles.iconStyle]}
                resizeMode={"contain"}
              />
            </View>
          )}
          {bgImage === null && (
            <Image
              source={focused ? selectedIconName : iconName}
              defaultSource={iconName}
              style={styles.iconStyle}
              resizeMode={"contain"}
            />
          )}
          <Text
            style={[
              styles.tabTextStyle,
              {
                color: focused
                  ? RegularColorCode.AppendFontColor.tabSelectedTitle
                  : RegularColorCode.AppendFontColor.append2
              }
            ]}
          >
            {I18n.t(title)}
          </Text>

          {badgeCount > 0 && <View style={styles.pointStyle} />}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  pointStyle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "red",
    position: "absolute",
    top: SCREEN_H * 0.01,
    left: SCREEN_W * 0.12
  },
  tabStyle: {
    flexDirection: "row"
  },
  iconStyle: {
    marginTop:5,
    width: 25,
    height: 25,
  },
  backdrop: {
    width: 55,
    height: 55,
    flexDirection: "column"
  },
  walletIcon: {
  },
  tabTextStyle: { fontSize: FontSize.body12,
    marginTop: Platform.OS==='ios'? 5:2}
});

const TabIconViewWithBadge = observer(props => {
  // You should pass down the badgeCount in some other ways like react context api, redux, mobx or event emitters.
  return (
    <TabIconView
      {...props}
      badgeCount={
        userStatusStore.newMsgCounts
      }
    />
  );
});

export { TabIconViewWithBadge, TabIconView };
