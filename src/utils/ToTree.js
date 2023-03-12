import views from "@/utils/assembly";

export function ToTree(node, Menu) {
  // 根目录存在子组件
  if (node.children && node.children.length > 0) {
    // parent.label = parent.meta.title
    for (let i = 0; i < node.children.length; i++) {
      let id = node.children[i];
      // 查找子级组件
      let child = Menu.find((item) => item.id === id);
      // 如果子级里面仍然存在子级 在次调用本身
      // console.log(child)
      if (child.children?.length > 0) {
        ToTree(child, Menu);
      }
      child.label = child.meta.title;
      node.children[i] = child;
    }
  }
}

export function tree(arr) {
  arr.forEach((item) => {
    if (item.componentName) {
      item.component = views[item.componentName];
    }
    if (item?.children?.length > 0) {
      tree(item.children);
    }
  });
}

export function treeToFlat(target, subsetKey) {
  const copyTree =
    Object.prototype.toString.call(target) === "[object Array]"
      ? Array.prototype.slice.call(target)
      : [target];
  const flat = [];
  while (copyTree.length) {
    const node = copyTree.shift();
    const { [subsetKey]: children, ...rest } = node;
    flat.push(rest);
    if (children) {
      Array.prototype.push.apply(copyTree, node.children);
    }
  }
  return flat;
}

/**
 * 将扁平结构数据转换成树形结构数据
 * @param {Array} target - 扁平结构数据
 *
 */
export function flatToTree(flatList, parentId = null) {
  const tree = [];
  flatList.forEach((item) => {
    if (item.parentId === parentId) {
      const children = flatToTree(flatList, item.id);
      if (children.length) {
        item.children = children;
      }
      tree.push(item);
    }
  });
  return tree;
}
