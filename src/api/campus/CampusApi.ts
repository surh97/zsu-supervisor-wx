import service from '@/utils/request';

/** 获取校区列表 */
export function listCampusApi() {
  return service.get('/v2/campuses/list');
}
