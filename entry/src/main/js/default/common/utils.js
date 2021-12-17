import http from '@ohos.net.http';

function getUnique() {
    const now = new Date();
    const unique = [
        'harmony',
        '-',
        now.getFullYear(),
        fill(now.getMonth() + 1, 2),
        fill(now.getDate(), 2),
        fill(now.getHours(), 2),
        fill(now.getMinutes(), 2),
        fill(now.getSeconds(), 2),
        fill(now.getMilliseconds(), 3),
        Math.random()
            .toFixed(20)
            .substring(2)
    ].join('');
    return unique;
}

function fill(number, length) {
    const filler = '00000';
    let str = number.toString();

    if (str.length < length) {
        str = filler.substring(0, length - str.length) + str;
    }

    return str;
}

export function separate_4_4_n_3(str) {
    return str.replace(
        /(.{4})(.{4})(.+)(.{3})/,
        (_, $1, $2, $3, $4) => `${$1} ${$2} ${$3} ${$4}`
    );
};

export default function hmsHttp(url, params, method) {
    let httpRequest = http.createHttp();
    let promise = httpRequest.request(url, {
        method: method,
        extraData: params.extraData,
        connectTimeout: 60000,
        readTimeout: 60000,
        header: {
            apiVersion: '1',
            'Accept-language': 'zh-CN',
            language: 'zh-CN',
            'content-type': 'application/json;charset=utf-8',
            os: 'android',
            unique: getUnique(),
            ...params.header
        }
    });
    return promise
}
const env = "dev"

export const baseUrl = env === 'qa' ? 'https://miao-magic-test-restapi.co-mall.com' : 'https://miao-magic-dev-restapi.co-mall.com'

export const userId = env === 'qa' ? '140007' : '72002'

export const userSession = env === 'qa' ? '4f33f8b3fb904beda690187bb0e23f4a' : '45c6075d01944580ae580a57c5af0fa3'

export const subsiteId = '4'