import { Season } from '@/domains/date';

/** 默认月份 */
export default class MonthDefault {
  public static build(data: MonthDefault): MonthDefault {
    const monthDefault: MonthDefault = new MonthDefault();
    monthDefault.id = data.id;
    monthDefault.month = data.month;
    monthDefault.startMonth = data.startMonth;
    monthDefault.startDays = data.startDays;
    monthDefault.endMonth = data.endMonth;
    monthDefault.endDays = data.endDays;
    monthDefault.remarks = data.remarks;
    monthDefault.season = data.season ? Season.build(data.season) : null;
    return monthDefault;
  }

  public static builds(datas: MonthDefault[]): MonthDefault[] {
    const monthDefaults: MonthDefault[] = [];
    datas.forEach(
      (data: MonthDefault): void => {
        const monthDefault: MonthDefault = MonthDefault.build(data);
        monthDefaults.push(monthDefault);
      },
    );
    return monthDefaults;
  }

  /** 编号 */
  public id: number = null;
  /** 月份 */
  public month: number = null;
  /** 起始月份 */
  public startMonth: number = null;
  /** 起始日期 */
  public startDays: number = null;
  /** 结束月份 */
  public endMonth: number = null;
  /** 结束日期 */
  public endDays: number = null;
  /** 季度 */
  public season: Season = null;
  /** 备注 */
  public remarks: string = null;

  /** 月份值 */
  get monthValue() {
    return this.month + '月';
  }

  /** 起始日期 */
  get start() {
    return this.zero(this.startMonth) + '月' + this.zero(this.startDays) + '日';
  }

  /** 结束日期 */
  get end() {
    return this.zero(this.endMonth) + '月' + this.zero(this.endDays) + '日';
  }

  /** 零 */
  private zero(num: number): string {
    const data: string = num + '';
    return data.length === 1 ? '0' + data : data;
  }
}
