import router from '@/router';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import store from '@/store';

import baseUrl from '@/utils/base-url';
import { Toast } from 'vant';

// 创建axios实例
const service = axios.create({
  baseURL: baseUrl,
  timeout: 1000 * 60 * 10,
});

// request拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    config.withCredentials = true;
    return config;
  },
  (error: any): void => {
    console.log(error);
    Promise.reject(error);
  },
);

// respone拦截器
service.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    if (response.data && response.data.errcode === 400 && response.data.info === '档案中的任教教师姓名有误，请重新填写') {
      Toast.fail(response.data.info);
      return Promise.reject();
    }
    oldServiceError(response);
    return response.data;
  },
  (error: AxiosError) => {
    console.log('err' + error);
    if (error.message === 'Network Error') {
      Toast.fail('网络错误！');
    } else if (!unAuthenticate(error.response)) {
      Toast.fail(error.response.data);
    }
    return Promise.reject(error.response.data);
  },
);

/** 服务器内部错误（500） */
function oldServiceError(response: any): void {
  const data: any = response.data;
  if (data) {
    if (data.errcode && data.errcode !== null && data.errcode !== 905) {
      if (data.errcode === 902 || data.errcode === '902') {
        store.dispatch('ResetUser');
        router.push({ path: '/login' });
      }
      Toast.fail(response.data.info || '抱歉, 服务器出现异常!');
    }
  }
}

/** 未认证 */
function unAuthenticate(response: any): boolean {
  if (response.status === '401' || response.status === 401) {
    store.dispatch('ResetUser');
    router.push({ path: '/login' });
    return true;
  }
  return false;
}

export default service;
