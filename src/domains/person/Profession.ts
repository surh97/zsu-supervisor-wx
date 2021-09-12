/** 职称 */
export default class Profession {
  public static build(data: Profession) {
    const profession: Profession = new Profession();
    profession.id = data.id;
    profession.name = data.name;
    return profession;
  }

  public static builds(datas: Profession[]) {
    const professions: Profession[] = [];
    datas.forEach((data: Profession) => {
      const profession: Profession = Profession.build(data);
      professions.push(profession);
    });
    return Profession;
  }

  /** 职称编号 */
  public id: string = null;
  /** 职称名 */
  public name: string = null;
}
