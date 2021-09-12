import service from '@/utils/request';
import { Record } from '@/domains/work';

/**
 * 获取计划督导组别校区报表
 *
 * @param param
 */
export function listPlanSupervisorGroupCampusReportApi(param: Record) {
  return service.post('/v2/plans/reports/supervisors/groups/campus/list', param);
}
