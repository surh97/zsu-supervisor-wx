import { Record } from '@/domains/work';
import { Supervisor } from '@/domains/supervisor';
import { CoursePlanExec } from '@/domains/course';
import { RoundExec } from '@/domains/round';
import { parseTime } from '@/utils/time';
import { Page } from '@/domains/page';

/** 听课计划 */
export default class Plan {
  public static build(data: Plan): Plan {
    const plan: Plan = new Plan();
    plan.id = data.id;
    plan.idList = data.idList;
    plan.searchType = data.searchType;
    plan.listenType = data.listenType;
    plan.totalListenNum = data.totalListenNum;
    plan.commitRecordNum = data.commitRecordNum;
    plan.finishListenNum = data.finishListenNum;
    plan.totalListen = data.totalListen;
    plan.deleted = data.deleted;
    plan.createTime = data.createTime;
    plan.termOfValidity = data.termOfValidity;
    plan.supervisor = data.supervisor ? Supervisor.build(data.supervisor) : null;
    plan.coursePlan = data.coursePlan ? CoursePlanExec.build(data.coursePlan) : null;
    plan.roundExec = data.roundExec ? RoundExec.build(data.roundExec) : null;
    plan.recordList = data.recordList ? Record.builds(data.recordList) : null;
    return plan;
  }

  public static builds(datas: Plan[]): Plan[] {
    const plans: Plan[] = [];
    datas.forEach(
      (data: Plan): void => {
        const plan: Plan = Plan.build(data);
        plans.push(plan);
      },
    );
    return plans;
  }

  /**  */
  public id: number = null;
  /**  */
  public idList: number[] = null;
  /**  */
  public searchType: number = null;
  /**  */
  public listenType: number = null;
  /**  */
  public totalListenNum: number = null;
  /**  */
  public commitRecordNum: number = null;
  /**  */
  public finishListenNum: number = null;
  /**  */
  public totalListen: boolean = null;
  /**  */
  public deleted: boolean = null;
  /**  */
  public createTime: Date = null;
  /**  */
  public termOfValidity: Date = null;
  /**  */
  public supervisor: Supervisor = null;
  /**  */
  public coursePlan: CoursePlanExec = null;
  /**  */
  public roundExec: RoundExec = null;
  /**  */
  public recordList: Record[] = null;
  /**  */
  public pageInfo: Page = null;
  /**  */
  public startTimeSearch: Date = null;
  /**  */
  public endTimeSearch: Date = null;

  get planStatus() {
    let finishListenNum = 0;
    if (this.recordList && this.recordList.length !== 0) {
      this.recordList.forEach((record) => {
        if (record.status === 3 && !record.deleted) {
          finishListenNum = finishListenNum + 1;
        }
      });
    }
    return finishListenNum + '/' + this.totalListenNum;
  }

  get listenTypeName() {
    switch (this.listenType) {
      case 1:
        return '随堂听课评课';
      case 2:
        return '课程跟踪评课';
      default:
        return '其他';
    }
  }

  get createTimeFormat() {
    return this.createTime ? parseTime(this.createTime, '{y}-{m}-{d}') : null;
  }

  get termOfValidityFormat() {
    return this.termOfValidity ? parseTime(this.termOfValidity, '{y}-{m}-{d}') : null;
  }

  get termOfValidityColor() {
    const info: string = 'color: #303133';
    const primary: string = 'color: #409EFF';
    const success: string = 'color: #67C23A';
    const warning: string = 'color: #E6A23C';
    const danger: string = 'color: #F56C6C';

    if (this.totalListen) {
      return primary;
    }

    const now: Date = new Date();
    const time: Date = new Date(this.termOfValidity);

    const diff: number = time.getTime() - now.getTime();

    if (diff >= 14 * 24 * 60 * 60 * 1000) {
      return success;
    } else if (diff < 14 * 24 * 60 * 60 * 1000) {
      return warning;
    } else if (diff < 7 * 24 * 60 * 60 * 1000) {
      return danger;
    } else {
      return info;
    }
  }
}
