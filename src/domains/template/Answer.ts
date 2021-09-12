/** 答案 */
export default class Answer {
  public static build(data: Answer): Answer {
    const answer: Answer = new Answer();
    answer.id = data.id;
    answer.answer = data.answer;
    answer.other = data.other;
    return answer;
  }

  public static builds(datas: Answer[]): Answer[] {
    const answers: Answer[] = [];
    datas.forEach(
      (data: Answer): void => {
        const answer: Answer = Answer.build(data);
        answers.push(answer);
      },
    );
    return answers;
  }

  /** 答案编号 */
  public id: number = null;
  /** 答案 */
  public answer: string = null;
  /** 其他 */
  public other: string = null;
}
