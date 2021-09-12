import { Toast } from 'vant';

/** 加载 */
export default class Load {
  public static toast: any;
  public static isLoading: boolean = false;

  // public static startFullLoad(message: string) {
  //   Load.isLoading = true;
  //   Load.toast = Toast.loading({ mask: true, message });
  // }

  // public static stopFullLoad() {
  //   Load.isLoading = false;
  //   Load.toast.clear();
  // }
}
