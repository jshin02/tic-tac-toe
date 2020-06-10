
'use strict'
const store = {
  game:{
    cells: ["","","","","","","","",""],
    winners: [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],
    over: false,
    cell:{
      index: 0,
      value: ''
    },
    turnNum: 1,
    oneScore: 0,
    twoScore: 0
  }
}

module.exports = store
