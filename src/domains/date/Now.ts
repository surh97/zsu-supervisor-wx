import { Year } from '@/domains/date';

/** 当前学年 */
export default class Now {
  public static build(data: Now): Now {
    const now: Now = new Now();
    now.week = data.week;
    now.weeks = data.weeks;
    now.begins = data.begins;
    now.year = data.year ? Year.build(data.year) : null;
    return now;
  }

  public static builds(datas: Now[]): Now[] {
    const nows: Now[] = [];
    datas.forEach(
      (data: Now): void => {
        const now: Now = Now.build(data);
        nows.push(now);
      },
    );
    return nows;
  }

  /** 星期 */
  public week: number = null;
  /** 周 */
  public weeks: number = null;
  /** 进行中 */
  public begins: boolean = null;
  /** 学年 */
  public year: Year = null;

  constructor() {
    this.year = new Year();
  }

  /** 星期值 */
  get weekValue() {
    const weeks: string[] = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
    return this.week ? weeks[this.week - 1] : null;
  }

  /** 周值 */
  get weeksValue() {
    return this.weeks ? '第' + this.weeks + '周' : null;
  }
}
