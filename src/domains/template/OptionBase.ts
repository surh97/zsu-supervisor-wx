/** 基本选项 */
export default class OptionBase {
  public static build(data: OptionBase): OptionBase {
    const optionBase: OptionBase = new OptionBase();
    optionBase.id = data.id;
    optionBase.name = data.name;
    optionBase.deleted = data.deleted;
    optionBase.remarks = data.remarks;
    return optionBase;
  }

  public static builds(datas: OptionBase[]): OptionBase[] {
    const optionBases: OptionBase[] = [];
    datas.forEach(
      (data: OptionBase): void => {
        const optionBase: OptionBase = OptionBase.build(data);
        optionBases.push(optionBase);
      },
    );
    return optionBases;
  }

  /** 编号 */
  public id: number = null;
  /** 选项名 */
  public name: string = null;
  /** 删除编号 */
  public deleted: boolean = null;
  /** 备注 */
  public remarks: string = null;
}
