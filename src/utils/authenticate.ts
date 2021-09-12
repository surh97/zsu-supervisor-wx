import { isNullOrUndefined } from 'util';

/** key */
const TokenKey = 'isLogin';

/** 获取登录状态  */
export function getLogin(): boolean {
  const result: string = localStorage.getItem(TokenKey);
  return !isNullOrUndefined(result) && result === 'true';
}

/** 设置登录状态  */
export function setLogin() {
  return localStorage.setItem(TokenKey, 'true');
}

/** 清除登录状态  */
export function removeLogin() {
  return localStorage.removeItem(TokenKey);
}
