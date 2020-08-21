import _ from 'lodash'
import AccountStore from '../../model/accountStore'

export const getSellNumber = (number) => {
    if (!_.isEmpty(number)){
        if (number > 10000){
            let n = Math.round((number /10000) * 100) / 100;
            return  (n + "万");
        }
    }
    return number
};

export const showPrice = (price) => {
    price = ''+price
    const regexp=/(?:\.0*|(\.\d+?)0+)$/
    return price.replace(regexp,'$1')
};

export const getBuyFee = (price,tkRate) =>{
    let yysRate = 0.97
    let yysShareRate = 0.97
    let hyRate = 0.65
    let hyShareRate = 0.8

    let aliFee = 0.1
    let isYYS = 1;

    let zyj = price*(tkRate/100) ;
    let finalFee = zyj - (zyj *aliFee)

    if(finalFee < 0.01) return [0,0]

    let selfBuyFee = Math.floor((finalFee * (isYYS?yysRate:hyRate)) * 100) / 100
    let shareFee =   Math.floor( (finalFee * (isYYS?yysShareRate:hyShareRate))*100) /100

    return [selfBuyFee,shareFee]
};

export function isURL(str_url){
    const strRegex = '^((https|http|ftp|rtsp|mms)?://)'
        + '?(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?' //ftp的user@
        + '(([0-9]{1,3}\.){3}[0-9]{1,3}' // IP形式的URL- 199.194.52.184
        + '|' // 允许IP和DOMAIN（域名）
        + '([0-9a-z_!~*\'()-]+\.)*' // 域名- www.
        + '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.' // 二级域名
        + '[a-z]{2,6})' // first level domain- .com or .museum
        + '(:[0-9]{1,4})?' // 端口- :80
        + '((/?)|' // 如果没有文件名，则不需要斜杠
        + '(/[0-9a-z_!~*\'().;?:@&=+$,%#-]+)+/?)$';
    const re = new RegExp(strRegex);
    return re.test(str_url);
}
