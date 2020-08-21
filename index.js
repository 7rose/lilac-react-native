/**
 * @format
 */
import baseConst from "./src/common/global/baseConst";
import storage from "./src/common/global/storage";

import {AppRegistry} from 'react-native';
import App from './src/page/launch';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
