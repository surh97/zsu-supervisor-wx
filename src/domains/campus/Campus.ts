/** 校区 */
export default class Campus {
  public static build(data: Campus) {
    const campus: Campus = new Campus();
    campus.id = data.id;
    campus.name = data.name;
    return campus;
  }

  public static builds(datas: Campus[]) {
    const campuses: Campus[] = [];
    datas.forEach((data: Campus) => {
      const campus: Campus = this.build(data);
      campuses.push(campus);
    });
    return campuses;
  }

  /** 校区编号 */
  public id: number = null;
  /** 校区名 */
  public name: string = null;
}
