import { OptionType, OptionBase } from '@/domains/template';

/** 选项 */
export default class Option {
  public static build(data: Option): Option {
    const option: Option = new Option();
    option.id = data.id;
    option.value = data.value;
    option.order = data.order;
    option.deleted = data.deleted;
    option.remarks = data.remarks;
    option.base = data.base ? OptionBase.build(data.base) : null;
    option.type = data.type ? OptionType.build(data.type) : null;
    return option;
  }

  public static builds(datas: Option[]): Option[] {
    const options: Option[] = [];
    datas.forEach(
      (data: Option): void => {
        const option: Option = Option.build(data);
        options.push(option);
      },
    );
    return options;
  }

  /** 编号 */
  public id: number = null;
  /** 选项值 */
  public value: string = null;
  /** 顺序 */
  public order: number = null;
  /** 删除 */
  public deleted: boolean = null;
  /** 备注 */
  public remarks: string = null;
  /** 基础选项 */
  public base: OptionBase = null;
  /** 选项类型 */
  public type: OptionType = null;
}
