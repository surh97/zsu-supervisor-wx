/** 角色 */
export default class Role {
  public static build(data: Role): Role {
    const role: Role = new Role();
    role.id = data.id;
    role.role = data.role;
    role.name = data.name;
    role.type = data.type;
    role.systemType = data.systemType;
    role.available = data.available;
    role.description = data.description;
    role.resourceIds = data.resourceIds;
    return role;
  }

  public static builds(datas: Role[]): Role[] {
    const roles: Role[] = [];
    datas.forEach((data: Role) => {
      const role: Role = this.build(data);
      roles.push(role);
    });
    return roles;
  }

  /** 角色编号 */
  public id: number = null;
  /** 角色名 */
  public role: string = null;
  /** 角色名 */
  public name: string = null;
  /** 类型 */
  public type: number = null;
  /** 系统类型 */
  public systemType: number = null;
  /** 启用 */
  public available: boolean = null;
  /** 注释 */
  public description: string = null;
  /** 资源编号字符串 */
  public resourceIds: string = null;

  /** 获取资源类型标签类型 */
  get availableTagType() {
    return this.available ? 'success' : 'danger';
  }

  /** 获取状态标签类型 */
  get availableValue() {
    return this.available ? '正常' : '禁用';
  }

  /** 获取状态标签值 */
  get resourceIdsValue() {
    return this.resourceIds.split(',').map((e) => +e);
  }
}
