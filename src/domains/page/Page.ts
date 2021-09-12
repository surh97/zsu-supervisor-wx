/** 分页 */
export default class Page {
  /** 总记录数 */
  public total: number = 0;
  /** 页码 */
  public pageNum: number = 1;
  /** 尺寸 */
  public pageSize: number = 10;
  /** 尺寸列表 */
  public pageSizes: number[] = [10, 50, 200, 500];

  /** 设置分页 */
  public setPage(remote: Page) {
    this.total = remote.total;
    this.pageNum = remote.pageNum;
    this.pageSize = remote.pageSize;
  }
}
