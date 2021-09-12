/** 薪酬类型 */
export default class PaymentStatus {
  public static build(data: PaymentStatus): PaymentStatus {
    const paymentStatus: PaymentStatus = new PaymentStatus();
    paymentStatus.id = data.id;
    paymentStatus.name = data.name;
    paymentStatus.remarks = data.remarks;
    return paymentStatus;
  }

  public static builds(datas: PaymentStatus[]): PaymentStatus[] {
    const paymentStatuses: PaymentStatus[] = [];
    datas.forEach(
      (data: PaymentStatus): void => {
        const paymentStatus: PaymentStatus = PaymentStatus.build(data);
        paymentStatuses.push(paymentStatus);
      },
    );
    return paymentStatuses;
  }

  /** 编号 */
  public id: number = null;
  /** 类型名 */
  public name: string = null;
  /** 备注 */
  public remarks: string = null;
}
