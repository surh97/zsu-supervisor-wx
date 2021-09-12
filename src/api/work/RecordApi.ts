import service from '@/utils/request';
import { Record } from '@/domains/work';

/**
 * 获取督导听课档案
 *
 * @param param
 */
export function listRecordApi(param: Record) {
  return service.post('/v2/records/list', param);
}

/**
 * 保存听课记录
 *
 * @param param
 */
export function saveRecordApi(param: Record) {
  return service.post('/v2/records', param);
}

/**
 * 获取记录档案
 *
 * @param param
 */
export function findRecordTemplateApi(param: Record) {
  return service.post('/v2/archives/one', param);
}

/**
 * 获取记录档案列表
 *
 * @param params
 */
export function listRecordTemplateApi(params: Record) {
  return service.post('/v2/archives/list', params);
}

/**
 * 更新记录档案
 *
 * @param param
 */
export function updateRecordTemplateApi(param: Record) {
  return service.put('/v2/archives', param);
}

/**
 * 导出记录档案Pdf
 *
 * @param param
 */
export function exportRecordTemplatePdfApi(id: number) {
  return service.get('/v2/archives/pdf', { params: { id } });
}

/**
 * 查询档案 教师姓名相关信息
 *
 * @param param
 */
export function findRecordTempalteTeacherApi(param: Record) {
  return service.post('/coursePlanZsuInfo/list', param);
}

/**
 * 修改职工id
 *
 * @param param
 *
 */
export function updateTeacherApi(param: any) {
  return service.put('/coursePlanZsuInfo/updateZgh', param);
}
