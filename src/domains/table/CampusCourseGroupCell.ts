import { Campus } from '@/domains/campus';

export default class CampusCourseGroupCell {
  public static build(data: CampusCourseGroupCell): CampusCourseGroupCell {
    const campusCourseGroupCell: CampusCourseGroupCell = new CampusCourseGroupCell();
    campusCourseGroupCell.campus = data.campus ? Campus.build(data.campus) : null;
    campusCourseGroupCell.data = data.data;
    return campusCourseGroupCell;
  }

  public static builds(datas: CampusCourseGroupCell[]): CampusCourseGroupCell[] {
    const campusCourseGroupCells: CampusCourseGroupCell[] = [];
    datas.forEach(
      (data: CampusCourseGroupCell): void => {
        const campusCourseGroupCell: CampusCourseGroupCell = CampusCourseGroupCell.build(data);
        campusCourseGroupCells.push(campusCourseGroupCell);
      },
    );
    return campusCourseGroupCells;
  }

  public campus: Campus = null;
  public data: any[];

  public findStyle(index: number) {
    index = index % 2 === 0 ? index : index - 1;
    return this.data[index] > 0 ? 'color: #FF4949' : '';
  }
}
