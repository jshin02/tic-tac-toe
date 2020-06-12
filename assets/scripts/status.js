//This page contains all front end ui results following event handlers
'use strict'
const store = require('./store')

const playerTurn = () => {
  if(store.game.turnNum % 2===1){
    return 'x'
  }else{
    return 'o'
  }
}

const cellStatus = (index) => {
  if(store.opponent==='ai'&&store.game.turnNum%2===0&&store.game.over===false){
    console.log('test')
    return false
  }else if(store.game.cells[index]==''&&store.game.over===false){
      store.game.cell.value= playerTurn()
      //this is where MODEL BOARD GETS VALUE
      store.game.cells[index]=store.game.cell.value
      console.log(store.game.cells)
      store.game.turnNum += 1;
      return true

  }else {
    return false//update UI with gameplay insructions
  }
}

const gameStatus = () => {
  let xRow=0;
  let oRow=0;
  // for (let i=0; i<store.game.winners.length; i++){
  let i=0;
  while(i<8){
    //check through each winning condition container
    let checkCondition = store.game.winners[i]
    //is each container (charCondition) filled with x's or o's?
    let charCondition=[]
    for (let j=0; j<checkCondition.length; j++){
      let boardValue = store.game.cells[checkCondition[j]]
      charCondition.push(boardValue)
    }
     xRow= charCondition.every(a => a==='x' ? true : false);
     oRow= charCondition.every(a => a==='o' ? true : false);
     console.log(xRow,oRow)
     store.game.over = (xRow===true || oRow===true) ? true : false;
     store.game.winner = (xRow===true || oRow===true) ? true : false;
    if(store.game.over){
      break
    }else{
      i++
    }
  }
}

module.exports = {
  cellStatus,
  gameStatus
}
