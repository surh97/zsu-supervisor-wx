/** 民族 */
export default class Nation {
  public static build(data: Nation) {
    const nation: Nation = new Nation();
    nation.id = data.id;
    nation.name = data.name;
    return nation;
  }

  public static builds(datas: Nation[]) {
    const nations: Nation[] = [];
    datas.forEach((data: Nation) => {
      const nation: Nation = this.build(data);
      nations.push(nation);
    });
    return nations;
  }

  /** 民族编号 */
  public id: number = null;
  /** 民族名 */
  public name: string = null;
}
