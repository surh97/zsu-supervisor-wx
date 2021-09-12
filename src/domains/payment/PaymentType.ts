import { PaymentMonth } from '@/domains/payment';

/** 薪酬类型 */
export default class PaymentType {
  public static build(data: PaymentType): PaymentType {
    const paymentType: PaymentType = new PaymentType();
    paymentType.id = data.id;
    paymentType.name = data.name;
    paymentType.money = data.money;
    paymentType.remarks = data.remarks;
    paymentType.payMonthList = data.payMonthList ? PaymentMonth.builds(data.payMonthList) : null;
    return paymentType;
  }

  public static builds(datas: PaymentType[]): PaymentType[] {
    const paymentTypes: PaymentType[] = [];
    datas.forEach(
      (data: PaymentType): void => {
        const paymentType: PaymentType = PaymentType.build(data);
        paymentTypes.push(paymentType);
      },
    );
    return paymentTypes;
  }

  /** 编号 */
  public id: number = null;
  /** 类型 */
  public name: string = null;
  /** 默认金额 */
  public money: string = null;
  /** 备注 */
  public remarks: string = null;
  /** 支付月份列表 */
  public payMonthList: PaymentMonth[];

  /** 月份 */
  get months(): string {
    let months: string = '';
    if (this.payMonthList) {
      this.payMonthList.forEach((paymentMonth: PaymentMonth) => {
        months += paymentMonth.pay ? paymentMonth.month + '月, ' : '';
      });
    }
    return months.length > 0 ? months.substr(0, months.length - 2) : null;
  }
}
