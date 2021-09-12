import { Person } from '@/domains/person';
import { CoursePlan } from '@/domains/course';
import { PriorityType } from '@/domains/priority';
import { Page } from '@/domains/page';
import { parseTime } from '@/utils/time';

/** 优先 */
export default class Priority {
  public static build(data: Priority): Priority {
    const priority: Priority = new Priority();
    priority.id = data.id;
    priority.selectNum = data.selectNum;
    priority.completeNum = data.completeNum;
    priority.type = data.type;
    priority.enable = data.enable;
    priority.createTime = data.createTime = undefined ? null : data.createTime;
    priority.endTime = data.endTime;
    priority.remarks = data.remarks;
    priority.teacher = data.teacher ? Person.build(data.teacher) : null;
    priority.clazz = data.clazz ? CoursePlan.build(data.clazz) : null;
    priority.priorityOption = data.priorityOption ? PriorityType.build(data.priorityOption) : null;
    return priority;
  }

  public static builds(datas: Priority[]): Priority[] {
    const priorities: Priority[] = [];
    datas.forEach(
      (data: Priority): void => {
        const priority: Priority = Priority.build(data);
        priorities.push(priority);
      },
    );
    return priorities;
  }

  /**  */
  public id: number = null;
  /**  */
  public selectNum: number = null;
  /**  */
  public completeNum: number = null;
  /**  */
  public type: number = null;
  /**  */
  public enable: boolean = null;
  /**  */
  public createTime: Date = null;
  /**  */
  public endTime: Date = null;
  /**  */
  public remarks: string = null;
  /**  */
  public teacher: Person = null;
  /**  */
  public clazz: CoursePlan = null;
  /**  */
  public priorityOption: PriorityType = null;
  /**  */
  public pageInfo: Page = null;

  get enableValue() {
    return this.enable ? '进行中' : '已完成';
  }

  get createTimeFormat() {
    return this.createTime ? parseTime(this.createTime, '{y}-{m}-{d} {h}:{i}:{s}') : null;
  }

  get endTimeFormat() {
    return this.endTime ? parseTime(this.endTime, '{y}-{m}-{d} {h}:{i}:{s}') : null;
  }

  get status() {
    return this.completeNum + ' / ' + this.selectNum;
  }
}
