import {action, computed, observable} from 'mobx';
import _ from 'lodash';
// import {
//     getHomeData,
//     getDataWithUrl,
//     getHotGames,
//     getPlatforms, getContactUs,
// } from '../common/services/requestService';
import {home} from '../asset/image';
import fbToast from '../common/utils/fbToast';
import I18nNew from '../asset/language';

class HomeStore {
    @observable refSpinner = null;
    @observable banners = [];
    @observable announcement = {};
    @observable licence = {};

    //Platforms
    @observable Slot = [];
    @observable LiveVideo = [];
    @observable Sport = [];
    @observable Fishing = [];

    @observable hotGames = [];

    @observable listData = {
        account: {},
        banners: [],
        announcement: {},
        Platforms: {},
        hotGames: {},
        licence: {},
    };

    @observable
    currentSelectedTitle = I18nNew.t('home_sport');

    @observable isNoticeModalVisible;
    @observable refreshing = false;
    @observable noticeItem = {
        item: null,
        keyWorld: '',
    };


    @action
    setCurrentSelectedTitle(title) {
        this.currentSelectedTitle = title;
    }

    // 设定全局化Loading Spinner是否显示
    @action
    setSpinnerVisibility(show) {
        if (!this.refSpinner) {
            return;
        }

        setTimeout(() => {
            show ? this.refSpinner.show() : this.refSpinner.hide();
        }, 100);
    }

    @action
    setNoticeVisibility(visible) {
        this.isNoticeModalVisible = visible;
    }

    @action
    showPopupItem(item, title) {
        this.setNoticeVisibility(true);
        homeStore.noticeItem = {
            item: item,
            keyWorld: title,
        };
    }


    @action
    getHomeData() {
        this.refreshing = true;

        setTimeout(d => {
            this.refreshing = false;
        }, 800);

        getHomeData().then((d) => {
            let url = _.get(d, 'content.url');
            getDataWithUrl(url).then(arr => {
                if (_.get(d, 'rs')) {
                    this.getListData(_.get(arr, 'content', false));
                }
            });
            // Promise.all([getDataWithUrl(url)]).then((arr)=>{
            //     this.getListData(_.get(arr,'0',false))
            // })
        });

        getHotGames().then((d) => {
            let arr = _.get(d, 'content');
            if (!_.isEmpty(arr)) {
                this.hotGames = arr;
            }
        });

        getPlatforms().then((d) => {
            let arr = _.get(d, 'content');
            if (!_.isEmpty(arr)) {
                let a = _.groupBy(arr, 'category');
                this.Slot = _.get(a, 'Slot');
                this.Sport = _.get(a, 'Sport');
                this.Fishing = _.get(a, 'Fishing');
                this.LiveVideo = _.get(a, 'LiveVideo');
            }

            getContactUs().then(d => {
                if (_.get(d, 'rs')) {
                    this.licence = _.get(d, 'content');
                }
            });
        });

    }

    @action
    getListData(arr) {
        if (arr) {
            let banner = _.get(arr, 'banners');
            this.listData.banners = banner;
            this.banners = banner;

            let announcement = _.get(arr, 'announcement');
            this.listData.announcement = announcement;
            this.announcement = announcement;
        }
    }

}

const homeStore = new HomeStore();
export default homeStore;
