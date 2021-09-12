import * as types from '@/store/mutations';
import { ActionContextBasic } from '@/store/ActionContextBasic';
import { User, CurrentUser, Role, Resource } from '@/domains/user';

import { loginApi, logOutApi, findCurrentUserApi } from '@/api/login/LoginApi';
import { setLogin, removeLogin, getLogin } from '@/utils/authenticate';
import { Toast } from 'vant';

export interface State {
  user: User;
  roles: Role[];
  resources: Resource[];
  menus: any;
}

const state: State = {
  user: new User(),
  roles: [],
  resources: [],
  menus: [],
};

const mutations = {
  /** 登出 */
  [types.CLEAR_USER](object: State) {
    object = new CurrentUser();
  },
  /** 获取用户 */
  [types.ADD_USER](object: State, payload: CurrentUser) {
    object.user = payload.user;
    object.roles = payload.roles;
    object.resources = payload.resources;
    object.menus = payload.menus;
  },
};

const actions = {
  /** 登录 */
  Login(context: ActionContextBasic, user: User): Promise<void> {
    return new Promise((resolve, reject) => {
      login(user)
        .then(() => {
          resolve();
        })
        .catch(() => {
          context.commit(types.CLEAR_USER);
          reject();
        });
    });
  },
  /** 登出 */
  Logout(context: ActionContextBasic): Promise<void> {
    return new Promise((resolve, reject) => {
      logout()
        .then(() => {
          context.commit(types.CLEAR_USER);
          resolve();
        })
        .catch(() => {
          context.commit(types.CLEAR_USER);
          reject();
        });
    });
  },
  /** 清除用户 */
  ResetUser(context: ActionContextBasic): void {
    context.commit(types.CLEAR_USER);
    checkLogin();
  },
  /** 获取用户 */
  FindUser(context: ActionContextBasic): Promise<void> {
    return new Promise((resolve, reject) => {
      const load = Toast.loading({ mask: true, message: '正在初始化菜单，请稍后！', duration: 0 });
      findCurrentUser()
        .then((user) => {
          context.commit(types.ADD_USER, user);
          load.clear();
          resolve();
        })
        .catch(() => {
          context.commit(types.CLEAR_USER);
          load.clear();
          reject();
        });
    });
  },
};

export default {
  state,
  actions,
  mutations,
};

/**
 * 登录
 *
 * @param data 登录表单
 */
function login(data: User): Promise<void> {
  return new Promise((resolve, reject) => {
    loginApi(data)
      .then((res: any) => {
        Toast.success(res);
        setLogin();
        resolve();
      })
      .catch((error: any) => {
        Toast.fail(error);
        removeLogin();
        reject();
      });
  });
}

/**
 * 登出
 */
function logout(): Promise<void> {
  return new Promise((resolve, reject) => {
    const load = Toast.loading({ mask: true, message: '正在退出系统，请稍等。', duration: 0 });
    logOutApi()
      .then(() => {
        removeLogin();
        load.clear();
        resolve();
      })
      .catch(() => {
        removeLogin();
        load.clear();
        reject();
      });
  });
}

/**
 * 检测登录状态
 */
function checkLogin(): void {
  if (getLogin()) {
    Toast.fail('会话超时，请重新登录。');
    removeLogin();
  }
}

/**
 * 获取登录用户
 */
function findCurrentUser(): Promise<CurrentUser> {
  return new Promise((resolve, reject) => {
    findCurrentUserApi()
      .then((res: any) => {
        const user = CurrentUser.build(res);
        resolve(user);
      })
      .catch(() => {
        removeLogin();
        reject();
      });
  });
}
