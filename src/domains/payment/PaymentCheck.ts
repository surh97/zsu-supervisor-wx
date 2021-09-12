import { Supervisor } from '@/domains/supervisor';
import { Page } from '@/domains/page';
import { parseTime } from '@/utils/time';

/** 薪酬核对 */
export default class PaymentCheck {
  public static build(data: PaymentCheck): PaymentCheck {
    const paymentCheck: PaymentCheck = new PaymentCheck();
    paymentCheck.id = data.id;
    paymentCheck.recordId = data.recordId;
    paymentCheck.year = data.year;
    paymentCheck.term = data.term;
    paymentCheck.month = data.month;
    paymentCheck.confirmTime = data.confirmTime;
    paymentCheck.campus = data.campus;
    paymentCheck.weeks = data.weeks;
    paymentCheck.week = data.week;
    paymentCheck.classes = data.classes;
    paymentCheck.course = data.course;
    paymentCheck.teacher = data.teacher;
    paymentCheck.listenPayment = data.listenPayment ? data.listenPayment : '';
    paymentCheck.campusPayment = data.campusPayment ? data.campusPayment : '';
    paymentCheck.schoolPayment = data.schoolPayment ? data.schoolPayment : '';
    paymentCheck.otherPayment = data.otherPayment ? data.otherPayment : '';
    paymentCheck.totalPayment = data.totalPayment != null ? data.totalPayment : '';
    paymentCheck.status = data.status;
    paymentCheck.remarks = data.remarks;
    paymentCheck.localSystem = data.localSystem;
    paymentCheck.supervisorGroup = data.supervisorGroup;
    paymentCheck.supervisor = data.supervisor ? Supervisor.build(data.supervisor) : null;
    return paymentCheck;
  }

  public static builds(datas: PaymentCheck[]): PaymentCheck[] {
    const paymentChecks: PaymentCheck[] = [];
    datas.forEach(
      (data: PaymentCheck): void => {
        const paymentCheck: PaymentCheck = PaymentCheck.build(data);
        paymentChecks.push(paymentCheck);
      },
    );
    return paymentChecks;
  }

  /** 编号 */
  public id: number = null;
  /** 档案编号 */
  public recordId: number = null;
  /** 学年 */
  public year: string = null;
  /** 学期 */
  public term: number = null;
  /** 月份 */
  public month: number = null;
  /** 提交时间 */
  public confirmTime: Date = null;
  /** 校区 */
  public campus: string = null;
  /** 听课周 */
  public weeks: string = null;
  /** 听课星期 */
  public week: string = null;
  /** 听课节 */
  public classes: string = null;
  /** 课程 */
  public course: string = null;
  /** 教师 */
  public teacher: string = null;
  /** 听课津贴 */
  public listenPayment: string = null;
  /** 异校津贴 */
  public campusPayment: string = null;
  /** 异地津贴 */
  public schoolPayment: string = null;
  /** 其他津贴 */
  public otherPayment: string = null;
  /** 津贴小计 */
  public totalPayment: string = null;
  /** 状态 */
  public status: number = null;
  /** 备注 */
  public remarks: string = null;
  /** 督导组别 */
  public supervisorGroup: string = null;
  /** 本地系统 */
  public localSystem: boolean = null;
  /** 督导 */
  public supervisor: Supervisor = null;
  /** 分页信息 */
  public pageInfo: Page = null;

  /** 状态值 */
  get statusValue() {
    const names: string[] = ['待核查', '已核查', '反馈', '已处理'];
    return this.status ? names[this.status - 1] : null;
  }

  /** 状态按钮类型 */
  get statusButtonType() {
    const names: string[] = ['primary', 'success', 'danger', 'primary'];
    return this.status ? names[this.status - 1] : null;
  }

  /** 提交时间格式化 */
  get confirmTimeFormat() {
    return this.confirmTime ? parseTime(this.confirmTime, '{y}-{m}-{d} {h}:{i}:{s}') : null;
  }

  /** 系统类型 */
  get system() {
    return this.localSystem ? '新系统' : '问卷星';
  }
}
