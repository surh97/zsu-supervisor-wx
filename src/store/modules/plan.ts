import * as types from '@/store/mutations';
import { ListenType } from '@/domains/work';
import { ActionContextBasic } from '@/store/ActionContextBasic';

export interface State {
  planTypes: ListenType[];
}

const state: State = {
  planTypes: null,
};

const mutations = {
  /** 添加计划类型列表 */
  [types.ADD_PLAN_TYPES](object: State, planTypes: ListenType[]) {
    object.planTypes = planTypes;
  },
};

const actions = {
  /** 添加计划类型列表 */
  RefreshPlanTypes(context: ActionContextBasic): Promise<any> {
    return new Promise((resolve, reject) => {
      const names: string[] = ['随堂听课评课', '课程跟踪评课'];
      const mins: number[] = [1, 2];
      const minTitles: string[] = [null, null];
      const maxs: number[] = [1, 3];
      const maxTitles: string[] = [null, '同一门课程被选择为随堂听课时可选的最大听课次数'];
      const maxPlans: number[] = [10, 3];
      const maxPlanTitles: string[] = ['当前处于未听课状态的随堂听课最大次数', '每学期督导课程类型为跟踪评课的最大课程门数'];
      const termOfValidities: number[] = [1, 3];
      const termOfValidityTitles: string[] = [
        '随堂听课有效期（超过有效期之后，课程将释放出来，允许其他督导选择，以月为单位）',
        '跟踪评课有效期（超过有效期之后，课程将释放出来，允许其他督导选择：以月为单位）',
      ];

      const planTypes: ListenType[] = [];
      names.forEach((name: string, index: number) => {
        const planType: ListenType = new ListenType();
        planType.id = index + 1;
        planType.name = name;
        planType.minListenNum = mins[index];
        planType.minListenNumTitle = minTitles[index];
        planType.maxListenNum = maxs[index];
        planType.maxListenNumTitle = maxTitles[index];
        planType.maxPlanNum = maxPlans[index];
        planType.maxPlanNumTitle = maxPlanTitles[index];
        planType.termOfValidity = termOfValidities[index];
        planType.termOfValidityTitle = termOfValidityTitles[index];
        planTypes.push(planType);
      });
      context.commit(types.ADD_PLAN_TYPES, planTypes);
      resolve();
    });
  },
};

export default {
  state,
  actions,
  mutations,
};
