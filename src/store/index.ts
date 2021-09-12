import Vue from 'vue';
import Vuex from 'vuex';
import getters from '@/store/getters';

import user, { State as UserState } from '@/store/modules/user';
import supervisor, { State as SupervisorState } from '@/store/modules/supervisor';
import now, { State as NowState } from '@/store/modules/now';
import courseGroup, { State as CourseGroupState } from '@/store/modules/course-group';
import round, { State as RoundState } from '@/store/modules/round';
import plan, { State as PlanState } from '@/store/modules/plan';
import options, { State as OptionsState } from '@/store/modules/option';


Vue.use(Vuex);

export default new Vuex.Store({
  getters,
  modules: {
    user,
    supervisor,
    now,
    courseGroup,
    round,
    plan,
    options,
  },
});

export interface State {
  user: UserState;
  supervisor: SupervisorState;
  now: NowState;
  courseGroup: CourseGroupState;
  round: RoundState;
  plan: PlanState;
  options: OptionsState;
}
