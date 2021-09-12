import service from '@/utils/request';
import { Plan, Record } from '@/domains/work';

/**
 * 保存听课计划
 *
 * @param param
 */
export function savePlanApi(param: Plan) {
  return service.post('/v2/plans/one', param);
}

/**
 * 更新听课计划
 *
 * @param param
 */
export function updatePlanApi(param: Plan) {
  return service.put('/v2/plans', param);
}

/**
 * 获取听课计划列表
 *
 * @param param
 */
export function listPlanApi(param: Record) {
  return service.post('/v2/plans/list', param);
}
