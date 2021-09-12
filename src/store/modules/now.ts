import { Now } from '@/domains/date';

import * as types from '@/store/mutations';
import { ActionContextBasic } from '@/store/ActionContextBasic';
import { findNowApi } from '@/api/date/YearApi';
import { Toast } from 'vant';

export interface State {
  now: Now;
}

const state: State = {
  now: null,
};

const mutations = {
  /** 添加当前学年 */
  [types.ADD_NOW](object: State, now: Now) {
    object.now = now;
  },
};

const actions = {
  /** 刷新当前学年 */
  RefreshNow(context: ActionContextBasic): Promise<any> {
    return new Promise(
      (resolve, reject): void => {
        const load = Toast.loading({ mask: true, message: '正在初始化系统，请稍等...', duration: 0 });
        findNowApi()
          .then(
            (result: any): void => {
              load.clear();
              const now: Now = Now.build(result);
              if (now.year !== null) {
                context.commit(types.ADD_NOW, now);
                resolve();
              } else {
                reject();
              }
            },
          )
          .catch(() => {
            load.clear();
            reject();
          });
      },
    );
  },
};

export default {
  state,
  actions,
  mutations,
};
