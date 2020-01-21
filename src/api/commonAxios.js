import config from '@/config';
import axios from 'axios';
import QS from 'qs';
import store from '../store/index'
// import Router from '../router/index'
const baseUrl = config.baseUrl.dev? config.baseUrl.dev : config.baseUrl.pro;


let commonAxios = {
    baseUrl: baseUrl,
    urls:{
        // musicBroadcasting
        // musicBroadcasting:'/musicBroadcasting'
        // http://arise.guyubao.com/demon/base/phone/login
        // basePhoneLogin:'/base/phone/login',
        // 短信验证码
        baseCode:'/demon/base/code',
        // 登陆
        basePhoneLogin:'/demon/base/phone/login',
        // 生成报价单
        prcAdd:'/demon/prc/add',
        // 历史报价单列表
        prcPhoneList:'/demon/prc/phone/list',
        // 查看报价单详情
        prcPhoneDetail:'/demon/prc/phone/detail',
        // 下载文件
        prcPhoneDoc:'/demon/prc/phone/doc'
    }
};

// 获取url
commonAxios.getUrl = function(value){   
    // 1. 正常请求地址
    // let url = this.baseUrl + this.urls[value];
    // 2. 反向代理地址
    let url = '/api' + this.urls[value];
    // 3. 打包服务器地址
    // let url = this.urls[value];
    return url;
};

// 常规get请求
commonAxios.get = (url,data,func) => {
    axios.get(url,{
        params:data
    }).then(res => {
        if(res.data && res.data != null && res.data != undefined) func(res.data);
    }).catch(error => {
        console.log('请求报错,请联系管理员' + error);
        return error; 
    })
};

// post请求
commonAxios.post = (url,data,func) => {
    axios.post(url,QS.stringify(data)).then(res => {
        if(res.data && res.data != null && res.data != undefined) func(res.data);
    }).catch(error => {
        console.log('请求报错,请联系管理员' + error);
        return error;
    })
};

// request
commonAxios.request = function (reqType, url, data, func) {
    axios.request({
        method: reqType,
        url,
        data
    }).then(function (response) {
        if(response.data && (response.data != '') && (response.data != null) && (response.data != undefined) ) func(response.data);
    }).catch(function (error) {
        console.log('请求报错，请联系管理员'+error);
        return error;
    })
};

//添加一个请求拦截器
axios.interceptors.request.use(function (config) {
    // 获取缓存中的token信息
    let token = sessionStorage.getItem('token') || '';
    config.headers.common['token'] = token;
    return config;
}, function (error) {
    console.info("error: ");
    console.info(error);
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    //   console.log('response-----------------------------------');
    //   console.log(response.data.code);
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default commonAxios;

