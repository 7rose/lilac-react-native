import RequestUtil from "./requestUtil";
import { config ,version} from "./requestConfig";
const api = config.api;
import accountStore from '../../model/accountStore'
import _ from 'lodash';

/*** 实例 ***/
// 异步 Asynchronous function
/*
requestService() {
  testApi()
    .then(res => {
      //
    })
    .catch(error => {
      // 报错
    });
}
*/

// 同步 Synchronous function
/*
async requestService() {
  try {
    const response = await testApi();
  } catch (e) {
  }
}
*/


// 首页接口
export const getHomeData = () => RequestUtil.httpGet(api.home,null,true);
export const getHotGames = () => RequestUtil.httpGet(api.hotGames,null,true);
export const getPlatforms = () => RequestUtil.httpGet(api.platforms,null,true);
export const getContactUs = () => RequestUtil.httpGet(api.contactUs,null,true);

// 通用获取链接
export const getDataWithUrl = (url) => RequestUtil.httpGet(url,null,true);

// 登录
export const DoLogin = (username,password) => RequestUtil.httpPost(api.login,{username:username,password:password},true);
export const DoRegister = (body) => RequestUtil.httpPut(api.login,body);
export const getRegisterCheck = (arg) => RequestUtil.httpGet(`${api.registerCheck}/${arg}`,null,false);
export const getRegisterCheckPhone = (arg) => RequestUtil.httpGet(`${api.registerCheckPhone}/${arg}`,null,false);
