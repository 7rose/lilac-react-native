/**
 * Created by allen-jx on 2018/3/29.
 */
import { NavigationActions, StackActions } from "react-navigation";
import FBHelper from "../utils/helper";
import _ from "lodash";
// import AnalyticsUtil from "../umeng_analytics/analyticsUtil";
//
import navigatorHelper from './navigatorHelper';
import FBToast from '../utils/fbToast';

class NavigationService {
  static _navigator = null;

  static setTopLevelNavigator(navigatorRef) {
    this._navigator = navigatorRef;
  }

  static debounce = true; // 防止快速点击操作
  static pageName = "";
  /**
   * g
   * @param routeName 页面名字
   * @param params 参数
   */
  static navigate(routeName, params) {
    if (this.debounce) {
      this.debounce = false;

      //这里进行友盟页面跳转的埋点
      if (this.pageName.length > 0) {
        // AnalyticsUtil.onPageEnd(this.pageName);
      }
      this.pageName = routeName;
      // AnalyticsUtil.onPageBegin(routeName);

      this._navigator &&
        this._navigator.dispatch(
          NavigationActions.navigate({
            type: NavigationActions.NAVIGATE,
            routeName,
            params
          })
        );

      setTimeout(() => {
        this.debounce = true;
      }, 500);
    }
  }

  /**
   * 返回
   */
  static goBack() {
    this._navigator && this._navigator.dispatch(NavigationActions.back());
  }

  /**
   * 跳转到顶部
   */
  static popToTop() {
    this._navigator && this._navigator.dispatch(StackActions.popToTop());
  }

  /**
   * 跳转到指定页面
   * @param n
   */
  static popN(n) {
    this._navigator && this._navigator.dispatch(StackActions.pop({ n: n }));
  }

  /**
   * 返回指定层级页面
   * @param n
   * @param params
   */
  static pop(n, params) {
    this._navigator &&
      this._navigator.dispatch(StackActions.pop({ n: n, params: params }));
  }

  /**
   * 重置导航
   * @param rootRoute
   * @param displayRoute
   * @param params
   */
  static reset(rootRoute, displayRoute, params) {
    this._navigator &&
      this._navigator.dispatch(
        NavigationActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({ routeName: rootRoute }),
            NavigationActions.navigate({ routeName: displayRoute, params })
          ]
        })
      );
  }

  /**
   * 重置到指定的route
   * @param index
   */
  static resetStackByIndex(index) {
    // 打印出所有routes，再设定index
    // console.log('Routes', _navigator.state.nav)
    const routes = this._navigator.state.nav.routes;
    const actions = [];

    for (let i = 0; i <= index; i++) {
      actions.push(NavigationActions.navigate(routes[i]));
    }
    this._navigator &&
      this._navigator.dispatch(
        NavigationActions.reset({
          index,
          actions
        })
      );
  }

  static getRoutes() {
    const routes = this._navigator.state.nav.routes;
    JXLog("+++++==========", routes);
    return routes;
  }
  static isLoging = false;

  static gotoUserLogin() {
    // 防止多次进入登录页
    if (this.isLoging) {
      return;
    }
    this.isLoging = true;
    navigatorHelper.gotoOnLogin();
    setTimeout(() => {
      this.isLoging = false;
    }, 2000);
  }
}
const service = NavigationService
export default service
