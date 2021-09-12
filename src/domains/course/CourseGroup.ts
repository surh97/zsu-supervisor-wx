import { Department } from '@/domains/department';
import { SupervisorGroup } from '@/domains/supervisor';
import { RoundPlan } from '@/domains/round';

/** 学科 */
export default class CourseGroup {
  public static build(data: CourseGroup) {
    const courseGroup: CourseGroup = new CourseGroup();
    courseGroup.id = data.id;
    courseGroup.name = data.name;
    courseGroup.initials = data.initials;
    courseGroup.departmentList = data.departmentList ? Department.builds(data.departmentList) : null;
    courseGroup.roundPlans = data.roundPlans ? RoundPlan.builds(data.roundPlans) : null;
    return courseGroup;
  }

  public static builds(datas: CourseGroup[]) {
    const courseGroups: CourseGroup[] = [];
    datas.forEach((data: CourseGroup) => {
      const courseGroup: CourseGroup = this.build(data);
      courseGroups.push(courseGroup);
    });
    return courseGroups;
  }

  /** 学科编号 */
  public id: number = null;
  /** 学科名 */
  public name: string = null;
  /** 首字母 */
  public initials: string = null;
  /** 单位列表 */
  public departmentList: Department[];
  /** 督导组别列表 */
  public supervisorGroups: SupervisorGroup[];
  /** 轮次计划列表 */
  public roundPlans: RoundPlan[];

  get roundPlanValue() {
    let roundPlanValue: string = '';
    this.roundPlans.forEach((roundPlan: RoundPlan) => {
      roundPlanValue += roundPlan.round.id + ', ';
    });
    return roundPlanValue.substr(0, roundPlanValue.length - 2);
  }
}
