import { Person } from '@/domains/person';
import { SupervisorGroup } from '@/domains/supervisor';
import { Role } from '@/domains/user';
import { CourseGroup } from '@/domains/course';
import { Campus } from '@/domains/campus';
import { PaymentSupervisor, Payment } from '@/domains/payment';
import { Page } from '@/domains/page';

/** 督导 */
export default class Supervisor {
  public static build(data: Supervisor) {
    const supervisor: Supervisor = new Supervisor();
    supervisor.id = data.id;
    supervisor.code = data.code;
    supervisor.gender = data.gender;
    supervisor.nation = data.nation;
    supervisor.employStatus = data.employStatus;
    supervisor.allowanceType = data.allowanceType;
    supervisor.email = data.email;
    supervisor.phone = data.phone;
    supervisor.deleted = data.deleted;
    supervisor.person = data.person;
    supervisor.supervisorGroup = data.supervisorGroup ? SupervisorGroup.build(data.supervisorGroup) : null;
    supervisor.supervisorRole = data.supervisorRole ? Role.build(data.supervisorRole) : null;
    supervisor.courseGroup = data.courseGroup ? CourseGroup.build(data.courseGroup) : null;
    supervisor.supervisorPayList = data.supervisorPayList ? PaymentSupervisor.builds(data.supervisorPayList) : null;
    supervisor.campus = data.campus ? Campus.build(data.campus) : null;
    return supervisor;
  }

  public static builds(datas: Supervisor[]) {
    const supervisors: Supervisor[] = [];
    datas.forEach((data: Supervisor) => {
      const supervisor: Supervisor = Supervisor.build(data);
      supervisors.push(supervisor);
    });
    return supervisors;
  }

  /** 编号 */
  public id: number = null;
  /** 编码 */
  public code: string = null;
  /** 性别 */
  public gender: string | number;
  /** 民族 */
  public nation: string = null;
  /** 聘任状态 */
  public employStatus: string | number;
  /** 津贴类型 */
  public allowanceType: string = null;
  /** 邮箱 */
  public email: string = null;
  /** 电话 */
  public phone: string = null;
  /** 删除 */
  public deleted: string = null;
  /** 人员 */
  public person: Person = null;
  /** 督导组别 */
  public supervisorGroup: SupervisorGroup = null;
  /** 督导权限 */
  public supervisorRole: Role = null;
  /** 督导学科 */
  public courseGroup: CourseGroup = null;
  /** 督导校区 */
  public campus: Campus = null;
  /** 督导薪酬列表 */
  public supervisorPayList: PaymentSupervisor[];
  /** 分页 */
  public pageInfo: Page = null;

  constructor() {
    this.person = new Person();
  }

  public create(): Supervisor {
    this.person = new Person();
    this.courseGroup = new CourseGroup();
    this.supervisorGroup = new SupervisorGroup().create();
    return this;
  }

  get genderName() {
    if (this.gender) {
      return this.gender === 1 ? '女' : '男';
    }
    return null;
  }

  get employStatusName() {
    if (this.employStatus) {
      return this.employStatus === 1 ? '不在聘' : '在聘';
    }
    return null;
  }

  /** 获取薪酬小计 */
  get totalPayment() {
    let total: number = 0;
    this.supervisorPayList.forEach((paymentSupervisor: PaymentSupervisor) => {
      total += paymentSupervisor.pay.money || 0;
    });
    return total;
  }

  /** 获取督导薪酬 */
  get supervisorPayment() {
    return this.getPayment(1);
  }

  /** 设置督导薪酬 */
  set supervisorPayment(paymentSupervisor: PaymentSupervisor) {
    this.setPayment(1, paymentSupervisor);
  }

  /** 获取组长薪酬 */
  get supervisorGroupPayment() {
    return this.getPayment(2);
  }

  /** 设置异地薪酬 */
  set supervisorGroupPayment(paymentSupervisor: PaymentSupervisor) {
    this.setPayment(2, paymentSupervisor);
  }

  /** 获取薪酬 */
  private getPayment(paymentTypeId: number): PaymentSupervisor {
    // 是否为督导薪酬或组长薪酬
    if (!paymentTypeId || paymentTypeId < 1 || paymentTypeId > 2) {
      return null;
    }
    let supervisorPayment: PaymentSupervisor;
    // 获取督导薪酬
    this.supervisorPayList.some(
      (paymentSupervisor: PaymentSupervisor): boolean => {
        if (paymentSupervisor.pay.payType.id === paymentTypeId) {
          supervisorPayment = paymentSupervisor;
          return true;
        }
      },
    );
    // 督导薪酬为空
    if (!supervisorPayment) {
      // 实例督导薪酬
      supervisorPayment = new PaymentSupervisor();
      // 获取学年学期
      this.supervisorPayList.some(
        (paymentSupervisor: PaymentSupervisor): boolean => {
          supervisorPayment.year = paymentSupervisor.year;
          supervisorPayment.term = paymentSupervisor.term;
          return true;
        },
      );
      const payment = Payment.createEmptyPaymentByPaymentType(paymentTypeId);
      supervisorPayment.pay = payment;
      this.supervisorPayList.push(supervisorPayment);
    }
    return supervisorPayment;
  }

  /** 设置薪酬 */
  private setPayment(paymentTypeId: number, paymentSupervisor: PaymentSupervisor) {
    this.supervisorPayList.some(
      (paymentSp: PaymentSupervisor): boolean => {
        if (paymentSp.pay.payType.id === paymentTypeId) {
          paymentSp = paymentSupervisor;
          return true;
        }
      },
    );
  }
}
