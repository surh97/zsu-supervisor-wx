import { Campus } from '@/domains/campus';
import { Plan } from '@/domains/work';
import { Payment } from '@/domains/payment';
import { Page } from '@/domains/page';
import { parseTime } from '@/utils/time';
import { Month } from '@/domains/date';
import { Template } from '@/domains/template';
import { isNullOrUndefined } from 'util';

/** 档案 */
export default class Record {
  public static build(data: Record): Record {
    const record: Record = new Record();
    record.id = data.id;
    record.idList = data.idList;
    record.useTime = data.useTime;
    record.confirmTime = data.confirmTime;
    record.createDate = data.createDate;
    record.ip = data.ip;
    record.source = data.source;
    record.status = data.status;
    record.deleted = data.deleted;
    record.statusList = data.statusList;
    record.rejection = data.rejection;
    record.sumScore = data.sumScore;
    record.weeks = data.weeks;
    record.week = data.week;
    record.classes = data.classes;
    record.fuzzy = data.fuzzy;
    record.confirmWeeks = data.confirmWeeks;
    record.orderBy = data.orderBy;
    record.orderRule = data.orderRule;
    record.courseFormId = data.courseFormId;
    record.campus = data.campus ? Campus.build(data.campus) : null;
    record.plan = data.plan ? Plan.build(data.plan) : null;
    record.pays = data.pays ? Payment.builds(data.pays) : null;
    record.month = data.month ? Month.build(data.month) : null;
    record.template = data.template ? Template.build(data.template) : null;
    return record;
  }

  public static builds(datas: Record[]): Record[] {
    const records: Record[] = [];
    datas.forEach(
      (data: Record): void => {
        const record: Record = Record.build(data);
        records.push(record);
      },
    );
    return records;
  }

  /**  */
  public id: number = null;
  /**  */
  public idList: number[] = null;
  /**  */
  public useTime: string = null;
  /**  */
  public confirmTime: Date = null;
  /**  */
  public createDate: Date = null;
  /**  */
  public ip: string = null;
  /**  */
  public source: string = null;
  /**  */
  public status: number = null;
  /**  */
  public deleted: boolean = null;
  /**  */
  public statusList: number[] = null;
  /**  */
  public rejection: string = null;
  /**  */
  public sumScore: string = null;
  /**  */
  public weeks: string = null;
  /**  */
  public week: string = null;
  /**  */
  public classes: string = null;
  /**  */
  public fuzzy: string = null;
  /**  */
  public confirmWeeks: number = null;
  /**  */
  public courseFormId: number = null;
  /**  */
  public campus: Campus = null;
  /**  */
  public plan: Plan = null;
  /**  */
  public pays: Payment[] = null;
  /**  */
  public pageInfo: Page = null;
  /**  */
  public month: Month = null;
  /**  */
  public template: Template = null;
  /**  */
  public follow: number = null;
  /**  */
  public startTimeSearch: Date = null;
  /**  */
  public endTimeSearch: Date = null;
  /**  */
  public orderBy: 'confirmTime' | 'sumScore' = null;
  /**  */
  public orderRule: 'ASC' | 'DESC' = null;

  public maxScore: string = '100';
  public minScore: string = '0';

  get weeksValue() {
    return this.weeks ? '第' + this.weeks + '周' : null;
  }

  get statusValue() {
    const names: string[] = ['待填写档案', '保存待提交', '正式档案', '驳回待修改', '提交待审核'];
    return names[this.status - 1];
  }

  get createDateFormat() {
    return this.createDate ? parseTime(this.createDate, '{y}-{m}-{d} {h}:{i}:{s}') : null;
  }

  get confirmTimeFormat() {
    return this.confirmTime ? parseTime(this.confirmTime, '{y}-{m}-{d} {h}:{i}:{s}') : null;
  }

  /** 获取档案薪酬 */
  get paymentRecord() {
    return this.getPayment(3);
  }

  /** 设置档案薪酬 */
  set paymentRecord(payment: Payment) {
    this.setPayment(3, payment);
  }

  /** 获取异校薪酬 */
  get paymentDiffCampus() {
    return this.getPayment(4);
  }

  /** 设置异校薪酬 */
  set paymentDiffCampus(payment: Payment) {
    this.setPayment(4, payment);
  }

  /** 获取异地薪酬 */
  get paymentDiffSchool() {
    return this.getPayment(5);
  }

  /** 设置异地薪酬 */
  set paymentDiffSchool(payment: Payment) {
    this.setPayment(5, payment);
  }

  /** 获取薪酬小计 */
  get totalPayment() {
    let total: number = 0;
    this.pays.forEach((pay: Payment) => {
      total += pay.money || 0;
    });
    return total;
  }

  /** 获取分数 */
  get sumScoreValue() {
    return !isNullOrUndefined(this.status) && [3, 4, 5].indexOf(this.status) >= 0 ? this.sumScore + '分' : null;
  }

  /** 获取薪酬 */
  private getPayment(paymentTypeId: number): Payment {
    if (!paymentTypeId || paymentTypeId < 3 || paymentTypeId > 5) {
      return null;
    }
    let payment;
    this.pays.some(
      (pay: Payment): boolean => {
        if (pay.payType.id === paymentTypeId) {
          payment = pay;
          return true;
        }
      },
    );
    if (!payment) {
      payment = Payment.createEmptyPaymentByPaymentType(paymentTypeId);
      this.pays.push(payment);
    }
    return payment;
  }

  /** 设置薪酬 */
  private setPayment(paymentTypeId: number, payment: Payment) {
    this.pays.some(
      (pay: Payment): boolean => {
        if (pay.payType.id === paymentTypeId) {
          pay = payment;
          return true;
        }
      },
    );
  }
}
