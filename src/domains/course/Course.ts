/** 课程 */
export default class Course {
  public static build(data: Course): Course {
    const course = new Course();
    course.id = data.id;
    course.name = data.name;
    return course;
  }

  public static builds(datas: Course[]): Course[] {
    const courses: Course[] = [];
    datas.forEach(
      (data: Course): void => {
        const course = Course.build(data);
        courses.push(course);
      },
    );
    return courses;
  }

  /** 编号 */
  public id: string = null;
  /** 课程名 */
  public name: string = null;
}
