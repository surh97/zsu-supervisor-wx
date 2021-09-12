import { CourseGroup } from '@/domains/course';
import { CampusDepartmentCell } from '@/domains/table';

export default class CampusCourseGroupRow {
  public static build(data: CampusCourseGroupRow): CampusCourseGroupRow {
    const campusCourseGroupRow: CampusCourseGroupRow = new CampusCourseGroupRow();
    campusCourseGroupRow.courseGroup = data.courseGroup ? CourseGroup.build(data.courseGroup) : null;
    campusCourseGroupRow.cells = data.cells ? CampusDepartmentCell.builds(data.cells) : null;
    return campusCourseGroupRow;
  }

  public static builds(datas: CampusCourseGroupRow[]): CampusCourseGroupRow[] {
    const campusCourseGroupRows: CampusCourseGroupRow[] = [];
    datas.forEach(
      (data: CampusCourseGroupRow): void => {
        const campusCourseGroupRow: CampusCourseGroupRow = CampusCourseGroupRow.build(data);
        campusCourseGroupRows.push(campusCourseGroupRow);
      },
    );
    return campusCourseGroupRows;
  }

  public courseGroup: CourseGroup = null;
  public cells: CampusDepartmentCell[];

  public findCampusCell(campusId: number): CampusDepartmentCell {
    let index = 0;
    if (campusId !== null) {
      this.cells.some(
        (cell: CampusDepartmentCell, i: number): boolean => {
          if (cell.campus.id === campusId) {
            index = i;
            return true;
          }
        },
      );
      return this.cells[index];
    } else {
      const total: CampusDepartmentCell = new CampusDepartmentCell();
      total.data = [];
      this.cells.forEach((cell, i) => {
        if (i === 0) {
          cell.data.forEach(() => {
            total.data.push(0);
          });
        }
        cell.data.forEach((data, j) => {
          total.data[j] += data;
        });
      });
      return total;
    }
  }

  public findCampusCellProportion(campusId: number, index: number): string {
    index = (index + 1) * 2 - 2;
    const data: any[] = this.findCampusCell(campusId).data;
    const work: number = isNaN(data[index]) ? 0 : data[index];
    const already: number = isNaN(data[index + 1]) ? 0 : data[index + 1];
    return work + already === 0 ? '' : Math.floor((already * 100) / (work + already)) + '%';
  }
}
