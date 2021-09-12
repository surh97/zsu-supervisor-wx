import { User, Role, Resource } from '@/domains/user';
import { transData } from '@/utils/base';

/** 用户信息 */
export default class CurrentUser {
  public static build(data: CurrentUser): CurrentUser {
    const currentUser: CurrentUser = new CurrentUser();
    currentUser.user = data.user ? User.build(data.user) : null;
    currentUser.roles = data.roles ? Role.builds(data.roles) : null;
    currentUser.resources = data.resources ? Resource.builds(data.resources) : null;
    currentUser.menus = transData(data.resources, 'id', 'parentId', 'children');
    return currentUser;
  }

  /** 用户 */
  public user: User = null;
  /** 角色列表 */
  public roles: Role[];
  /** 资源列表 */
  public resources: Resource[];
  /** 菜单列表 */
  public menus: any = null;
}
