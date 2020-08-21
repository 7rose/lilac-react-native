package com.miaofashion.fbhelper;

import android.Manifest;
import android.content.Context;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.telephony.TelephonyManager;
import android.text.TextUtils;
import android.util.Log;

import androidx.core.content.ContextCompat;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.miaofashion.R;

import java.util.UUID;

//import constacne.DownLoadBy;
//import constacne.UiType;
import listener.Md5CheckResultListener;
import listener.OnBtnClickListener;
import listener.UpdateDownloadListener;
import model.UiConfig;
import model.UpdateConfig;
import update.UpdateAppUtils;
import constant.UiType;


public class FBHelper  extends ReactContextBaseJavaModule {
    private static final String KEY_UUID = "uuid";
    private static final String KEY_RANDOM_UUID = "random_uuid";
    static ReactApplicationContext context;

    public FBHelper(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext;
        UpdateAppUtils.init(context);
    }

    @Override
    public String getName() {
        return "FBHelper";
    }

    @ReactMethod
    public void getCFUUID(Callback resultCallback) {
        resultCallback.invoke("deviceId", getCFUUID());
    }

    public String getCFUUID() {
//        boolean isGranted = ContextCompat.checkSelfPermission(context, Manifest.permission.READ_PHONE_STATE) == PackageManager.PERMISSION_GRANTED;
//            if (isGranted) {
//                TelephonyManager TelephonyMgr = (TelephonyManager) context.getSystemService(Context.TELEPHONY_SERVICE);
//                String szImei = TelephonyMgr.getDeviceId();
//                String res = null;
//                try {
//                    res = UUID.nameUUIDFromBytes(szImei.getBytes("utf8")).toString();
//                    Log.d("deviceToken",res);
//                } catch (Exception e) {
//                }
//                return res;
//            } else {//未授权直接使用随机生成的。
//                return null;
//            }
        return  "1111";
    }


    public String getVersionCode() {
        String versionName = getPackageInfo(context).versionName;
        if (versionName != null && versionName != "") {
           return versionName;
        }
        return "9.9.9";
    }

    @ReactMethod
    public void getAffCode(Callback resultCallback) {
//        String affCode = AppUtil.getAFFCode(context);
//        if (!TextUtils.isEmpty(affCode)) {
//            resultCallback.invoke(affCode);
//        }
    }

//    public String getAffCode() {
//        String metaData = AppUtils.getAppMetaDataString(context, "TD_CHANNEL_AFFCODE");
//        if (!TextUtils.isEmpty(metaData)) {
//            return  metaData;
//        }
//        return "";
//    }
//
//    public String getCurVersion() {
//        String metaData = AppUtils.getAppMetaDataString(context, "CUR_VERSION");
//        if (!TextUtils.isEmpty(metaData)) {
//            return  metaData;
//        }
//        return "";
//    }

    @ReactMethod
    public void isAndroidRootDevice(Callback resultCallback) {
        try {
//            boolean result = RootUtil.isDeviceRooted();
//            resultCallback.invoke(result);
        } catch (Exception e) {

        }
    }

    private static PackageInfo getPackageInfo(Context context) {
        PackageInfo pi = null;

        try {
            PackageManager pm = context.getPackageManager();
            pi = pm.getPackageInfo(context.getPackageName(),
                    PackageManager.GET_CONFIGURATIONS);

            return pi;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return pi;
    }

//    @ReactMethod
//    public void getAppInfo(Callback callback){
//        WritableMap map = Arguments.createMap();
//        map.putString("appName",getAppName());
//        map.putString("appVersion",getVersionCode());
//        map.putString("deviceToken",getCFUUID());
//        map.putString("affcode",getAffCode());
//        map.putString("curVersion",getCurVersion());
//        callback.invoke(map);
//    }


    /**
     *
     * @param url 更新url
     * @param isCompulsory 是否强制更新 0:不强制更新，1：强制更新
     * @param title 更新title
     * @param content 更新内容
     */
    @ReactMethod
    public void updateApp(String url,int isCompulsory,String title,String content) {
        // 启动应用后删除安装包

        //配置
        UpdateConfig updateConfig = new UpdateConfig();
        updateConfig.setAlwaysShow(true);
        if(isCompulsory==0){
            updateConfig.setForce(false);
        }else if(isCompulsory==1){
            updateConfig.setForce(true);
        }
        updateConfig.setNotifyImgRes(R.mipmap.logo);

        //UI
        UiConfig uiConfig = new UiConfig();
        uiConfig.setUiType(UiType.PLENTIFUL);

        UpdateAppUtils
                .getInstance()
                .apkUrl(url)
                .updateTitle("发现新版本"+title)
                .updateContent(content)
                .uiConfig(uiConfig)
                .updateConfig(updateConfig)
                .update();

        Log.d("main",url);

    }


    public static void sendProgress(int msg) {
        context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("LOAD_PROGRESS", msg);
    }

    @ReactMethod
    public void getAppName(Callback callback) {
        callback.invoke(getAppName());
    }



    public String getAppName() {
        PackageManager packageManager = null;
        ApplicationInfo applicationInfo = null;
        try {
            packageManager = context.getPackageManager();
            applicationInfo = packageManager.getApplicationInfo(context.getPackageName(), 0);
        } catch (PackageManager.NameNotFoundException e) {
            applicationInfo = null;
        }
        String applicationName =
                (String) packageManager.getApplicationLabel(applicationInfo);
        return applicationName;
    }

    @ReactMethod
    public void openWebViewFromJs(String url) {
//        try {
//            Activity currentActivity = getCurrentActivity();
//            Intent intent = new Intent(currentActivity, Live800ChattingActivity.class);
//            intent.putExtra("url", url);
//            currentActivity.startActivity(intent);
//        } catch (Exception e) {
//            throw new JSApplicationIllegalArgumentException(
//                    "不能打开Activity : " + e.getMessage());
//        }
    }

    @ReactMethod
    public void openWebViewForKefu(String url) {
//        try {
//            Activity currentActivity = getCurrentActivity();
//            Intent intent = new Intent(currentActivity, Live800ChattingActivity.class);
//            intent.putExtra("url", url);
//            currentActivity.startActivity(intent);
//        } catch (Exception e) {
//            throw new JSApplicationIllegalArgumentException(
//                    "不能打开Activity : " + e.getMessage());
//        }
    }

    @ReactMethod
    public void openGameWebViewFromJs(String url, String title) {
//        try {
//            Activity currentActivity = getCurrentActivity();
//            Intent intent = new Intent(currentActivity, JXGameWebView.class);
//            intent.putExtra("url", url);
//            intent.putExtra("title", title);
//            currentActivity.startActivity(intent);
//        } catch (Exception e) {
//            throw new JSApplicationIllegalArgumentException(
//                    "不能打开Activity : " + e.getMessage());
//        }
    }

    @ReactMethod
    public void getCanShowIntelligenceBet(Callback resultCallback) {
        try {
            resultCallback.invoke(true);
        } catch (Exception e) {

        }
    }
}
