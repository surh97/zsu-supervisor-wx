/** 听课类型 */
export default class ListenType {
  /** 编号 */
  public id: number = null;
  /** 听课类型名称 */
  public name: string = null;
  /** 最小听课次数 */
  public minListenNum: number = null;
  /** 最小听课次数标题 */
  public minListenNumTitle: string = null;
  /** 最大听课次数 */
  public maxListenNum: number = null;
  /** 最大听课次数标题 */
  public maxListenNumTitle: string = null;
  /** 最大计划 */
  public maxPlanNum: number = null;
  /** 最大计划标题 */
  public maxPlanNumTitle: string = null;
  /** 有效期（天） */
  public termOfValidity: number = null;
  /** 有效期标题 */
  public termOfValidityTitle: string = null;
}
