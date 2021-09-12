import { PaymentType } from '@/domains/payment';

/** 薪酬月份 */
export default class PaymentMonth {
  public static build(data: PaymentMonth): PaymentMonth {
    const paymentMonth: PaymentMonth = new PaymentMonth();
    paymentMonth.paymentType = data.paymentType ? PaymentType.build(data.paymentType) : null;
    paymentMonth.month = data.month;
    paymentMonth.pay = data.pay;
    return paymentMonth;
  }

  public static builds(datas: PaymentMonth[]): PaymentMonth[] {
    const paymentMonths: PaymentMonth[] = [];
    datas.forEach(
      (data: PaymentMonth): void => {
        const paymentMonth: PaymentMonth = PaymentMonth.build(data);
        paymentMonths.push(paymentMonth);
      },
    );
    return paymentMonths;
  }

  /** 薪酬类型 */
  public paymentType: PaymentType = null;
  /** 月份 */
  public month: number = null;
  /** 是否支付 */
  public pay: boolean = null;
}
