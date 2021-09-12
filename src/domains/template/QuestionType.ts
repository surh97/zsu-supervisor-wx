/** 问题类型 */
export default class QuestionType {
  public static build(data: QuestionType): QuestionType {
    const questionType: QuestionType = new QuestionType();
    questionType.id = data.id;
    questionType.name = data.name;
    questionType.single = data.single;
    return questionType;
  }

  public static builds(datas: QuestionType[]): QuestionType[] {
    const questionTypes: QuestionType[] = [];
    datas.forEach(
      (data: QuestionType): void => {
        const questionType: QuestionType = QuestionType.build(data);
        questionTypes.push(questionType);
      },
    );
    return questionTypes;
  }

  /** 编号 */
  public id: number = null;
  /** 问题类型 */
  public name: string = null;
  /** 单选 */
  public single: boolean = null;
}
