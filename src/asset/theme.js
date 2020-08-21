/**
 * 公共颜色
 * 备注***表示需要修改
 * @type {{bgColor: {}, txtColor: {}}}
 */

export const RegularColorCode = {

  /**
   * 主题颜色
   */
  themeColor: {
    bgColor:'#ffffff',
    color1:"#fff",// 纯白，主要用于组件背景色
    color2:"#f5f5f5", // 淡白，主要用于body背景色以及辅助间隔线
    color3:"#ddd", // 淡灰，主要用于重点间隔线
    color4:"#ccc", //灰，主要用于附属文字
    color5:"#ff3b30", //强调色，主要用于金额按钮等
    color6:"#ffe9ea", //淡红，主要用于佣金展示等
  },
  /**
   * 通用文字颜色
   */
  BaseFontColor: {
    body1: "#333",
    body2: "#666",
    body3: "#999",
    body4: "#ccc",
    body5: "#fff",
    body6: "#8E8E93",
    body7: "#3F3F3F",
    body8: "#1EB767"
  },
  /**
   * 附加文本颜色
   */
  AppendFontColor: {
    tabSelectedTitle: "#0D76D0", //tab选中 ***

    append1: "#333",
    append2: "#8E8E93",
    append3: "#fff",
    append4: "#979797",
    append5: "#929292",
    append6: "#EDEDED",
    append7: "#676767",
    append8: "#FCF2F2",
    append9: "#EFF7FF",
    append10: "#636363",
    append11: "#818181",
    transparent: "#00000000", //透明色
    subTransparent: "#00000080", //半透明色
    activeTitle: "#000000", //scrollableTab选中
    inactiveTitle: "#525252", //scrollableTab
  },
  /**
   * 强调文本颜色
   */
  PromptFontColor: {
    prompt1: "#29D745",
    prompt2: "#F73737",
    prompt3: "#F28F34",
    prompt4: "#FF3672",
    prompt5: "#FF0000",
    prompt6: "#FFFFFF",
    prompt7: "#EBA300",
    prompt8: "#FF002A",
    prompt9: "#7DDA8C",
    prompt10: "#FE3572",
    prompt11: "#F73035",
    prompt12: "#FF3457",
    prompt13: [255, 54, 114, 1], //957:"[255, 36, 72, 1]",833"[13, 13, 13, 1]"
    link: "#FF3672" //链接
  },
  /**
   * 按钮文本颜色
   */
  ButtonFontColor: {
    button1: "#333",
    button2: "#fff",
    button3: "#3156B2",
    button4: "#FF3672",
    button5: "#000",
    button7: "#636363",
    button8: "#525252",
    button9: "#13B021",
    button10: "#FFF4BC",
    button11: "#FF729C"
  },
  /**
   * 标题文本颜色
   */
  TitleFontColor: {
    title1: "#fff",
    title2: "#000000",
    title3: "#333",
    title4: "#4292CD"
  },
  /**
   * 字体和背景颜色一致
   */
  MarksixBallColor: {
    redBall: "#FF6666",
    greenBall: "#20C197",
    blueBall: "#449FFF"
  },
  /**
   * 刷新控件样式
   */
  PullDownRefresh: {
    tintColor: "#ccc",
    titleColor: "#666",
    progress: ["#fff", "#fff", "#fff", "#fff"],
    progressBackground: "#ccc"
  },
  /**
   * 主要背景色
   */
  BaseBgColor: {
    /*固定不变色值*/
    white: "#ffffff",
    black: "#000000",
    red: "#ff0000",
    green: "#12b120", //提款
    blue: "#39c7ff",
    pink: "#FE3572",
    minorBg: "#FFFFFF", //主要用于面版模块背景  ***黑色系 #240D08
    mainFont: "#333333", //主要用主体文字颜色及下注 tab
    mainBg: "rgba(245,245,245,0.99)", //主要用于背景色   ***黑色系 #442028
    minorBtnBg: "#eeeeee", //主要用于按钮色
    borderColor: "#DDDDDD", //主要用于边框色
    borderColor2: "#ff4ab3", //主要用于边框色
    tipBg: "#FFF8E8", //
    /*强调色*/
    redPromptBg: "#F73737", //红色强调背景色
    greenPromptBg: "#12B120", //绿色强调背景色
    bluePromptBg: "#4292CD", //蓝色强调背景色
    orangePromptBg: "#FFF8E8", //橙色强调背景色
    copyBtnBg: "#3AC7FF", //复制按钮背景 ***
    /*彩球色*/
    redBall: "#CE3917", //主要用于的红
    greenBall: "#1B9115", //主要用于的绿
    blueBall: "#5790DA", //主要用于的蓝色
    waitOpenBg: "#5B5FE3", //  ***
    /*主题色*/
    themeColor: "#FF3672", //主要用于主题色主按钮等 //FF3672
    homeTabBg: "#f5f5f5", //主要用于tab默认颜色 ***
    tabIcon: "#999999", //主要用于tabicon及及文字默认
    topTabBg: "#4292CD", //主要用于title 及 tab 选中 ***
    shadow: "rgba(0, 0, 0, 0.5)", //影子 ***
    activeBar: "#FF7772", //tab选中的下划线
    vipTipBg: "#FFF5ED"
  },
  AppendBgColor: {
    append1: "#FAFAFA",
    append2: "#F1F1F1",
    append3: "#EFEFEF",
    append4: "#FBFBFB"
  },
  ButtonBgColor: {
    button1: "#F9F9F9",
    button2: "#FF3672", //#FF418F
    button3: "#EEEEEE",
    button4: "rgba(255, 54, 114, 0.5)", //957:rgba(255, 54, 114, 0.5),833:rgba(13, 13, 13, 0.5)
    button5: "#BBBBBB",
    button6: "#FBEDE7",
    button7: "#D1296F",
    button8: "#FF729C"
  },
  others: {
    //首页
    homeGameOptions: [
      "#CA981A",
      "#5180DE",
      "#D770E8",
      "#1EB767",
      "#EB551F",
      "#7345C7"
    ],
    homePageHotCPTitle: [
      "#4292CD",
      "#F73737",
      "#12B120",
      "#F28F34",
      "#F73737",
      "#12B120",
      "#F28F34"
    ] //热门标题 ***
  },
  /**
   * 进度条
   */
  ProgressBarColor: {
    vipProgressBorder: "#EBEBEB",
    vipProgressBar: "#FF3672"
  },
  agent: {
    topTitleBg: "transparent",
    addAccountTopNormalBg: "transparent",
    rowBg: "#fff7ef", //
    betsSum: "red",
    commission: "red",
    assignValue1: "#008000"
  },
  inviteFriend: {
    linkBorder: "#ddd", //分享好友，访问官方地址下载APP
    copyBtnBg: "#F02139", //复制下载地址
    copyTxt: "#FEE917",
    wechatBg: "#59B64C", //并打开微信推送好友
    stepContent: "#F5444A",
    stepText: "#A79177",
    mainTxt: "#A79177"
  },
  socialChats: {
    blue: "#5A81FF",
    pink: "#FF3672" //#FF3672
  },
  //渐变色
  gradientColor: {
    theme1: ["#FF7633", "#FF418F"], //"#191816","#0e0800"，"#FF7633", "#FF418F"
    theme2: ["#FF7633", "#FF4566"] //["#FF7633", "#FF4566"]
  }
};
