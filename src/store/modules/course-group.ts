import * as types from '@/store/mutations';
import { CourseGroup } from '@/domains/course';

export interface State {
  courseGroups: CourseGroup[];
}

const state: State = {
  courseGroups: null,
};

const mutations = {
  /** 添加学科列表 */
  [types.ADD_COURSE_GROUPS](object: State, courseGroups: CourseGroup[]) {
    object.courseGroups = courseGroups;
  },
};

const actions = {
};

export default {
  state,
  actions,
  mutations,
};
