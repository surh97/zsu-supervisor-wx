import * as types from '@/store/mutations';
import { ActionContextBasic } from '@/store/ActionContextBasic';
import { RoundExec } from '@/domains/round';
import { listRoundExecApi } from '@/api/round/RoundExec';
import { Page } from '@/domains/page';

export interface State {
  roundExecs: RoundExec[];
}

const state: State = {
  roundExecs: null,
};

const mutations = {
  /** 添加轮次执行列表 */
  [types.ADD_ROUND_EXECS](object: State, roundExecs: RoundExec[]) {
    object.roundExecs = roundExecs;
  },
};

const actions = {
  /** 添加轮次执行列表 */
  RefreshRoundExecs(context: ActionContextBasic): Promise<any> {
    return new Promise(
      (resolve, reject): void => {
        listRoundExecApi(findRoundExecsParam())
          .then(
            (result: any): void => {
              const roundExecs: RoundExec[] = RoundExec.builds(result.list);
              listNowRoundExecs(roundExecs);
              context.commit(types.ADD_ROUND_EXECS, roundExecs);
              resolve();
            },
          )
          .catch(() => {
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

/** 获取轮次执行列表参数 */
function findRoundExecsParam(): RoundExec {
  const search: RoundExec = new RoundExec();
  const page: Page = new Page();
  page.pageSize = 10000;
  search.pageInfo = page;
  return search;
}

/** 获取正在执行的轮次执行列表 */
function listNowRoundExecs(datas: RoundExec[]): void {
  for (let index = 0; index < datas.length; ) {
    const data: RoundExec = datas[index];
    if (!data.exec) {
      datas.splice(index, 1);
    } else {
      index++;
    }
  }
}
