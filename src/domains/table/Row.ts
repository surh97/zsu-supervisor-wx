export default class Row<T, G> {
  public static build<C, D>(data: Row<C, D>): Row<C, D> {
    const row: Row<C, D> = new Row();
    row.key = data.key = undefined ? null : data.key;
    row.list = data.list = undefined ? null : data.list;
    return row;
  }

  public static builds<C, D>(datas: Array<Row<C, D>>): Array<Row<C, D>> {
    const rows: Array<Row<C, D>> = [];
    datas.forEach(
      (data: Row<C, D>): void => {
        const row: Row<C, D> = Row.build(data);
        rows.push(row);
      },
    );
    return rows;
  }

  public key: T = null;
  public list: G[];
}
