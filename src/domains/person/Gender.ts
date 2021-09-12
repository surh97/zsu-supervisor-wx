/** 性别 */
export default class Gender {
  public static build(data: Gender) {
    const gender: Gender = new Gender();
    gender.id = data.id;
    gender.name = data.name;
    return gender;
  }

  public static builds(datas: Gender[]) {
    const genders: Gender[] = [];
    datas.forEach((data: Gender) => {
      const gender: Gender = this.build(data);
      genders.push(gender);
    });
    return genders;
  }

  /** 性别编号 */
  public id: number = null;
  /** 性别名 */
  public name: string = null;
}
