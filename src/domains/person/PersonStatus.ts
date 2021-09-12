/** 人员状态 */
export default class PersonStatus {
  public static build(data: PersonStatus) {
    const personStatus: PersonStatus = new PersonStatus();
    personStatus.id = data.id;
    personStatus.name = data.name;
    personStatus.status = data.status;
    return personStatus;
  }

  public static builds(datas: PersonStatus[]) {
    const personStatuses: PersonStatus[] = [];
    datas.forEach((data: PersonStatus) => {
      const personStatus: PersonStatus = this.build(data);
      personStatuses.push(personStatus);
    });
    return personStatuses;
  }

  /** 人员状态编号 */
  public id: number = null;
  /** 人员状态名 */
  public name: string = null;
  /** 人员状态名 */
  public status: string = null;
}
