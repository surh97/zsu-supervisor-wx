import { Payment } from '@/domains/payment';
import { Page } from '@/domains/page';
import { Record } from '@/domains/work';

/** 档案薪酬 */
export default class PaymentRecord {
  public static build(data: PaymentRecord): PaymentRecord {
    const paymentRecord: PaymentRecord = new PaymentRecord();
    paymentRecord.pay = data.pay ? Payment.build(data.pay) : null;
    paymentRecord.record = data.record ? Record.build(data.record) : null;
    return paymentRecord;
  }

  public static builds(datas: PaymentRecord[]): PaymentRecord[] {
    const paymentRecords: PaymentRecord[] = [];
    datas.forEach(
      (data: PaymentRecord): void => {
        const paymentRecord: PaymentRecord = PaymentRecord.build(data);
        paymentRecords.push(paymentRecord);
      },
    );
    return paymentRecords;
  }

  /** 薪酬 */
  public pay: Payment = null;
  /** 档案 */
  public record: Record = null;
  /** 分页 */
  public pageInfo: Page = null;
}
