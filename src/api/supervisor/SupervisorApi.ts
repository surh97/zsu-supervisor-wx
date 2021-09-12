import service from '@/utils/request';
import { Supervisor } from '@/domains/supervisor';

/**
 * 获取督导
 */
export function findSupervisorApi() {
  return service.post('/v2/supervisors/one', {});
}

/**
 * 更新督导
 *
 * @param data
 */
export function updateSupervisorApi(param: Supervisor) {
  return service.post('/web/supervisorInfoForAdmin/updateSupervisor', param);
}
