import * as types from '@/store/mutations';
import { ActionContextBasic } from '@/store/ActionContextBasic';
import { Supervisor } from '@/domains/supervisor';
import { findSupervisorApi } from '@/api/supervisor/SupervisorApi';
import { Toast } from 'vant';

export interface State {
  supervisor: Supervisor;
}

const state: State = {
  supervisor: null,
};

const mutations = {
  /** 添加督导 */
  [types.ADD_SUPERVISOR](object: State, supervisor: Supervisor) {
    object.supervisor = supervisor;
  },
  /** 移除督导 */
  [types.CLEAR_SUPERVISOR](object: State) {
    object.supervisor = null;
  },
};

const actions = {
  /** 刷新督导 */
  RefreshSupervisor(context: ActionContextBasic): Promise<void> {
    return new Promise((resolve, reject) => {
      const load = Toast.loading({ mask: true, message: '正在初始化督导信息，请稍后！', duration: 0 });
      findSupervisorApi()
        .then((result: any) => {
          const supervisor: Supervisor = Supervisor.build(result);
          context.commit(types.ADD_SUPERVISOR, supervisor);
          load.clear();
          resolve();
        }).catch(() => {
          load.clear();
        });
    });
  },
  /** 清除督导 */
  ClearSupervisor(context: ActionContextBasic): void {
    context.commit(types.CLEAR_SUPERVISOR);
  },
};

export default {
  state,
  actions,
  mutations,
};
