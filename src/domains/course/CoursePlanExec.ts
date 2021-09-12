import { Campus } from '@/domains/campus';
import { Person } from '@/domains/person';
import { CoursePlan } from '@/domains/course';
import { Filter } from '@/domains/filter';

/** 教学实施计划上课信息 */
export default class CoursePlanExec {
  public static build(data: CoursePlanExec): CoursePlanExec {
    const coursePlanExec: CoursePlanExec = new CoursePlanExec();
    coursePlanExec.id = data.id;
    coursePlanExec.idList = data.idList;
    coursePlanExec.week = data.week;
    coursePlanExec.weeks = data.weeks;
    coursePlanExec.startWeeks = data.startWeeks;
    coursePlanExec.endWeeks = data.endWeeks;
    coursePlanExec.classes = data.classes;
    coursePlanExec.startClass = data.startClass;
    coursePlanExec.endClass = data.endClass;
    coursePlanExec.academicBuilding = data.academicBuilding;
    coursePlanExec.classrome = data.classrome;
    coursePlanExec.address = data.address;
    coursePlanExec.selectNum = data.selectNum;
    coursePlanExec.completeNum = data.completeNum;
    coursePlanExec.recordNum = data.recordNum;
    coursePlanExec.deleted = data.deleted;
    coursePlanExec.campus = data.campus ? Campus.build(data.campus) : null;
    coursePlanExec.teacher = data.teacher ? Person.build(data.teacher) : null;
    coursePlanExec.clazz = data.clazz ? CoursePlan.build(data.clazz) : null;
    coursePlanExec.filter = data.filter ? Filter.build(data.filter) : null;
    return coursePlanExec;
  }

  public static builds(datas: CoursePlanExec[]): CoursePlanExec[] {
    const coursePlanExecs: CoursePlanExec[] = [];
    datas.forEach((data: CoursePlanExec) => {
      const coursePlanExec: CoursePlanExec = CoursePlanExec.build(data);
      coursePlanExecs.push(coursePlanExec);
    });
    return coursePlanExecs;
  }

  /**  */
  public id: string = null;
  /**  */
  public idList: string[];
  /**  */
  public week: number = null;
  /**  */
  public weeks: number = null;
  /**  */
  public startWeeks: number = null;
  /**  */
  public endWeeks: number = null;
  /**  */
  public classes: string = null;
  /**  */
  public startClass: number = null;
  /**  */
  public endClass: number = null;
  /**  */
  public academicBuilding: string = null;
  /**  */
  public classrome: string = null;
  /**  */
  public address: string = null;
  /**  */
  public selectNum: number = null;
  /**  */
  public completeNum: number = null;
  /**  */
  public recordNum: number = null;
  /**  */
  public deleted: boolean = null;
  /**  */
  public defect: boolean = null;
  /**  */
  public campus: Campus = null;
  /**  */
  public teacher: Person = null;
  /**  */
  public clazz: CoursePlan = null;
  /**  */
  public filter: Filter = null;

  get weekValue() {
    const weekArray = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
    return weekArray[this.week - 1];
  }

  get weeksValue() {
    const startWeeks = this.startWeeks === null ? '' : this.startWeeks;
    const endWeeks = this.endWeeks === null ? '' : this.endWeeks;
    return startWeeks + '-' + endWeeks + '周';
  }

  get classesValue() {
    const startClass = this.startClass === null ? '' : this.startClass;
    const endClass = this.endClass === null ? '' : this.endClass;
    return startClass + '-' + endClass + '节';
  }

  get classRoomValue() {
    const academicBuilding = this.academicBuilding === null ? '' : this.academicBuilding;
    const classrome = this.classrome === null ? '' : this.classrome;
    return academicBuilding + ' ' + classrome;
  }

  get addressValue() {
    return this.weeksValue + ' ' + this.weekValue + ' ' + this.classesValue + ' ' + this.classRoomValue;
  }
}
