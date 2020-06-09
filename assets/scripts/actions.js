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
  // console.log(event)
  if(store.game.cells[index]==''&&store.game.over===false){
    store.game.cell.value= playerTurn()
    //this is where MODEL BOARD GETS VALUE
    store.game.cells[index]=store.game.cell.value
    console.log(store)
    store.game.turnNum += 1;
    return true
  }else {
    return false//update UI with gameplay insructions
  }
}

const gameStatus = () => {
  let gameCondition=0;
  let xRow=0;
  let oRow=0;
  // for (let i=0; i<store.game.winners.length; i++){
  let i=0;
  while(i<8){
    let checkCondition = store.game.winners[i]
    console.log(checkCondition)
    let charCondition=[]
    for (let j=0; j<checkCondition.length; j++){
      let boardValue = store.game.cells[checkCondition[j]]
      charCondition.push(boardValue)
    }
    //Push into REAL MODEL here
     xRow= charCondition.every(a => a==='x' ? true : false);
     oRow= charCondition.every(a => a==='o' ? true : false);
     gameCondition = (xRow===true || oRow===true) ? true : false;
    console.log(charCondition)
    console.log(gameCondition)
    if(gameCondition){
      store.game.over=true
      console.log(store.game)
      break
    }else{
      i++
    }
  }
  return gameCondition
}

module.exports = {
  cellStatus,
  gameStatus
}
