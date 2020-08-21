import { Platform, Dimensions } from "react-native";
import { Size, FontSize } from "../../asset/size";
import { RegularColorCode } from "../../asset/theme";

/*global*/
/**
 * 常用的全局常量
 **/
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const scale = Dimensions.get("window").scale;
const isIOS = Platform.OS === "ios";
const Ratio = width / 375;
// APP全局状态
var TC_AppState = {
  selectedTabName: "home",
  appRoute: "home"
};
global.IS_IOS = isIOS;
global.SCREEN_W = width;
global.SCREEN_H = height;
global.SCREEN_S = scale;
global.TC_AppState = TC_AppState;
global.TCLineW = isIOS && width > 375 ? 0.33 : 0.5;
global.Size = Size;
global.FontSize = FontSize;
global.RegularColorCode = RegularColorCode;
global.Ratio = Ratio;
global.JXLog = (string, str2) => {
  if (str2) {
    if (__DEV__) console.log(string, str2);
  } else if (__DEV__) console.log(string);
};
