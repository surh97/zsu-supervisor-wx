import { QuestionType, Option, QuestionBase, Answer } from '@/domains/template';

/** 问题 */
export default class Question {
  public static build(data: Question): Question {
    const question: Question = new Question();
    question.id = data.id;
    question.order = data.order;
    question.required = data.required;
    question.weigh = data.weigh;
    question.parentId = data.parentId;
    question.remarks = data.remarks;
    question.deleted = data.deleted;
    question.base = data.base ? QuestionBase.build(data.base) : null;
    question.type = data.type ? QuestionType.build(data.type) : null;
    question.questions = data.questions ? Question.builds(data.questions) : null;
    question.options = data.options ? Option.builds(data.options) : null;
    question.answer = data.answer ? Answer.build(data.answer) : new Answer();
    return question;
  }

  public static builds(datas: Question[]): Question[] {
    const questions: Question[] = [];
    datas.forEach(
      (data: Question): void => {
        const question: Question = Question.build(data);
        questions.push(question);
      },
    );
    return questions;
  }

  /** 编号 */
  public id: number = null;
  /** 顺序 */
  public order: number = null;
  /** 必填 */
  public required: boolean = null;
  /** 权重 */
  public weigh: number = null;
  /** 父编号 */
  public parentId: number = null;
  /** 备注 */
  public remarks: string = null;
  /** 删除 */
  public deleted: boolean = null;
  /** 空值 */
  public empty: boolean = null;
  /** 基础问题 */
  public base: QuestionBase = null;
  /** 问题类型 */
  public type: QuestionType = null;
  /** 问题列表 */
  public questions: Question[];
  /** 选项列表 */
  public options: Option[];
  /** 答案 */
  public answer: Answer = null;
}
