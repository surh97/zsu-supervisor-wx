import { CampusCourseGroupRow } from '@/domains/table';
import { Campus } from '@/domains/campus';
import { CampusDepartmentCell } from '@/domains/table';

export default class CampusCourseGroupTable {
  public static build(data: CampusCourseGroupTable): CampusCourseGroupTable {
    const campusCourseGroupTable: CampusCourseGroupTable = new CampusCourseGroupTable();
    campusCourseGroupTable.name = data.name;
    campusCourseGroupTable.rows = data.rows ? CampusCourseGroupRow.builds(data.rows) : null;
    return campusCourseGroupTable;
  }

  public static builds(datas: CampusCourseGroupTable[]): CampusCourseGroupTable[] {
    const campusCourseGroupTables: CampusCourseGroupTable[] = [];
    datas.forEach(
      (data: CampusCourseGroupTable): void => {
        const campusCourseGroupTable: CampusCourseGroupTable = CampusCourseGroupTable.build(data);
        campusCourseGroupTables.push(campusCourseGroupTable);
      },
    );
    return campusCourseGroupTables;
  }

  public name: string = null;
  public rows: CampusCourseGroupRow[];
  public titlesNumber: string[];
  public titlesProportion: string[];

  get campuses() {
    const campuses: Campus[] = [];
    if (this.rows && this.rows.length > 0) {
      this.rows[0].cells.forEach((cell: CampusDepartmentCell) => {
        campuses.push(cell.campus);
      });
    }
    const campus: Campus = new Campus();
    campus.name = '合计';
    campuses.push(campus);
    return campuses;
  }
}
