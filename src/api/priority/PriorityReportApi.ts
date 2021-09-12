import service from '@/utils/request';
import { Priority } from '@/domains/priority';

/**
 * 获取教师优先学科报表
 *
 * @param param
 */
export function listPriorityTeacherCourseGroupCampusReportApi(param: Priority) {
  return service.post('/v2/priorities/reports/teachers/courses/groups/list', param);
}

/**
 * 获取教学班优先学科报表
 *
 * @param param
 */
export function listPriorityClazzCourseGroupCampusReportApi(param: Priority) {
  return service.post('/v2/priorities/reports/classes/courses/groups/list', param);
}
