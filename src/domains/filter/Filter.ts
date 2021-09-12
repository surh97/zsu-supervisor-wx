import { Person } from '@/domains/person';
import { CoursePlan, CoursePlanExec } from '@/domains/course';

/** 拦截 */
export default class Filter {
  public static build(data: Filter): Filter {
    const filter: Filter = new Filter();
    filter.id = data.id;
    filter.idList = data.idList;
    filter.maxListenNum = data.maxListenNum;
    filter.listenNum = data.listenNum;
    filter.deleted = data.deleted;
    filter.hide = data.hide;
    filter.comment = data.comment;
    filter.createTime = data.createTime;
    filter.deleteTime = data.deleteTime;
    filter.teacher = data.teacher ? Person.build(data.teacher) : null;
    filter.clazz = filter.clazz ? CoursePlan.build(filter.clazz) : null;
    filter.coursePlan = data.coursePlan ? CoursePlanExec.build(data.coursePlan) : null;
    return filter;
  }

  public static builds(datas: Filter[]): Filter[] {
    const filters: Filter[] = [];
    datas.forEach(
      (data: Filter): void => {
        const filter = Filter.build(data);
        filters.push(filter);
      },
    );
    return filters;
  }

  /** 编号 */
  public id: number = null;
  /** 编号列表 */
  public idList: number[];
  /** 最大听课次数 */
  public maxListenNum: number = null;
  /** 听课次数 */
  public listenNum: number = null;
  /** 删除 */
  public deleted: boolean = null;
  /** 隐藏 */
  public hide: boolean = null;
  /** 备注 */
  public comment: string = null;
  /** 创建时间 */
  public createTime: Date = null;
  /** 删除时间 */
  public deleteTime: Date = null;
  /** 教师 */
  public teacher: Person = null;
  /** 教学班 */
  public clazz: CoursePlan = null;
  /** 上课信息 */
  public coursePlan: CoursePlanExec = null;
}
