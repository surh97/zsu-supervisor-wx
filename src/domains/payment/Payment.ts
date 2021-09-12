import { PaymentStatus, PaymentType } from '@/domains/payment';
import { Month } from '@/domains/date';
import { parseTime } from '@/utils/time';

/** 薪酬 */
export default class Payment {
  public static build(data: Payment): Payment {
    const payment: Payment = new Payment();
    payment.id = data.id;
    payment.money = data.money;
    payment.createTime = data.createTime;
    payment.remarks = data.remarks;
    payment.payStatus = data.payStatus ? PaymentStatus.build(data.payStatus) : null;
    payment.payType = data.payType ? PaymentType.build(data.payType) : null;
    payment.month = data.month ? Month.build(data.month) : null;
    return payment;
  }

  public static builds(datas: Payment[]): Payment[] {
    const payments: Payment[] = [];
    datas.forEach(
      (data: Payment): void => {
        const payment: Payment = Payment.build(data);
        payments.push(payment);
      },
    );
    return payments;
  }

  /**
   * 创建空薪酬
   *
   * @param paymentTypeId  薪酬类型编号
   */
  public static createEmptyPaymentByPaymentType(paymentTypeId: number): Payment {
    const payment: Payment = new Payment();
    payment.payType = new PaymentType();
    payment.payType.id = paymentTypeId;
    return payment;
  }

  /** 编号 */
  public id: string = null;
  /** 薪酬 */
  public money: number = null;
  /** 创建时间 */
  public createTime: string = null;
  /** 备注 */
  public remarks: string = null;
  /** 薪酬状态 */
  public payStatus: PaymentStatus = null;
  /** 薪酬类型 */
  public payType: PaymentType = null;
  /** 月份 */
  public month: Month = null;

  /** 创建时间（格式化） */
  get createTimeFormat() {
    return this.createTime ? parseTime(this.createTime, '{y}-{m}-{d} {h}:{i}:{s}') : null;
  }
}
