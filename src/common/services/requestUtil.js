import axios from "axios";
import _ from "lodash";
import Moment from "moment";
import queryString from "query-string";
import { version, config } from "./requestConfig";
import { clientInfo } from "../../app_config/config";
import initAppStore from "../../model/initAppStore";
import accountStore from "../../model/accountStore";
import FBToast from "../utils/fbToast";
import NavigatorHelper from "../navigators/navigationService";
// import uuidV4 from "uuid/v4";
// import md5 from "blueimp-md5";
import storage from '../../common/global/storage'

const qs = require('qs');

const METHODS = {
  get: "get",
  post: "post",
  put: "put",
  delete: "delete"
};

let HEADER = {
  "Accept": "application/json",
  "Content-Type": "application/json",
  // "Content-Type": "application/x-www-form-urlencoded",
  // "User-Agent": Platform.OS,
  'language':initAppStore.getLocale(),
  // launch:Platform.OS === 'ios'?'Ios':'Android'
  launch:'Wap',
  platform:Platform.OS === 'ios'?'ios':'Android'
};



class RequestUtil {
  /**
   * Get请求
   * @param url
   * @param params
   * @param platform
   * @param dontAddHeaderAuth
   */
  httpGet(url, params, dontAddHeaderAuth,platform) {
    let headers = HEADER;
    headers.language =  initAppStore.getLocale()
    if (platform){
      headers.platform = platform
    }
    let map = {
      headers
    };
    url = this.getRequestUrlWithParams(this.getRequestUrl(url), params);
    // JXLog("++++++==========URL:", url);
    return this.sendRequest(METHODS.get, url, map, dontAddHeaderAuth);
  }



  /**
   * Post请求
   * @param url
   * @param params
   * @param dontAddHeaderAuth
   * @param dontStringifyBody
   */

  httpPost(url, params, dontAddHeaderAuth, dontStringifyBody) {
    let headers = HEADER;
    let map = {
      headers,
      // data: qs.stringify(params)
      data:JSON.stringify(params)
    };
    return this.sendRequest(
      METHODS.post,
      this.getRequestUrl(url),
      map,
      dontAddHeaderAuth
    );
  }

  /**
   * Put请求
   * @param url
   * @param params
   * @param platform
   */
  httpPut(url, params) {
    let headers = HEADER;
    let map = {
      headers,
      // data: qs.stringify(params)
      data:JSON.stringify(params)
    };
    return this.sendRequest(METHODS.put, this.getRequestUrl(url), map);
  }

  /**
   * Delete请求
   * @param url
   * @param params
   * @param isStringifyBody
   */
  httpDelete(url, params, isStringifyBody) {
    let map = {
      headers: HEADER
    };
    if (isStringifyBody) {
      url = this.getRequestUrl(url);
      map.data = JSON.stringify(params);
    } else {
      url = this.getRequestUrlWithParams(this.getRequestUrl(url), params);
    }
    return this.sendRequest(METHODS.delete, url, map);
  }

  /**
   * 触发请求
   * @param method
   * @param url
   * @param map
   * @param dontAddHeaderAuth
   */
  sendRequest(method, url, map, dontAddHeaderAuth) {
    // todo: set store isShowLoadingSpinner = true
    if (!dontAddHeaderAuth) {
      map = this.addHeaderAuth(map);
    } else {
      delete map.headers.authorization;
    }

    if (initAppStore.deviceToken && initAppStore.deviceToken.length) {
      map.headers.device_token = initAppStore.deviceToken;
    }

    const startTime = Moment();
    const basicMap = {
      method,
      url,
      timeout: 10000,
      // // `params` are the URL parameters to be sent withdraw the request
      // // Must be a plain object or a URLSearchParams object
      // params,
      // // `data` is the data to be sent as the request body
      // // Only applicable for request methods 'PUT', 'POST', and 'PATCH'
      // data,
      follow: 20,
      size: 0
    };

    const finalMap = _.assignIn(basicMap, map);
    JXLog(`请求参数 Http${method}`, finalMap);

    return new Promise((resolve, reject) => {
      return axios(finalMap)
        .then(res => {
          const response = this.getResponse(true, startTime, res, url);
          JXLog(`请求成功 Http${method}`, response);
          resolve(response);
        })
        .catch(err => {
          const error = err.response || err;
          const response = this.getResponse(false, startTime, error, url);
          JXLog(`请求失败 Http${method}`, error);
          resolve(response);
        })
        .then(() => {
          // todo: set store isShowLoadingSpinner = false
        });
    });
  }

  getResponse(isSucceed, startTime, response, url) {
    const endTime = Moment();
    const duration = endTime.diff(startTime) / 1000;
    const status = _.get(response, "status", "");

    if (status >= 400) {
      if (status === 401) {
        FBToast.showLongCenter(`status expires and you need to login again`);
        accountStore.loginOut();
        setTimeout(() => {
          NavigatorHelper.gotoUserLogin();
        }, 1000);
      } else if (status === 422 || status === 400) {
        if (url.match(/refreshToken/) || response.message === "请重新登录") {
          FBToast.showShortCenter(`登录状态过期:${status}，请重新登录！`);
          accountStore.isLogin = false;
          setTimeout(() => {
            NavigatorHelper.gotoUserLogin(false, true);
          }, 1000);
        }
      } else if (status === 428) {
        //428错误重新获取sec失效
        // appInit.start();
      }
    }
    let message =
      _.get(response, "message", "") || _.get(response, "data.message", "");

    return {
      rs: isSucceed,
      status: status,
      content: _.get(response, "data", ""),
      duration: duration,
      serverDate: _.get(response, "headers.date", ""),
      message: this.parseMessage(message, status)
    };
  }

  parseMessage(message, status) {
    if (_.isEmpty(message) && status !== 200) {
      return "请求异常,请稍后再试!";
    }
    switch (message) {
      case "Network Error":
        return "网络异常,请检查当前网络!";
      case "timeout of 10000ms exceeded":
        return "请求超时,请稍后再试!";
      default:
        return message;
    }
  }

  getRequestUrl(url) {
    if (
      url &&
      (_.startsWith(url, "http://") || _.startsWith(url, "https://"))
    ) {
      return url;
    }
    return `${clientInfo.serverDomain}${url}`;
  }

  getRequestUrlWithParams(url, params) {
    if (typeof params === "string") {
      url += "/" + params;
    } else if (params) {
      url += "?" + queryString.stringify(params);
    }
    return url;
  }

  addHeaderAuth(map) {
    // todo: get token
    if (_.get(accountStore,'loginInfo.token',false)) {
      map.headers.authorization = "Bearer " +
          accountStore.token;
    } else {
      map.headers.authorization = "";
      delete map.headers.authorization;
    }
    return map;
  }
}

const requestUtil = new RequestUtil();
export default requestUtil;
