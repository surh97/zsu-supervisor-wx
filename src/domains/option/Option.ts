/** 选项 */
export default class Option {
  public static getEmpty(): Option {
    const empty = new Option();
    empty.key = null;
    empty.value = null;
    empty.label = '置空';
    return empty;
  }

  public static toOptions(datas: any) {
    const options: Option[] = [];
    datas.forEach((data: any) => {
      const option: Option = new Option();
      option.key = data.id;
      option.value = data.id;
      option.label = data.name;
      options.push(option);
    });
    return options;
  }

  public static toOptionsByKeyAndValue(datas: any[], keyName: string, valueName: string) {
    const options: Option[] = [];
    datas.forEach((data: any) => {
      const key: string | number = Reflect.get(data, keyName);
      const value: string | number = Reflect.get(data, valueName);

      const has: boolean = options.some(
        (option: Option): boolean => {
          if (option.key === key) {
            return true;
          }
        },
      );

      if (!has) {
        const option: Option = new Option();
        option.key = key;
        option.value = key;
        option.label = value;
        options.push(option);
      }
    });
    return options;
  }

  public key: string | number | boolean;
  public value: string | number | boolean;
  public label: string | number;

  constructor() {
    this.key = null;
    this.value = null;
    this.label = null;
  }
}
