import * as types from '@/store/mutations';
import { ActionContextBasic } from '@/store/ActionContextBasic';
import { listYearApi, listTermApi } from '@/api/date/YearApi';
import { Option } from '@/domains/option';
import { listCourseGroupApi } from '@/api/course/CourseGroupApi';
import { listDepartmentApi } from '@/api/department/DepartmentApi';
import { Year } from '@/domains/date';
import { listProfessionApi } from '@/api/person/ProfessionApi';
import { listCampusApi } from '@/api/campus/CampusApi';
import { CourseGroup } from '@/domains/course';
import { Department } from '@/domains/department';
import { isNullOrUndefined } from 'util';

export interface State {
  yearOptions: Option[];
  termOptions: Option[];
  courseGroupOptions: Option[];
  departmentOptions: Option[];
  professionOptions: Option[];
  campusOptions: Option[];
}

const state: State = {
  yearOptions: null,
  termOptions: null,
  courseGroupOptions: null,
  departmentOptions: null,
  professionOptions: null,
  campusOptions: null,
};

const mutations = {
  /** 添加学年列表 */
  [types.ADD_YEAR_OPTIONS](object: State, options: Option[]) {
    object.yearOptions = options;
  },
  /** 添加学期列表 */
  [types.ADD_TERM_OPTIONS](object: State, options: Option[]) {
    object.termOptions = options;
  },
  /** 添加学科列表 */
  [types.ADD_COURSE_GROUP_OPTIONS](object: State, options: Option[]) {
    object.courseGroupOptions = options;
  },
  /** 添加单位列表 */
  [types.ADD_DEPARTMENT_OPTIONS](object: State, options: Option[]) {
    object.departmentOptions = options;
  },
  /** 添加职称列表 */
  [types.ADD_PROFESSION_OPTIONS](object: State, options: Option[]) {
    object.professionOptions = options;
  },
  /** 添加校区列表 */
  [types.ADD_CAMPUS_OPTIONS](object: State, options: Option[]) {
    object.campusOptions = options;
  },
};

const actions = {
  /** 刷新当前学年 */
  RefreshYearOptions(context: ActionContextBasic): Promise<any> {
    return new Promise(
      (resolve, reject): void => {
        listYearApi()
          .then(
            (result: any): void => {
              const options: Option[] = Option.toOptionsByKeyAndValue(result, 'year', 'year');
              context.commit(types.ADD_YEAR_OPTIONS, options);
              resolve();
            },
          )
          .catch(() => {
            reject();
          });
      },
    );
  },
  /** 刷新学期列表 */
  RefreshTermOptions(context: ActionContextBasic): Promise<any> {
    return new Promise(
      (resolve, reject): void => {
        listTermApi()
          .then(
            (result: any): void => {
              const options: Option[] = Option.toOptionsByKeyAndValue(Year.builds(result), 'term', 'termValue');
              context.commit(types.ADD_TERM_OPTIONS, options);
              resolve();
            },
          )
          .catch(() => {
            reject();
          });
      },
    );
  },
  /** 刷新学科列表 */
  RefreshCourseGroupOptions(context: ActionContextBasic): Promise<any> {
    return new Promise(
      (resolve, reject): void => {
        listCourseGroupApi()
          .then(
            (result: any): void => {
              const courseGroups: CourseGroup[] = CourseGroup.builds(result);
              context.commit(types.ADD_COURSE_GROUPS, courseGroups);

              const courseGroupOptions: Option[] = Option.toOptions(courseGroups);
              context.commit(types.ADD_COURSE_GROUP_OPTIONS, courseGroupOptions);

              const departments: Department[] = [];
              courseGroups.forEach((courseGroup: CourseGroup) => {
                const departmentList: Department[] = courseGroup.departmentList;
                if (!isNullOrUndefined(departmentList) && departmentList.length > 0) {
                  departments.push.apply(departments, departmentList);
                }
              });

              const departmentOptions: Option[] = Option.toOptions(departments);
              context.commit(types.ADD_DEPARTMENT_OPTIONS, departmentOptions);
              resolve();
            },
          )
          .catch(() => {
            reject();
          });
      },
    );
  },
  /** 刷新单位列表 */
  RefreshDepartmentOptions(context: ActionContextBasic): Promise<any> {
    return new Promise(
      (resolve, reject): void => {
        listDepartmentApi()
          .then(
            (result: any): void => {
              const options: Option[] = Option.toOptions(result);
              context.commit(types.ADD_DEPARTMENT_OPTIONS, options);
              resolve();
            },
          )
          .catch(() => {
            reject();
          });
      },
    );
  },
  /** 刷新职称列表 */
  RefreshProfessionOptions(context: ActionContextBasic): Promise<any> {
    return new Promise(
      (resolve, reject): void => {
        listProfessionApi()
          .then(
            (result: any): void => {
              const options: Option[] = Option.toOptions(result);
              context.commit(types.ADD_PROFESSION_OPTIONS, options);
              resolve();
            },
          )
          .catch(() => {
            reject();
          });
      },
    );
  },
  /** 刷新校区列表 */
  RefreshCampusOptions(context: ActionContextBasic): Promise<any> {
    return new Promise(
      (resolve, reject): void => {
        listCampusApi()
          .then(
            (result: any): void => {
              const options: Option[] = Option.toOptions(result);
              context.commit(types.ADD_CAMPUS_OPTIONS, options);
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
