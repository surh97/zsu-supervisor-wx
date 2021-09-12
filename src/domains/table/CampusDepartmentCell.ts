import { Campus } from '@/domains/campus';

export default class CampusDepartmentCell {
  public static build(data: CampusDepartmentCell): CampusDepartmentCell {
    const campusDepartmentCell: CampusDepartmentCell = new CampusDepartmentCell();
    campusDepartmentCell.campus = data.campus ? Campus.build(data.campus) : null;
    campusDepartmentCell.data = data.data;
    return campusDepartmentCell;
  }

  public static builds(datas: CampusDepartmentCell[]): CampusDepartmentCell[] {
    const campusDepartmentCells: CampusDepartmentCell[] = [];
    datas.forEach(
      (data: CampusDepartmentCell): void => {
        const campusDepartmentCell: CampusDepartmentCell = CampusDepartmentCell.build(data);
        campusDepartmentCells.push(campusDepartmentCell);
      },
    );
    return campusDepartmentCells;
  }

  public campus: Campus = null;
  public data: any[];

  public findStyle(index: number) {
    index = index % 2 === 0 ? index : index - 1;
    return this.data[index] > 0 ? 'color: #FF4949' : '';
  }
}
