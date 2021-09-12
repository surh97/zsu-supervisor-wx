/** 基础问题 */
export default class QuestionBase {
  public static build(data: QuestionBase): QuestionBase {
    const questionBase: QuestionBase = new QuestionBase();
    questionBase.id = data.id;
    questionBase.name = data.name;
    questionBase.deleted = data.deleted;
    questionBase.remarks = data.remarks;
    return questionBase;
  }

  public static builds(datas: QuestionBase[]): QuestionBase[] {
    const questionBases: QuestionBase[] = [];
    datas.forEach(
      (data: QuestionBase): void => {
        const questionBase: QuestionBase = QuestionBase.build(data);
        questionBases.push(questionBase);
      },
    );
    return questionBases;
  }

  /** 编号 */
  public id: number = null;
  /** 问题名 */
  public name: string = null;
  /** 删除 */
  public deleted: boolean = null;
  /** 备注 */
  public remarks: string = null;
}
