import { CourseGroup } from '@/domains/course';

/** 部门 */
export default class Department {
  public static build(data: Department) {
    const department: Department = new Department();
    department.id = data.id = undefined ? null : data.id;
    department.name = data.name = undefined ? null : data.name;
    department.courseGroup = data.courseGroup ? CourseGroup.build(data.courseGroup) : null;
    return department;
  }

  public static builds(datas: Department[]) {
    const departments: Department[] = [];
    datas.forEach((data: Department) => {
      const department: Department = this.build(data);
      departments.push(department);
    });
    return departments;
  }

  /** 部门编号 */
  public id: string = null;
  /** 部门编号列表 */
  public idList: string[];
  /** 部门名 */
  public name: string = null;
  /** 学科 */
  public courseGroup: CourseGroup = null;
}
