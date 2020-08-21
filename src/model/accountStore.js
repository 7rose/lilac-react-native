import {action, observable, computed} from 'mobx';
import _ from 'lodash';
// import {
//     DoLogin, DoRegister, getBalance, getBalanceCategory,
// } from '../common/services/requestService';
import FBToast from '../common/utils/fbToast';
import navigatorHelper from '../common/navigators/navigatorHelper';
import {StorageKey, StorageUtils} from '../common/utils/storageUtils';
import I18n from '../asset/language';
import homeStore from './homeStore';
import {DeviceEventEmitter, Keyboard} from 'react-native';
import initAppStore from './initAppStore';
import gql from "graphql-tag";
import {getUniqueId} from 'react-native-device-info';

class AccountStore {
    @observable refSpinner = null;
    @observable isLogin = false;
    @observable InputText1 = '';
    @observable InputText2 = '';
    @observable loginInfo = {};
    @observable balanceInfo = {};
    @observable balanceCategoryInfo = [];


    @observable msgSucceed = false;
    @observable userInfo = {};
    @observable withDrawList = [];
    @observable second = 60;

    @observable registerUserName = '';
    @observable registerPassword = '';
    @observable registerPhone = '';
    @observable registerConfirmPassword = '';
    @observable registerAffiliateID = '';
    @observable registerName = '';


    @computed
    get token() {
        return accountStore.loginInfo.token;
    }

    @action
    setLoginInfo(info){
        this.loginInfo = info;
    }

    @computed
    get domain() {
        return accountStore.loginInfo.domain+'/';
    }

    @computed
    get input1IsPhoneNumber() {
        return this.isPhoneNumber(this.InputText1);
    }

    @computed
    get twoInputIsValid() {
        return !_.isEmpty(this.InputText1) && !_.isEmpty(this.InputText2) && this.InputText2.length > 5;
    }

    @action
    timeDownSecond(sec) {
        this.second = 60;
        let a = setInterval(d => {
            this.second--;
            if (this.second === 0) {
                clearInterval(a);
                this.msgSucceed = false;
            }
        }, 1000);
    }

    @action
    getSMS(){
        Keyboard.dismiss();
        const list_gql = gql`
        mutation{
         sendSmsCode(input: {mobile: "${this.InputText1}"}) {
                success
                registered
            }
        }
`;
        initAppStore.getApolloClient().mutate({
            mutation:list_gql
        }).then(({ loading, error, data }) => {
            if (!loading && _.get(data,'sendSmsCode.success')){
                FBToast.showShortCenter('短信发送成功 注意查看手机')
            }
            }
        )
    }

    @action
    login() {
        Keyboard.dismiss();
        if (!this.twoInputIsValid){
            FBToast.showShortCenter('请输入完整手机号和验证码')
            return;
        }
        const list_gql = gql`
        mutation{
         getToken(input: {mobile: "${this.InputText1}",code:"${this.InputText2}"}) {
                token
            }
        }
`;
        initAppStore.getApolloClient().mutate({
            mutation:list_gql
        }).then(({ loading, error, data }) => {
                if (!loading && _.get(data,'getToken.token')){
                    this.isLogin = true;
                    this.setLoginInfo(_.get(data,'getToken'));
                    StorageUtils.saveDataToStorage(StorageKey.loginInfo, _.get(data,'getToken'));
                    navigatorHelper.popToTop();
                    DeviceEventEmitter.emit('RefreshToken')
                }
            }
        ).catch((error)=>{
            FBToast.showShortCenter('-'+error)
        })

        // homeStore.setSpinnerVisibility(true)
        // DoLogin(this.InputText1, this.InputText2).then((d) => {
        //     homeStore.setSpinnerVisibility(false)
        //     this.doLoginInfo(d)
        // });
    }

    @action
    doLoginInfo(d){
        if (_.get(d, 'rs')) {
            this.isLogin = true;
            this.setLoginInfo(_.get(d, 'content'));
            StorageUtils.saveDataToStorage(StorageKey.loginInfo, _.get(d, 'content'));
            this.fetchBalance();
            this.fetchBalanceCategory();
            navigatorHelper.popToTop();
            DeviceEventEmitter.emit('RefreshToken')
        } else {
            this.showErrorInfo(d)
        }
    }

    showErrorInfo(d){
        let message = _.get(d, 'content.message');
        if (!_.isEmpty(message)) {
            message = I18n.t(`common_error${message}`)
        }
        if (_.isEmpty(message)) {
            message = 'network error'
        }
        FBToast.showShortCenter(message);
    }

    @action
    register(country, countryPhone) {
        Keyboard.dismiss();
        if (_.isEmpty(this.registerPhone)) {
            FBToast.showShortCenter(I18n.t('user_entryPhone'));
            return;
        }
        if (_.isEmpty(this.registerName)) {
            FBToast.showShortCenter(I18n.t('user_entryName'));
            return;
        }

        let body = {
            'username': this.registerUserName,
            'password': this.registerPassword,
            'safetyPassword': this.registerConfirmPassword,
            'phone': this.registerPhone,
            'country': country,
            'phonePrefix': [countryPhone],
            'name': this.registerName,
            'promoteCode': this.registerAffiliateID,
        };
        homeStore.setSpinnerVisibility(true)
        DoRegister(body).then(d => {
            homeStore.setSpinnerVisibility(false)
            this.doLoginInfo(d)
        });
    }

    @computed
    get getFirstStepRegisterWhiteDone() {
        return _.isEmpty(this.registerUserName) ||
            _.isEmpty(this.registerPassword) ||
            _.isEmpty(this.registerConfirmPassword);
    }

    @computed
    get getSecondStepRegisterWhiteDone() {
        return _.isEmpty(this.registerPhone) ||
            _.isEmpty(this.registerName);
    }


    @action
    fetchBalance(needToast = false) {
        getBalance().then(d => {
            if (_.get(d, 'rs')) {
                this.balanceInfo = _.get(d, 'content');
                if (needToast) {
                    FBToast.showShortCenter(I18n.t('funds_refreshAmount'));
                }
            }
        });
    }

    @action
    fetchBalanceCategory() {
        getBalanceCategory().then(d => {
            if (_.get(d, 'rs')) {
                this.balanceCategoryInfo = _.get(d, 'content');
            }
        });
    }


    @action
    loginOut() {
        this.isLogin = false;
        this.loginInfo.token = '';
        this.InputText2 = '';
        this.registerPassword = '';
        this.registerConfirmPassword = ''
        this.registerPhone = '';
        this.registerAffiliateID = '';
        this.registerName = '';
        this.registerUserName = '';
        StorageUtils.saveDataToStorage(StorageKey.loginInfo, this.loginInfo);
    }

    // 手机号校验
    isPhoneNumber(phoneNum) {
        let reg = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/;
        return reg.test(phoneNum);
    }
}

const accountStore = new AccountStore();
export default accountStore;
