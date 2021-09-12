import { Page } from '@/domains/page';
import { Supervisor } from '@/domains/supervisor';
import { parseTime } from '@/utils/time';
import { Plan, Record } from '@/domains/work';

/** 工作总结 */
export default class Summary {
  public static build(data: Summary) {
    const summary: Summary = new Summary();
    summary.id = data.id;
    summary.year = data.year;
    summary.term = data.term;
    summary.termOtherSupervisor = data.termOtherSupervisor;
    summary.termCourse = data.termCourse;
    summary.termSupervisorWork = data.termSupervisorWork;
    summary.termCampus = data.termCampus;
    summary.deleted = data.deleted;
    summary.createDate = data.createDate;
    summary.commitDate = data.commitDate;
    summary.engage = data.engage;
    summary.status = data.status;
    summary.statusList = data.statusList;
    summary.reject = data.reject;
    summary.supervisor = data.supervisor ? Supervisor.build(data.supervisor) : null;
    summary.planList = data.planList ? Plan.builds(data.planList) : null;
    return summary;
  }

  public static builds(datas: Summary[]) {
    const summarys: Summary[] = [];
    datas.forEach((data: Summary) => {
      const summary: Summary = this.build(data);
      summarys.push(summary);
    });
    return summarys;
  }

  /** 工作总结编号 */
  public id: number = null;
  /** 年度 */
  public year: string = null;
  /** 学期 */
  public term: number = null;
  /** 其他督导工作参加和开展情况 */
  public termOtherSupervisor: string = null;
  /** 对课程和教学工作的意见和建议 */
  public termCourse: string = null;
  /** 对督导工作的意见和建议 */
  public termSupervisorWork: string = null;
  /** 建议学院及时反馈意见 */
  public termCampus: string = null;
  /** 删除 */
  public deleted: boolean = null;
  /** 创建时间 */
  public createDate: Date = null;
  /** 提交时间 */
  public commitDate: Date = null;
  /** 续聘 */
  public engage: boolean = null;
  /** 状态 */
  public status: number = null;
  /** 状态列表 */
  public statusList: number[];
  /** 驳回 */
  public reject: string = null;
  /** 督导 */
  public supervisor: Supervisor = null;
  /** 个人听课评课工作情况 */
  public planList: Plan[];
  /** 分页 */
  public pageInfo: Page = null;
  /** 起始时间（查询） */
  public startTimeSearch: Date = null;
  /** 结束时间（查询） */
  public endTimeSearch: Date = null;

  public create(): Summary {
    this.deleted = true;
    this.planList = [];
    this.supervisor = new Supervisor().create();
    return this;
  }

  get createDateFormat() {
    return this.createDate ? parseTime(this.createDate, '{y}-{m}-{d}') : null;
  }

  get commitDateFormat() {
    return this.commitDate && this.status !== 1 ? parseTime(this.commitDate, '{y}-{m}-{d}') : null;
  }

  get engageValue() {
    switch (this.engage) {
      case true:
        return '是';
      case false:
        return '否';
      default:
        return '';
    }
  }

  get engageStyle() {
    switch (this.engage) {
      case true:
        return '';
      case false:
        return 'color: #f00';
      default:
        return '';
    }
  }

  get finishListen() {
    let num: number = 0;
    if (this.planList !== null && this.planList.length !== 0) {
      this.planList.forEach((plan: Plan) => {
        if (plan.recordList && plan.recordList.length !== 0) {
          plan.recordList.forEach((record: Record) => {
            if (record.status === 3) {
              num++;
            }
          });
        }
      });
    }
    return num;
  }

  get statusValue(): string {
    switch (this.status) {
      case 1:
        return '待提交';
      case 2:
        return '已提交';
      case 3:
        return '驳回';
      default:
        return '';
    }
  }
}
