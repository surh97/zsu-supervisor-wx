import { Supervisor } from '@/domains/supervisor';
import { Summary } from '@/domains/work';
import { Payment } from '@/domains/payment';
import { Page } from '@/domains/page';

/** 督导薪酬 */
export default class PaymentSupervisor {
  public static build(data: PaymentSupervisor): PaymentSupervisor {
    const paymentSupervisor: PaymentSupervisor = new PaymentSupervisor();
    paymentSupervisor.year = data.year;
    paymentSupervisor.term = data.term;
    paymentSupervisor.pay = data.pay ? Payment.build(data.pay) : null;
    paymentSupervisor.summary = data.summary ? Summary.build(data.summary) : null;
    paymentSupervisor.supervisor = data.supervisor ? Supervisor.build(data.supervisor) : null;
    return paymentSupervisor;
  }

  public static builds(datas: PaymentSupervisor[]): PaymentSupervisor[] {
    const paymentSupervisors: PaymentSupervisor[] = [];
    datas.forEach(
      (data: PaymentSupervisor): void => {
        const paymentSupervisor: PaymentSupervisor = PaymentSupervisor.build(data);
        paymentSupervisors.push(paymentSupervisor);
      },
    );
    return paymentSupervisors;
  }

  /** 学年 */
  public year: string = null;
  /** 学期 */
  public term: number = null;
  /** 薪酬 */
  public pay: Payment = null;
  /** 工作总结 */
  public summary: Summary = null;
  /** 督导 */
  public supervisor: Supervisor = null;
  /** 分页 */
  public pageInfo: Page = null;
}
