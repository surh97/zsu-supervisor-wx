/** 登录用户 */
export default class User {
  public static build(data: any): User {
    const user: User = new User();
    user.id = data.id;
    user.username = data.username;
    user.password = data.password;
    user.locked = data.locked;
    user.roleIds = data.roleIds || data.role_ids;
    user.roleNames = data.role_names;
    return user;
  }

  public static builds(datas: User[]): User[] {
    const users: User[] = [];
    datas.forEach((data: User) => {
      const user: User = this.build(data);
      users.push(user);
    });
    return users;
  }

  /** 编号 */
  public id: number = null;
  /** 用户名 */
  public username: string = null;
  /** 密码 */
  public password: string = null;
  /** 锁定 */
  public locked: boolean = null;
  /** 角色列表 */
  public roleIds: string = null;
  /** 角色名称 */
  public roleNames: string = null;

  /** 获取锁定状态类型 */
  get lockedType() {
    return !this.locked ? 'success' : 'danger';
  }

  /** 获取锁定状态值 */
  get lockedValue() {
    return !this.locked ? '正常' : '禁用';
  }
}
