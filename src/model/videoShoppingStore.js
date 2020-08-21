import {action, computed, observable} from 'mobx';
import _ from 'lodash';
import userStore from './accountStore';
import { getBKBM } from '../common/services/requestService';
import FBToast from '../common/utils/fbToast';
import homeStore from './homeStore';
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { Query, graphql } from "react-apollo";
import gql from "graphql-tag";
import initAppStore from './initAppStore';

class pageStore {

    @observable
    pageData = {
        '0':[],
        '1':[],
        '2':[],
        '3':[],
        '4':[],
        '5':[],
        '6':[],
        '7':[],
        '8':[],
        '9':[],
        '10':[],
        '11':[],
        '12':[],
        '13':[],
        '14':[],
        '15':[],
        '16':[],
        '17':[],
    };
    @observable
    current = 0;
    @observable
    currentCatId = 0;
    @observable
    isPause = false;
    @observable
    count = 0;
    @action
    setCurrent(current){
        this.current =  current;
        this.count += 1;
    }



    // @computed
    // getCurrent(){
    //     return this.current;
    // }


    @action
    setPause(pause){
        this.isPause =  false;
    }

    @observable
    refreshing = false

    @action
    getPageData(cat_id = this.currentCatId){


        const list_gql = gql`{
  videos(first: 10, show:true) { 
    # show是审核标记,在审核没有移到前端之前,读取应该始终为true
    data {
      id
      content
      stars{
        id
        created_at
      }

      comments{
        id
        content
        created_at
      }
    }
    paginatorInfo {
      currentPage
      lastPage
    }
  }
}
`;
        initAppStore.getApolloClient().query(
            {
                query:list_gql
            }
        ).then(
            ({ loading, error, data }) => {
                if (!loading && data && _.get(data,'videos.data')){
                    this.pageData[cat_id] = _.get(data,'videos.data')
                }
            }
        )
        return;
        homeStore.setSpinnerVisibility(true)
        this.refreshing = true
        this.currentCatId = cat_id;
         getBKBM(cat_id).then((data)=>{
             this.refreshing = false
             homeStore.setSpinnerVisibility(false)
             if (_.get(data,'content.msg','fail') === 'SUCCESS'){
                 this.pageData[cat_id] = data.content.data
             }else {
                 FBToast.showShortCenter(_.get(data,'content.msg'))
             }
         });
    }
}
const videoShoppingStore = new pageStore()
export default videoShoppingStore
