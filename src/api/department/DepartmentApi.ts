import service from '@/utils/request';

/** 获取单位列表 */
export function listDepartmentApi() {
  return service.post('/v2/departments/list', {});
}
