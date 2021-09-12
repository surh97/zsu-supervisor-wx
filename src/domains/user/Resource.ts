/** 资源 */
export default class Resource {
  public static build(data: Resource): Resource {
    const resource: Resource = new Resource();
    resource.id = data.id;
    resource.name = data.name;
    resource.type = data.type;
    resource.url = data.url;
    resource.available = data.available;
    resource.icon = data.icon;
    resource.parentId = data.parentId;
    resource.parentIds = data.parentIds;
    resource.permission = data.permission;
    resource.rootNode = data.rootNode;
    resource.sortedIndex = data.sortedIndex;
    resource.systemType = data.systemType;
    return resource;
  }

  public static builds(datas: Resource[]): Resource[] {
    const resources: Resource[] = [];
    datas.forEach((data: Resource) => {
      const resource: Resource = this.build(data);
      resources.push(resource);
    });
    return resources;
  }

  /** 资源编号 */
  public id: number = null;
  /** 资源名 */
  public name: string = null;
  /** 资源类型 */
  public type: string = null;
  /** 资源URL */
  public url: string = null;
  /** 启用 */
  public available: boolean = null;
  /** 图标 */
  public icon: string = null;
  /** 父ID */
  public parentId: number = null;
  /** 父ID列表 */
  public parentIds: number[];
  /** 权限 */
  public permission: string = null;
  /** 根节点 */
  public rootNode: boolean = null;
  /** 排序 */
  public sortedIndex: number = null;
  /** 系统类型 */
  public systemType: number = null;

  /** 获取资源类型标签类型 */
  get typeTagType() {
    switch (this.type) {
      case 'menu':
        return 'primary';
      default:
        return 'warning';
    }
  }

  /** 获取状态标签类型 */
  get availableTagType() {
    return this.available ? 'success' : 'danger';
  }

  /** 获取状态标签值 */
  get availableValue() {
    return this.available ? '正常' : '禁用';
  }
}
