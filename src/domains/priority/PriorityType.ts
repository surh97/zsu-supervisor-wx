import { Page } from '@/domains/page';
import { parseTime } from '@/utils/time';

/** 优先类型 */
export default class PriorityType {
  public static build(data: PriorityType): PriorityType {
    const priorityType: PriorityType = new PriorityType();
    priorityType.id = data.id;
    priorityType.name = data.name;
    priorityType.free = data.free;
    priorityType.supervisorCourseType = data.supervisorCourseType;
    priorityType.totalListenNum = data.totalListenNum;
    priorityType.maxListenNum = data.maxListenNum;
    priorityType.listenAllowance = data.listenAllowance;
    priorityType.year = data.year;
    priorityType.term = data.term;
    priorityType.createTime = data.createTime;
    priorityType.endTime = data.endTime;
    priorityType.end = data.end;
    priorityType.remarks = data.remarks;
    return priorityType;
  }

  public static builds(datas: PriorityType[]): PriorityType[] {
    const priorityTypes: PriorityType[] = [];
    datas.forEach(
      (data: PriorityType): void => {
        const priorityType: PriorityType = PriorityType.build(data);
        priorityTypes.push(priorityType);
      },
    );
    return priorityTypes;
  }

  /**  */
  public id: number = null;
  /**  */
  public name: string = null;
  /**  */
  public free: boolean = null;
  /**  */
  public supervisorCourseType: number = null;
  /**  */
  public totalListenNum: number = null;
  /**  */
  public maxListenNum: number = null;
  /**  */
  public listenAllowance: string = null;
  /**  */
  public year: string = null;
  /**  */
  public term: number = null;
  /**  */
  public createTime: Date = null;
  /**  */
  public endTime: Date = null;
  /**  */
  public end: boolean = null;
  /**  */
  public remarks: string = null;
  /**  */
  public pageInfo: Page = null;

  get freeValue() {
    return this.free ? '不限' : null;
  }

  get supervisorCourseTypeValue() {
    switch (this.supervisorCourseType) {
      case 1:
        return '随堂听课评课';
      case 2:
        return '课程跟踪评课';
      default:
        return null;
    }
  }

  get endValue() {
    return this.end ? '已结束' : '进行中';
  }

  get createTimeFormat() {
    return this.createTime ? parseTime(this.createTime, '{y}-{m}-{d} {h}:{i}:{s}') : null;
  }

  get endTimeFormat() {
    return this.endTime ? parseTime(this.endTime, '{y}-{m}-{d} {h}:{i}:{s}') : null;
  }
}
