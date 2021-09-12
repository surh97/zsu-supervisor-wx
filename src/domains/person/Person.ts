import { Profession, PersonStatus } from '@/domains/person';
import { Campus } from '@/domains/campus';
import { Department } from '@/domains/department';
import { Priority } from '@/domains/priority';

/** 人员 */
export default class Person {
  public static build(data: Person) {
    const person: Person = new Person();
    person.id = data.id = undefined ? null : data.id;
    person.name = data.name = undefined ? null : data.name;
    person.deleted = data.deleted = undefined ? null : data.deleted;
    person.profession = data.profession ? Profession.build(data.profession) : null;
    person.priority = data.priority ? Priority.build(data.priority) : null;
    person.status = data.status ? PersonStatus.build(data.status) : null;
    person.campus = data.campus ? Campus.build(data.campus) : null;
    person.department = data.department ? Department.build(data.department) : null;
    return person;
  }

  public static builds(datas: Person[]) {
    const people: Person[] = [];
    datas.forEach((data: Person) => {
      const person: Person = this.build(data);
      people.push(person);
    });
    return people;
  }

  /** 编号 */
  public id: string = null;
  /** 编号列表 */
  public idList: string[];
  /** 姓名 */
  public name: string = null;
  /** 删除标记 */
  public deleted: string = null;
  /** 职称 */
  public profession: Profession = null;
  /** 优先 */
  public priority: Priority = null;
  /** 人员状态 */
  public status: PersonStatus = null;
  /** 校区 */
  public campus: Campus = null;
  /** 单位 */
  public department: Department = null;
}
