/** 聘任 */
export default class Employment {
  public static build(data: Employment) {
    const employment: Employment = new Employment();
    employment.id = data.id;
    employment.name = data.name;
    return employment;
  }

  public static builds(datas: Employment[]) {
    const employments: Employment[] = [];
    datas.forEach((data: Employment) => {
      const employment: Employment = this.build(data);
      employments.push(employment);
    });
    return employments;
  }

  /** 聘任编号 */
  public id: number = null;
  /** 聘任名 */
  public name: string = null;
}
