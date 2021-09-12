import service from '@/utils/request';
import { Summary } from '@/domains/work';

/**
 * 查询工作总结
 *
 * @param param
 */
export function listSummaryApi(param: Summary) {
  return service.post('/v2/summaries/list', param);
}

/**
 * 保存工作总结
 *
 * @param param
 */
export function saveSummaryApi(param: Summary) {
  return service.put('/v2/summaries/one', param);
}

/**
 * 导出工作总结Pdf
 *
 * @param param
 */
export function exportSummaryPdfApi(id: number) {
  return service.get('/v2/summaries/pdf', { params: { id } });
}
