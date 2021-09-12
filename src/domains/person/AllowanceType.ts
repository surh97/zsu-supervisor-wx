/** 薪酬类型 */
export default class AllowanceType {
  public static build(data: AllowanceType) {
    const allowanceType: AllowanceType = new AllowanceType();
    allowanceType.id = data.id = undefined ? null : data.id;
    allowanceType.name = data.name = undefined ? null : data.name;
    return allowanceType;
  }

  public static builds(datas: AllowanceType[]) {
    const allowanceTypes: AllowanceType[] = [];
    datas.forEach((data: AllowanceType) => {
      const allowanceType: AllowanceType = this.build(data);
      allowanceTypes.push(allowanceType);
    });
    return allowanceTypes;
  }

  /** 薪酬类型编号 */
  public id: number = null;
  /** 薪酬类型名 */
  public name: string = null;
}
