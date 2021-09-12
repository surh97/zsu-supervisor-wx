import { CourseGroup } from '@/domains/course';

/** 督导组别 */
export default class SupervisorGroup {
  public static build(data: SupervisorGroup) {
    const supervisorGroup: SupervisorGroup = new SupervisorGroup();
    supervisorGroup.id = data.id;
    supervisorGroup.name = data.name;
    supervisorGroup.courseGroup = data.courseGroup ? CourseGroup.build(data.courseGroup) : null;
    return supervisorGroup;
  }

  public static builds(datas: SupervisorGroup[]) {
    const supervisorGroups: SupervisorGroup[] = [];
    datas.forEach((data: SupervisorGroup) => {
      const supervisorGroup: SupervisorGroup = this.build(data);
      supervisorGroups.push(supervisorGroup);
    });
    return supervisorGroups;
  }

  /** 督导组别编号 */
  public id: number = null;
  /** 督导组别名 */
  public name: string = null;
  /** 学科 */
  public courseGroup: CourseGroup = null;

  public create(): SupervisorGroup {
    this.courseGroup = new CourseGroup();
    return this;
  }

  /** 全名 */
  get fullName() {
    return this.name;
  }
}
