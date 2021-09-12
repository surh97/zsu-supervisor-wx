import service from '@/utils/request';
import { Priority } from '@/domains/priority';

/**
 * 获取优先列表
 *
 * @param param
 */
export function listPriorityApi(param: Priority) {
  return service.post('/v2/priorities/list', param);
}
