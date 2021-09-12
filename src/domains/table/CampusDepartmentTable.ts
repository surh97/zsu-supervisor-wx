import { CampusDepartmentRow } from '@/domains/table';
import { Campus } from '@/domains/campus';
import CampusDepartmentCell from '@/domains/table/CampusDepartmentCell';

export default class CampusDepartmentTable {
  public static build(data: CampusDepartmentTable): CampusDepartmentTable {
    const pampusDepartmentTable: CampusDepartmentTable = new CampusDepartmentTable();
    pampusDepartmentTable.name = data.name;
    pampusDepartmentTable.rows = data.rows ? CampusDepartmentRow.builds(data.rows) : null;
    return pampusDepartmentTable;
  }

  public static builds(datas: CampusDepartmentTable[]): CampusDepartmentTable[] {
    const pampusDepartmentTables: CampusDepartmentTable[] = [];
    datas.forEach(
      (data: CampusDepartmentTable): void => {
        const pampusDepartmentTable: CampusDepartmentTable = CampusDepartmentTable.build(data);
        pampusDepartmentTables.push(pampusDepartmentTable);
      },
    );
    return pampusDepartmentTables;
  }

  public name: string = null;
  public rows: CampusDepartmentRow[];
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
