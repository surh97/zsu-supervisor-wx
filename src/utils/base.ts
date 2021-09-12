/**
 * 普通json数据转json树状结构
 * a: 需要转换的json数据；idStr：子节点id；pidStr：父节点id；chindrenStr：生成的子节点list的名称
 * 使用：let data = response.data;
 *       const menuList = transData(data, 'id', 'parent_id', 'children');
 */
export function transData(array: any[], id: string, parent: string, sub: string): any[] {
  const list: any[] = [];
  const hash: any = {};

  array.forEach((node: any, index: number) => {
    hash[array[index][id]] = node;
  });

  array.forEach((node: any, index: number) => {
    node.label = node.name;
    const obj = hash[node[parent]];
    if (obj) {
      if (!obj[sub]) {
        obj[sub] = [];
      }
      obj[sub].push(node);
    } else {
      list.push(node);
    }
  });

  return list;
}

/**
 * 去掉字符串的首位空格
 * 使用 var 变量=trimStr(需要去空格的字符串)
 */
export function trimStr(str: any) {
  if (str !== null) {
    str.replace(/(^\s*)|(\s*$)/g, '');
  }
  return str;
}
