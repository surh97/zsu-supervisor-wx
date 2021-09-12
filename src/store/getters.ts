
import store, { State } from '@/store';
import { GetterTree, Getter } from 'vuex';

import { User, Role, Resource } from '@/domains/user';
import { Now } from '@/domains/date';
import { Option } from '@/domains/option';
import { isNull, isNullOrUndefined } from 'util';
import { RoundExec } from '@/domains/round';
import { CourseGroup } from '@/domains/course';
import { ListenType } from '@/domains/work';
import { Supervisor } from '@/domains/supervisor';

const user: Getter<State, any> = (state: State): User => state.user.user;
const roles: Getter<State, any> = (state: State): Role[] => state.user.roles;
const resources: Getter<State, any> = (state: State): Resource[] => state.user.resources;
const menus: Getter<State, any> = (state: State): Resource[] => state.user.menus;

const supervisor: Getter<State, any> = (state: State): Supervisor => state.supervisor.supervisor;

const now: Getter<State, any> = (state: State): Now => state.now.now;

const courseGroups: Getter<State, any> = (state: State): CourseGroup[] => state.courseGroup.courseGroups;

const roundExecs: Getter<State, any> = (state: State): RoundExec[] => {
  if (isNullOrUndefined(state.round.roundExecs)) {
    store.dispatch('RefreshRoundExecs');
  }
  return state.round.roundExecs;
};

const planTypes: Getter<State, any> = (state: State): ListenType[] => {
  if (isNullOrUndefined(state.plan.planTypes)) {
    store.dispatch('RefreshPlanTypes');
  }
  return state.plan.planTypes;
};

const yearOptions: Getter<State, any> = (state: State): Option[] => {
  if (isNull(state.options.yearOptions)) {
    store.dispatch('RefreshYearOptions');
  }
  return state.options.yearOptions;
};

const termOptions: Getter<State, any> = (state: State): Option[] => {
  if (isNull(state.options.termOptions)) {
    store.dispatch('RefreshTermOptions');
  }
  return state.options.termOptions;
};

const courseGroupOptions: Getter<State, any> = (state: State): Option[] => {
  if (isNull(state.options.courseGroupOptions)) {
    store.dispatch('RefreshCourseGroupOptions');
  }
  return state.options.courseGroupOptions;
};

const departmentOptions: Getter<State, any> = (state: State): Option[] => state.options.departmentOptions;

const professionOptions: Getter<State, any> = (state: State): Option[] => {
  if (isNull(state.options.professionOptions)) {
    store.dispatch('RefreshProfessionOptions');
  }
  return state.options.professionOptions;
};

const campusOptions: Getter<State, any> = (state: State): Option[] => {
  if (isNull(state.options.campusOptions)) {
    store.dispatch('RefreshCampusOptions');
  }
  return state.options.campusOptions;
};

const getterTree: GetterTree<State, any> = {
  user,
  roles,
  resources,
  menus,

  supervisor,

  now,

  courseGroups,

  roundExecs,
  planTypes,

  yearOptions,
  termOptions,
  courseGroupOptions,
  departmentOptions,
  professionOptions,
  campusOptions,
};

export default getterTree;
