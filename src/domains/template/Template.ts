import { Question } from '@/domains/template';

/** 模板 */
export default class Template {
  public static build(data: Template): Template {
    const template: Template = new Template();
    template.id = data.id;
    template.name = data.name;
    template.deleted = data.deleted;
    template.createTime = data.createTime;
    template.questions = data.questions ? Question.builds(data.questions) : null;
    return template;
  }

  public static builds(datas: Template[]): Template[] {
    const templates: Template[] = [];
    datas.forEach(
      (data: Template): void => {
        const template: Template = Template.build(data);
        templates.push(template);
      },
    );
    return templates;
  }

  /** 编号 */
  public id: number = null;
  /** 模板名 */
  public name: string = null;
  /** 删除 */
  public deleted: boolean = null;
  /** 创建时间 */
  public createTime: Date = null;
  /** 问题列表 */
  public questions: Question[];
}
