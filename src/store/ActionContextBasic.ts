
import { Commit, Dispatch } from 'vuex';

/** Basic Action Context */
export interface ActionContextBasic {
  commit: Commit;
  dispatch: Dispatch;
}
