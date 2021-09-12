import service from '@/utils/request';
import { Year } from '@/domains/date';

/** 获取当前学年 */
export function findNowApi() {
  return service.post('/v2/years/now', {});
}

/** 获取学年列表 */
export function listYearApi() {
  return service.post('/v2/years/list', {});
}

/** 获取学期列表 */
export function listTermApi() {
  return new Promise((resolve, reject) => {
    const terms: Year[] = [];
    for (let i = 0; i < 3; i++) {
      const year: Year = new Year();
      year.term = i + 1;
      terms.push(year);
    }
    resolve(terms);
  });
}
