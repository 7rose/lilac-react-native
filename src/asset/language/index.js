export const countryList = {
    'Malaysia': {
        value: '60',
        M:'MYR'
    },
    'Indonesia': {
        value: '62',
        M:'IDR'
    },
    'Singapore': {
        value: '65',
        M:'SGD'
    },
    'Thailand': {
        value: '66',
        M:'THB'
    },
    'Vietnam': {
        value: '84',
        M:'VND'
    },
};

// import I18n,{ getLanguages } from 'react-native-i18n'
import DeviceInfo from 'react-native-device-info';
// import DataRepository from '../dao/DataRepository'

import I18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';

import zh from './locales/CN';
import en from './locales/EN';
import id from './locales/ID';
import my from './locales/MY';
import th from './locales/TH';
import vi from './locales/VI';


const locales = RNLocalize.getLocales();
const I18nNew = I18n
const systemLanguage = locales[0]?.languageCode;  // 用户系统偏好语言
if (systemLanguage) {
    I18nNew.locale = systemLanguage;
} else {
    I18nNew.locale = 'en';  // 默认语言为英文
}

I18nNew.fallbacks = true;
I18nNew.translations = {
    zh: zh,
    en: en,
    id: id,
    my: my,
    th: th,
    vi: vi,
};

export default I18nNew
