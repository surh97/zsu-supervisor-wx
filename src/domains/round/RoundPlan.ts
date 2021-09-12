import { CourseGroup } from '@/domains/course';
import { Round } from '@/domains/round';

/**  */
export default class RoundPlan {
  public static build(data: RoundPlan): RoundPlan {
    const roundPlan: RoundPlan = new RoundPlan();
    roundPlan.id = data.id;
    roundPlan.order = data.order;
    roundPlan.enter = data.enter;
    roundPlan.deleted = data.deleted;
    roundPlan.courseGroup = data.courseGroup ? CourseGroup.build(data.courseGroup) : null;
    roundPlan.round = data.round ? Round.build(data.round) : null;
    return roundPlan;
  }

  public static builds(datas: RoundPlan[]): RoundPlan[] {
    const roundPlans: RoundPlan[] = [];
    datas.forEach(
      (data: RoundPlan): void => {
        const roundPlan: RoundPlan = RoundPlan.build(data);
        roundPlans.push(roundPlan);
      },
    );
    return roundPlans;
  }

  /** 编号 */
  public id: number = null;
  /** 排序 */
  public order: number = null;
  /** 切入 */
  public enter: boolean = null;
  /** 删除 */
  public deleted: boolean = null;
  /** 学科 */
  public courseGroup: CourseGroup = null;
  /** 轮次 */
  public round: Round = null;
}
