/** 课程类型 */
export default class CourseType {
  public static build(data: CourseType): CourseType {
    const courseType = new CourseType();
    courseType.id = data.id;
    courseType.name = data.name;
    return courseType;
  }

  public static builds(datas: CourseType[]): CourseType[] {
    const courseTypes: CourseType[] = [];
    datas.forEach(
      (data: CourseType): void => {
        const courseType = CourseType.build(data);
        courseTypes.push(courseType);
      },
    );
    return courseTypes;
  }

  /** 编号 */
  public id: string = null;
  /** 课程类型名称 */
  public name: string = null;
}
