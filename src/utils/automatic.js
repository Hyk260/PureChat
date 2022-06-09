import _ from 'lodash'


// const puzzles = [1, 2, 3, 4, 5, 6, 7, 8, 0]

// const Original = _.chunk(puzzles, 3)
// // => [[1, 3, 2],[5, 8, 0],[7, 6, 4]],
// const result = [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 0],
// ]
export default class {
  constructor(data) {
    const { original, result, delayTime } = data
    this.puzzles = [1, 2, 3, 4, 5, 6, 7, 8, 0]
    this.queueArr = [] //队列
    this.hashObj = {} //hash
    this.NodeObj = {} //记录节点
    this.isFind = false
    this.delay = 600 //动画延迟
    this.originalNode = original //原始节点
    this.originalNodeStr = original.toString().split(',').join('')
    this.resultNode = result //结果节点
    this.resultNodeStr = result.toString().split(',').join('')

    console.log(this, "fn实例")
    console.log(original, result, delayTime)
  }
  /**
   * 是否可以进行自动拼图 
   * */
  canReach(original, result) {
    original = original.toString().split(',')
    result = result.toString().split(',')
    this.readerDom(original)
    const off = this.odevity(original) === this.odevity(result)
    console.log(off)
    return off
  }
  /**
  * 渲染dom
  * */
  readerDom(node) {
    // ['3', '2', '5', '0', '4', '1', '8', '6', '7']
    this.puzzles = node
    this.pass()
  }
  /**
   * 求逆序奇偶性
   * */
  odevity(node) {
    let num = 0
    node.splice(node.indexOf('0'), 1)
    node.forEach((item, index) => {
      for (let i = 0; i < index; i++) {
        if (node[i] != 0 && node[i] > item) num++
      }
    })
    return num % 2 ? 1 : 0
  }
  /**
   * 寻找路径
   * */
  searchPath() {
    this.queueArr.push(this.originalNode)
    this.hashObj[this.originalNodeStr] = this.originalNode
    while (!isFind) {
      if (!this.queueArr.length) return
      let currentNode = this.queueArr.shift()
      let currentNodeStr = currentNode.toString().split(',').join('')

      if (this.resultNodeStr === currentNodeStr) {
        let path = []
        let pathLength = 0
        let resultPath = []
        for (let v = this.resultNodeStr; v != this.originalNodeStr; v = this.NodeObj[v]) {
          path.push(this.hashObj[v])
        }
        path.push(this.hashObj[this.originalNodeStr])
        pathLength = path.length
        for (let i = 0; i < pathLength; i++) {
          resultPath.push(path.pop())
        }
        setTimeout(() => {
          this.returnStep(resultPath)
        }, 500)
        this.isFind = true
        return
      }
      // return;
      // let result = this.getChildNodes(currentNode)
      result.forEach((item) => {
        let itemStr = item.toString().split(',').join('')
        if (!this.hashObj[itemStr]) {
          this.queueArr.push(item)
          this.hashObj[itemStr] = item
          this.NodeObj[itemStr] = currentNodeStr
        }
      })
    }
  }
  // 返回步骤信息
  returnStep(path) {
    path.forEach((item, index) => {
      setTimeout((node) => {
        this.readerDom(node)
      }, index * this.delay)
    })
  }
  // 获取子节点
  getChildNodes(currentNode) {
    // if (!Array.isArray(currentNode)) return
    // let target = {},
    //   childNodesArr = [],
    //   direction = [],
    //   rowNum = currentNode.length,
    //   colNum = currentNode[0].length
    // currentNode.forEach((item, i)=> {
    //   item.forEach( (obj, k)=> {
    //     if (obj === 0 || obj === '0') {
    //       target = { x: k, y: i }
    //     }
    //   })
    // })
    // direction = this.getDirection(target, rowNum, colNum)
    // return this.changePos(currentNode, target, direction)
  }
  pass() {
    if (this.puzzles[8] === 0) {
      const newPuzzles = this.puzzles.slice(0, 8)
      const isPass = newPuzzles.every((e, i) => e === i + 1)
      if (isPass) {

      }
    }
  }

}



const autoPuzzles = (Setting) => {
  let that = this
  let queueArr = [] //队列
  let hashObj = {} //hash
  let NodeObj = {} //记录节点
  let originalNode = Setting.originalNode //原始节点
  let originalNodeStr = originalNode.toString().split(',').join('')
  let resultNode = Setting.resultNode //结果节点
  let resultNodeStr = resultNode.toString().split(',').join('')
  let isFind = false
  let delay = Setting.delayTime || 1000 //动画延迟

  return {
    // 是否可以进行自动拼图
    canReach(originalNode, resultNode) {
      originalNode = originalNode.toString().split(',')
      resultNode = resultNode.toString().split(',')
      this.readerDom(originalNode)
      if (this.odevity(originalNode) === this.odevity(resultNode)) {
        return true
      } else {
        return false
      }
    },
    // 求逆序奇偶性
    odevity(node) {
      var num = 0
      node.splice(node.indexOf('0'), 1)
      node.forEach(function (item, index) {
        for (var i = 0; i < index; i++) {
          if (node[i] != 0) {
            if (node[i] > item) {
              num++
            }
          }
        }
      })
      if (num % 2) {
        return 1
      } else {
        return 0
      }
    },
    // 寻找路径
    searchPath() {
      var _this = this
      queueArr.push(originalNode)
      hashObj[originalNodeStr] = originalNode
      while (!isFind) {
        if (!queueArr.length) {
          alert('没搜索到结果')
          return
        }
        let currentNode = queueArr.shift(),
          currentNodeStr = currentNode.toString().split(',').join('')
        if (resultNodeStr === currentNodeStr) {
          let path = []
          let pathLength = 0
          let resultPath = []
          for (let v = resultNodeStr; v != originalNodeStr; v = NodeObj[v]) {
            path.push(hashObj[v])
          }
          path.push(hashObj[originalNodeStr])
          pathLength = path.length
          for (let i = 0; i < pathLength; i++) {
            resultPath.push(path.pop())
          }
          setTimeout(function () {
            _this.returnStep(resultPath)
          }, 500)
          isFind = true
          return
        }
        // return;
        let result = this.getChildNodes(currentNode)
        result.forEach(function (item, i) {
          let itemStr = item.toString().split(',').join('')
          if (!hashObj[itemStr]) {
            queueArr.push(item)
            hashObj[itemStr] = item
            NodeObj[itemStr] = currentNodeStr
          }
        })
      }
    },
    // 返回步骤信息
    returnStep(path) {
      var _this = this
      path.forEach(function (item, index) {
        setTimeout(
          function (node) {
            _this.readerDom(node)
          }.bind(_this, item),
          index * delay
        )
      })
    },
    // 渲染dom
    readerDom(node) {
      let nodeArr = node.toString().split(',')
      puzzles.value = nodeArr
      pass()
    },
    // 获取子节点
    getChildNodes(currentNode) {
      if (!Array.isArray(currentNode)) return
      let target = {},
        childNodesArr = [],
        direction = [],
        rowNum = currentNode.length,
        colNum = currentNode[0].length
      currentNode.forEach(function (item, i) {
        item.forEach(function (obj, k) {
          if (obj === 0 || obj === '0') {
            target = { x: k, y: i }
          }
        })
      })
      direction = this.getDirection(target, rowNum, colNum)
      return this.changePos(currentNode, target, direction)
    },
    // 获取方向
    getDirection(target, rowNum, colNum) {
      let direction = []
      if (!target.x) {
        direction.push('right')
      } else if (target.x === colNum - 1) {
        direction.push('left')
      } else {
        direction = direction.concat(['left', 'right'])
      }

      if (!target.y) {
        direction.push('down')
      } else if (target.y === rowNum - 1) {
        direction.push('up')
      } else {
        direction = direction.concat(['down', 'up'])
      }
      return direction
    },
    // 改变位置
    changePos(node, target, direction) {
      if (direction.length) {
        let childNodesArr = []
        direction.forEach(function (item, index) {
          let temp
          let _node = JSON.parse(JSON.stringify(node))
          switch (item) {
            case 'left':
              temp = _node[target.y][target.x]
              _node[target.y][target.x] = _node[target.y][target.x - 1]
              _node[target.y][target.x - 1] = temp
              break
            case 'right':
              temp = _node[target.y][target.x]
              _node[target.y][target.x] = _node[target.y][target.x + 1]
              _node[target.y][target.x + 1] = temp
              break
            case 'down':
              temp = _node[target.y][target.x]
              _node[target.y][target.x] = _node[target.y + 1][target.x]
              _node[target.y + 1][target.x] = temp
              break
            case 'up':
              temp = _node[target.y][target.x]
              _node[target.y][target.x] = _node[target.y - 1][target.x]
              _node[target.y - 1][target.x] = temp
              break
          }
          childNodesArr.push(_node)
        })
        return childNodesArr
      }
    },
  }
}