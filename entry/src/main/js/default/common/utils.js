import http from '@ohos.net.http';

export default function hmsHttp(url,params,method){
    let httpRequest= http.createHttp();
    let promise = httpRequest.request(url, {
        method:method,
        extraData: params.extraData,
        connectTimeout: 60000,
        readTimeout: 60000,
        header: {
            apiVersion: '1',
            'Accept-language': 'zh-CN',
            language: 'zh-CN',
            'Content-Type': 'application/json;charset=utf-8',
            os: 'android',
            unique: 2021113013510001821467222634411076143,
            ...params.header
        }
    });
    return promise
}