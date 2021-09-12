import service from '@/utils/request';
import { AxiosRequestConfig } from 'axios';
import { User } from '@/domains/user';

/**
 * 登录
 *
 * @param param 登录表单
 */
export function loginApi(param: User) {
  const config: AxiosRequestConfig = {
    transformRequest: (data) => {
      let uri = '';
      let key;
      for (key in data) {
        if (data.hasOwnProperty(key)) {
          uri += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&';
        }
      }
      return uri;
    },
  };
  return service.post('/login', param, config);
}

/**
 * 登出
 */
export function logOutApi() {
  return service.get('/logout');
}

/**
 * 获取用户
 */
export function findCurrentUserApi() {
  return service.get('/v2/persons');
}
