import service from '@/utils/request';
import { PaymentRecord } from '@/domains/payment';

/**
 * 获取档案薪酬列表
 *
 * @param param
 */
export function listPaymentRecordApi(param: PaymentRecord) {
  return service.post('/v2/records/payments/list', param);
}
