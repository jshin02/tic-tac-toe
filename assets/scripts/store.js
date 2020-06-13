
'use strict'
const store = {
  game:{
    cells: ["","","","","","","","",""],
    winners: [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],
    over: false,
    turnNum: 1,
    cell:{
      index: 0,
      value: ''
    },
    winner: false,
    oneScore: 0,
    twoScore: 0,
    yourScore: 0,
    aiScore: 0,
    wIndex: null,
  },
  opponent: 'player',
  interval: '',
  // tbd:{
  //   game0:{
  //     cells: '',
  //     id: 0,
  //     turnNum: 0,
  //   },
  //   game1:{
  //     cells: '',
  //     id: 0,
  //     turnNum: 0,
  //   },
  //   game2: {
  //     cells: '',
  //     id: 0,
  //     turnNum: 0,
  //   }
  // }
}

module.exports = store
