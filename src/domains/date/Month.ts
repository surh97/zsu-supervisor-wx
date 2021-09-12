import { Season } from '@/domains/date';
import { parseTime } from '@/utils/time';

/** 月份 */
export default class Month {
  public static build(data: Month): Month {
    const month: Month = new Month();
    month.id = data.id;
    month.year = data.year;
    month.month = data.month;
    month.startTime = data.startTime;
    month.endTime = data.endTime;
    month.deleted = data.deleted;
    month.season = data.season ? Season.build(data.season) : null;
    return month;
  }

  public static builds(datas: Month[]): Month[] {
    const months: Month[] = [];
    datas.forEach(
      (data: Month): void => {
        const month: Month = Month.build(data);
        months.push(month);
      },
    );
    return months;
  }

  /** 编号 */
  public id: number = null;
  /** 学年 */
  public year: string = null;
  /** 月份 */
  public month: number = null;
  /** 起始时间 */
  public startTime: Date = null;
  /** 结束时间 */
  public endTime: Date = null;
  /** 删除 */
  public deleted: boolean = null;
  /** 季度 */
  public season: Season = null;

  /** 季度值 */
  get seasonValue() {
    return (this.season.id === 1 ? this.year.substr(7, 2) : this.year.substr(2, 2)) + this.season.name;
  }

  /** 月份值 */
  get monthValue() {
    return this.month ? this.month + '月' : null;
  }

  /** 起始时间（格式化） */
  get startTimeFormat() {
    return this.startTime ? parseTime(this.startTime, '{y}-{m}-{d} {h}:{i}:{s}') : null;
  }

  /** 结束时间（格式化） */
  get endTimeFormat() {
    return this.endTime ? parseTime(this.endTime, '{y}-{m}-{d} {h}:{i}:{s}') : null;
  }
}
