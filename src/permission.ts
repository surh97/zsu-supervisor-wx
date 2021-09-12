import router from '@/router';
import store from '@/store';

import { Route } from 'vue-router';

import { getLogin } from '@/utils/authenticate';

import { Now } from '@/domains/date';
import { Resource } from '@/domains/user';
import { Supervisor } from '@/domains/supervisor';
import { isNullOrUndefined } from 'util';

// 不重定向白名单
const loginPage = '/login';
const mainPage = '/course';
const whiteList = [loginPage];

router.beforeEach((to, from, next) => {
  getLogin() ? init(to, next) : redirect(to, next);
});

/** 初始化 */
function init(to: Route, next: any) {
  initDate().then(() => {
    initSupervisor().then(() => {
      if (to.path === loginPage) {
        next({ path: mainPage });
      } else {
        next();
      }
    });
  });
}

/** 初始化时间 */
function initDate(): Promise<any> {
  return new Promise((resolve, reject) => {
    const now: Now = store.getters.now;
    if (isNullOrUndefined(now)) {
      store
        .dispatch('RefreshNow')
        .then(() => {
          resolve();
        })
        .catch(() => {
          reject();
        });
    } else {
      resolve();
    }
  });
}

/** 初始化菜单 */
function initMenu(): Promise<any> {
  return new Promise((resolve, reject) => {
    const resource: Resource[] = store.getters.resources;
    if (!resource || resource.length === 0) {
      store
        .dispatch('FindUser')
        .then(() => {
          resolve();
        })
        .catch(() => {
          reject();
        });
    } else {
      resolve();
    }
  });
}

/** 初始化督导 */
function initSupervisor(): Promise<any> {
  return new Promise((resolve, reject) => {
    const supervisor: Supervisor = store.getters.supervisor;
    if (isNullOrUndefined(supervisor)) {
      store
        .dispatch('RefreshSupervisor')
        .then(() => {
          resolve();
        })
        .catch(() => {
          reject();
        });
    } else {
      resolve();
    }
  });
}

/** 重定向 */
function redirect(to: Route, next: any) {
  if (whiteList.indexOf(to.path) !== -1) {
    next();
  } else {
    store.dispatch('ResetUser');
    store.dispatch('ClearSupervisor');
    next(loginPage);
  }
}
