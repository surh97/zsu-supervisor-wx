import { parseTime } from '@/utils/time';
import { isNullOrUndefined } from 'util';

export default class Year {
  public static build(data: Year): Year {
    const year: Year = new Year();
    year.year = data.year;
    year.term = data.term;
    year.startTime = data.startTime;
    year.endTime = data.endTime;
    year.remarks = data.remarks;
    return year;
  }

  public static builds(datas: Year[]): Year[] {
    const years: Year[] = [];
    datas.forEach(
      (data: Year): void => {
        const year: Year = Year.build(data);
        years.push(year);
      },
    );
    return years;
  }

  public year: string = null;
  public term: number = null;
  public startTime: Date = null;
  public endTime: Date = null;
  public remarks: string = null;

  get startTimeFormat() {
    return this.startTime ? parseTime(this.startTime, '{y}-{m}-{d} {h}:{i}:{s}') : null;
  }

  get endTimeFormat() {
    return this.endTime ? parseTime(this.endTime, '{y}-{m}-{d} {h}:{i}:{s}') : null;
  }

  get termValue() {
    const termNames: string[] = ['第一学期', '第二学期', '第三学期'];
    return isNullOrUndefined(this.term) ? null : termNames[this.term - 1];
  }
}
