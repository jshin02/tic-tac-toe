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

//generate array of blank squares, random generate random number from length, place it in back where cell is blank
const cellStatus = () => {
  store.game.cell.value=playerTurn()
  if(store.game.over===false){
    let emptySpaces = [];
    for (let i=0; i<store.game.cells.length; i++){
      store.game.cells[i]==='' ? emptySpaces.push('') : emptySpaces;
    }
    let occurence = Math.floor(Math.random()*emptySpaces.length);
    //have to capture the position of the array's number for update api
    store.game.cell.index = store.game.cells.indexOf('', occurence)
    store.game.cells[store.game.cell.index] = store.game.cell.value
    store.game.turnNum += 1;
    return true
  }else {
    return false//update UI with gameplay insructions
  }
}

module.exports = {
  cellStatus
  // gameStatus
}
