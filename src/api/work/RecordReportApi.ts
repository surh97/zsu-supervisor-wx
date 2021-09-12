import service from '@/utils/request';
import { Record } from '@/domains/work';

/**
 * 获取记录督导组别校区报表
 *
 * @param param
 */
export function listRecordSupervisorGroupCampusReportApi(param: Record) {
  return service.post('/v2/records/reports/supervisors/groups/campus/list', param);
}

/**
 * 获取记录督导月份报表
 *
 * @param param
 */
export function listRecordSupervisorMonthReportApi(param: Record) {
  return service.post('/v2/workloads/list', param);
}
