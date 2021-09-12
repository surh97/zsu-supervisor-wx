import { CoursePlanExec } from '@/domains/course';
import { parseTime } from '@/utils/time';

/** 课程变更 */
export default class CourseChange {
  public static build(data: CourseChange): CourseChange {
    const courseChange = new CourseChange();
    courseChange.id = data.id;
    courseChange.changeReasonType = data.changeReasonType;
    courseChange.changeReason = data.changeReason;
    courseChange.contact = data.contact;
    courseChange.phone = data.phone;
    courseChange.changeType = data.changeType;
    courseChange.changeStatus = data.changeStatus;
    courseChange.flag = data.flag;
    courseChange.makeUpMissedLesson = data.makeUpMissedLesson;
    courseChange.executionStatus = data.executionStatus;
    courseChange.complete = data.complete;
    courseChange.oldCourseDate = data.oldCourseDate;
    courseChange.newCourseDate = data.newCourseDate;
    courseChange.updateTime = data.updateTime;
    courseChange.oldCoursePlan = data.oldCoursePlan ? CoursePlanExec.build(data.oldCoursePlan) : null;
    courseChange.newCoursePlan = data.newCoursePlan ? CoursePlanExec.build(data.newCoursePlan) : null;
    return courseChange;
  }

  public static builds(datas: CourseChange[]): CourseChange[] {
    const courseChanges: CourseChange[] = [];
    datas.forEach(
      (data: CourseChange): void => {
        const courseChange: CourseChange = CourseChange.build(data);
        courseChanges.push(courseChange);
      },
    );
    return courseChanges;
  }

  /** 编号 */
  public id: number = null;
  /** 变更类型 */
  public changeReasonType: string = null;
  /** 变更原因 */
  public changeReason: string = null;
  /**  */
  public contact: string = null;
  /**  */
  public phone: string = null;
  /**  */
  public changeType: string = null;
  /**  */
  public changeStatus: string = null;
  /**  */
  public flag: boolean = null;
  /**  */
  public makeUpMissedLesson: boolean = null;
  /**  */
  public executionStatus: boolean = null;
  /**  */
  public complete: boolean = null;
  /**  */
  public oldCourseDate: Date = null;
  /**  */
  public newCourseDate: Date = null;
  /**  */
  public updateTime: Date = null;
  /**  */
  public oldCoursePlan: CoursePlanExec = null;
  /**  */
  public newCoursePlan: CoursePlanExec = null;

  /**  */
  get weeksValue() {
    let weeks = this.oldCoursePlan.weeksValue;
    if (this.newCoursePlan.weeks && this.newCoursePlan.weeks !== this.oldCoursePlan.weeks) {
      weeks += ' >> ' + this.newCoursePlan.weeksValue;
    }
    return weeks;
  }

  /**  */
  get weekValue() {
    let week = this.oldCoursePlan.weekValue;
    if (this.newCoursePlan.week && this.newCoursePlan.week !== this.oldCoursePlan.week) {
      week += ' >> ' + this.newCoursePlan.weekValue;
    }
    return week;
  }

  /**  */
  get classesValue() {
    let classes = this.oldCoursePlan.classesValue;
    if (this.newCoursePlan.classesValue && this.newCoursePlan.classesValue !== classes) {
      classes += ' >> ' + this.newCoursePlan.classesValue;
    }
    return classes;
  }

  /**  */
  get campusValue() {
    return this.oldCoursePlan.campus.name;
  }

  /**  */
  get academicBuildingValue() {
    let academicBuilding = this.oldCoursePlan.academicBuilding;
    if (
      this.newCoursePlan.academicBuilding &&
      this.newCoursePlan.academicBuilding !== this.oldCoursePlan.academicBuilding
    ) {
      academicBuilding += ' >> ' + this.newCoursePlan.academicBuilding;
    }
    return academicBuilding;
  }

  /**  */
  get classRoomValue() {
    let classrome = this.oldCoursePlan.classrome;
    if (this.newCoursePlan.classrome && this.newCoursePlan.classrome !== this.oldCoursePlan.classrome) {
      classrome += ' >> ' + this.newCoursePlan.classrome;
    }
    return classrome;
  }

  /**  */
  get teacherValue() {
    let teacher = this.oldCoursePlan.teacher.name;
    if (this.newCoursePlan.teacher.id && this.newCoursePlan.teacher.id !== this.newCoursePlan.teacher.id) {
      teacher += ' >> ' + this.newCoursePlan.teacher.name;
    }
    return teacher;
  }

  /**  */
  get oldDateFormat() {
    return this.oldCourseDate ? parseTime(this.oldCourseDate, '{y}-{m}-{d}') : null;
  }

  /**  */
  get newDateFormat() {
    return this.newCourseDate ? parseTime(this.newCourseDate, '{y}-{m}-{d}') : null;
  }

  /**  */
  get updateTimeFormat() {
    return this.updateTime ? parseTime(this.updateTime, '{y}-{m}-{d} {h}:{i}:{s}') : null;
  }
}
