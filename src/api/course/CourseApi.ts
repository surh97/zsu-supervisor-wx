import service from '@/utils/request';
import { Plan } from '@/domains/work';

/**
 * 获取课程督导状态单位表
 *
 * @param param 查询条件
 */
export function listCourseSupervisorDepartmentCampusTableApi(param: Plan) {
  return service.post('/v2/courses/supervisors/departments/table', param);
}

/**
 * 获取教学实施计划列表
 *
 * @param param 查询条件
 */
export function listCoursePlanExecApi(param: Plan) {
  return service.post('/v2/courses/supervisors/list', param);
}
