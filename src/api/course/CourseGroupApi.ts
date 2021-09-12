import service from '@/utils/request';

/** 获取学科列表 */
export function listCourseGroupApi() {
  return service.post('/v2/courses/groups/list', {});
}
