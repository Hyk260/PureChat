export default function arrayToTree(node,Menu){
  // 根目录存在子组件
  if(node.children && node.children.length > 0){
    // parent.label = parent.meta.title
    for(let i = 0;i<node.children.length;i++){
      let id = node.children[i];
      // 查找子级组件
      let child = Menu.find(item => item.id === id);
      // 如果子级里面仍然存在子级 在次调用本身
      // console.log(child)
      if(child.children && child.children.length > 0){
        arrayToTree(child,Menu);
      }
      child.label = child.meta.title
      node.children[i] = child;
    }
  }
}


