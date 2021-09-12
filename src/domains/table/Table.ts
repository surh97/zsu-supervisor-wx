import Row from '@/domains/table/Row';

/** 表格 */
export default class Table<T, G> {
  public headers: string[];
  public rows: Array<Row<T, G>>;
}
