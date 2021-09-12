import { RoundPlan } from '@/domains/round';
import { parseTime } from '@/utils/time';
import { Page } from '@/domains/page';

/** 轮次执行 */
export default class RoundExec {
  public static build(data: RoundExec): RoundExec {
    const roundExec: RoundExec = new RoundExec();
    roundExec.id = data.id;
    roundExec.loop = data.loop;
    roundExec.year = data.year;
    roundExec.term = data.term;
    roundExec.progress = data.progress;
    roundExec.target = data.target;
    roundExec.startTime = data.startTime;
    roundExec.endTime = data.endTime;
    roundExec.exec = data.exec;
    roundExec.roundPlan = data.roundPlan ? RoundPlan.build(data.roundPlan) : null;
    return roundExec;
  }

  public static builds(datas: RoundExec[]): RoundExec[] {
    const roundExecs: RoundExec[] = [];
    datas.forEach(
      (data: RoundExec): void => {
        const roundExec: RoundExec = RoundExec.build(data);
        roundExecs.push(roundExec);
      },
    );
    return roundExecs;
  }

  /** 编号 */
  public id: string = null;
  /** 循环 */
  public loop: number = null;
  /** 学年 */
  public year: string = null;
  /** 学期 */
  public term: number = null;
  /** 当前覆盖率 */
  public progress: number = null;
  /** 目标覆盖率 */
  public target: number = null;
  /** 起始时间 */
  public startTime: Date = null;
  /** 结束时间 */
  public endTime: Date = null;
  /** 执行 */
  public exec: boolean = null;
  /** 轮次计划 */
  public roundPlan: RoundPlan = null;
  /** 分页 */
  public pageInfo: Page = null;

  /** 起始时间（格式化） */
  get startTimeFormat() {
    return this.startTime ? parseTime(this.startTime, '{y}-{m}-{d} {h}:{i}:{s}') : null;
  }

  /** 结束时间（格式化） */
  get endTimeFormat() {
    return this.endTime ? parseTime(this.endTime, '{y}-{m}-{d} {h}:{i}:{s}') : null;
  }

  /** 执行值 */
  get execValue() {
    return this.exec ? '执行中' : '已结束';
  }
}
