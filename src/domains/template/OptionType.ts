/** 选项类型 */
export default class OptionType {
  public static build(data: OptionType): OptionType {
    const optionType: OptionType = new OptionType();
    optionType.id = data.id;
    optionType.name = data.name;
    return optionType;
  }

  public static builds(datas: OptionType[]): OptionType[] {
    const optionTypes: OptionType[] = [];
    datas.forEach(
      (data: OptionType): void => {
        const optionType: OptionType = OptionType.build(data);
        optionTypes.push(optionType);
      },
    );
    return optionTypes;
  }

  /** 编号 */
  public id: number = null;
  /** 类型 */
  public name: string = null;
}
