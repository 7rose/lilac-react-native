import React, {useEffect, useState, useRef, Fragment} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity, Image,
} from 'react-native';
import { observer } from "mobx-react-lite";
import _ from "lodash";
import userStore from "src/model/accountStore";
import navigatorHelper from 'src/common/navigators/navigatorHelper';

function Page(items) {
  return (
      <View style={{}}>
      </View>
  )
}


export default observer(Page);
