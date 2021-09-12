import { Department } from '@/domains/department';
import { Course, CourseChange } from '@/domains/course';
import { Priority } from '@/domains/priority';
import { Filter } from '@/domains/filter';
import { Plan } from '@/domains/work';

/** 教学实施计划 */
export default class CoursePlan {
  public static build(data: CoursePlan): CoursePlan {
    const coursePlan = new CoursePlan();
    coursePlan.id = data.id;
    coursePlan.idList = data.idList;
    coursePlan.year = data.year;
    coursePlan.term = data.term;
    coursePlan.courseType = data.courseType;
    coursePlan.credit = data.credit;
    coursePlan.hours = data.hours;
    coursePlan.range = data.range;
    coursePlan.deleted = data.deleted;
    coursePlan.address = data.address;
    coursePlan.course = data.course ? Course.build(data.course) : null;
    coursePlan.department = data.department ? Department.build(data.department) : null;
    coursePlan.priority = data.priority ? Priority.build(data.priority) : null;
    coursePlan.filter = data.filter ? Filter.build(data.filter) : null;
    coursePlan.planList = data.planList ? Plan.builds(data.planList) : null;
    coursePlan.courseChangeList = data.courseChangeList ? CourseChange.builds(data.courseChangeList) : null;
    return coursePlan;
  }

  public static builds(datas: CoursePlan[]): CoursePlan[] {
    const coursePlans: CoursePlan[] = [];
    datas.forEach(
      (data: CoursePlan): void => {
        const coursePlan = CoursePlan.build(data);
        coursePlans.push(coursePlan);
      },
    );
    return coursePlans;
  }

  /**  */
  public id: string = null;
  /**  */
  public idList: string[];
  /**  */
  public year: string = null;
  /**  */
  public term: number = null;
  /**  */
  public courseType: string = null;
  /**  */
  public credit: number = null;
  /**  */
  public hours: number = null;
  /**  */
  public range: string = null;
  /**  */
  public deleted: boolean = null;
  /**  */
  public address: string = null;
  /**  */
  public course: Course = null;
  /**  */
  public department: Department = null;
  /**  */
  public priority: Priority = null;
  /**  */
  public filter: Filter = null;
  /**  */
  public planList: Plan[];
  /**  */
  public courseChangeList: CourseChange[];
}
