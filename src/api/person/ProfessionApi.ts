import service from '@/utils/request';

/** 获取职称列表 */
export function listProfessionApi() {
  return service.get('/v2/persons/profession/list');
}
