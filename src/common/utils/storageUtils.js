export const StorageKey = {
  homeList: "HOMELIST",
  deviceToken: "DEVICETOKEN",
  userInfo: "USERINFO",
  loginInfo: "LOGININFO",
  userAvatar: "USERAVATAR",
  buttonSoundStatus: "BUTTONSOUNDSTATUS",
  updateInfo: "CHEACKIPINFO",
  appAccountInfo: "appAccountInfo",
  SearchKeyWords: "SearchKeyWords",
  LastUserSettingLanguage: "LastUserSettingLanguage",
};

/**
 * 缓存类辅助工具
 */
export class StorageUtils {
  /**
   * 批量获取缓存数据
   * @returns {*}
   */
  static getAllStorageData() {
    return storage.getBatchData([
      { key: StorageKey.homeList }, //首页数据  0
      { key: StorageKey.deviceToken }, //登录用户名 1
      { key: StorageKey.userAvatar }, //用户Logo背景色 2
      { key: StorageKey.buttonSoundStatus }, //声音开关 3
      { key: StorageKey.userInfo }, //用户信息 4
      { key: StorageKey.loginInfo }, //登录信息 token 5
      { key: StorageKey.appAccountInfo }, //app账号信息 国家历史 6
      { key: StorageKey.SearchKeyWords }, //存储历史 7
      { key: StorageKey.LastUserSettingLanguage }, //存储用户选择的语言 8
    ]);
  }

  /**
   * 将数据存入缓存
   * @param key
   * @param data
   */
  static saveDataToStorage(key, data) {
    if (!key || !data) {
      return;
    }
    // JXLog(`save to storage key:${key},value:`,data)
    storage.save({ key: key, data: data }).then(d=>{

    });
  }

  /**
   * 从缓存获取数据
   * @param key
   * @returns {*}
   */
  static getDataFromStorage(key) {
    console.log(`get to storage key:${key}`);
    return storage.load({ key: key });
  }
}
