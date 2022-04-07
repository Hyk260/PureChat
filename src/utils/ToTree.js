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

// children: (2) ['57c79357-0309-41b9-919a-253c3dfe6690', 'd8bb34c7-d00b-436b-b18f-33f73c37148c']
// id: "d17d701b-6257-40bd-a6c3-a4672d4823d4"
// meta:
// auth: []
// icon: "el-"
// title: "侧边栏菜单"
// [[Prototype]]: Object
// path: "/"
// url: ""

