// This page is to handle all event calls made in app.js
'use strict'
const getFormFields = require('./../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store=require('./store')
const status=require('./status')
const ai = require('./ai')
// User Events
const onSignUp = event => {
  event.preventDefault();

  let data = getFormFields(event.target)

  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}
const onSignIn = event => {
  event.preventDefault()
  let data = getFormFields(event.target)

  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}
const onPassChange = event => {
  event.preventDefault();
  let data = getFormFields(event.target)

  api.pwChange(data)
    .then(ui.pwChangeSuccess)
    .catch(ui.pwChangeFailure)
}
const onSignOut = event => {
  event.preventDefault()

  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

//Gameboard events
//in onSquare, we're going to check against who we're playing against.
//if turn number is even && store.opponent is store.computer, have computer generate value.
const onSquare = event => {
    store.game.cell.index=event.target.dataset.index
    //Update MODEL array and instructions (is model array element empty?)
    if(status.cellStatus(store.game.cell.index)){
      //check if valid cell ends game
      status.gameStatus()
      ui.validClick(event)
      //update api and mark Player's move on VIEW array
      api.updateCell()
        .then(ui.declareWinner)
        .catch(ui.validClickFail)
      if(store.opponent=='ai'&&store.game.over===false){
        setTimeout(aiSquare, 1500);
      }
    }else{
    ui.invalidClick()
    }
  }
const aiSquare = event => {
  if(ai.cellStatus()){
    status.gameStatus()
    ui.aiSuccess()
    api.updateCell()
      .then(ui.declareWinner)
      .catch(ui.aiFailure)
  }
}
const boxIn = event => {
  if(store.game.cells[event.target.dataset.index]===''&&store.game.over===false){
    $(event.target).addClass('hover')
  }else{
    $(event.target).addClass('cancelled')
  }
}

const boxOut = event => {
  $(event.target).removeClass('hover')
  $(event.target).removeClass('cancelled')
}

//Set Up Events
const setOpponent = event => {
  event.preventDefault()
  if(event.target.id==='vs-player'){
    store.opponent = 'player'
  }else if(event.target.id==='vs-ai'){
    store.opponent = 'ai'
  }
    $('#vs-player').hide();
    $('#vs-ai').hide();
    $('#game-button').show();
    $('#scoreboard').text('');
}

const onNewGame = event => {
  api.createGame()
    .then(ui.createSuccess)
    .catch(ui.createFailure)

  store.game.cells = ["","","","","","","","",""]
  store.game.turnNum = 1
  store.game.over = false
  clearInterval(store.interval)
  $('.board').html('').fadeIn(1000).removeClass('blink')
}

const onGetStats = event => {
  $('.board').fadeOut();
  $('#game-button').hide();
  $('#vs-player').show();
  $('#vs-ai').show();
  api.getStats()
    .then(ui.statsSuccess)
    .catch(ui.statsFail)
}

//model boards of unfinished games -> feature++
// const onGameTBD = event => {
//   console.log(event);
//   $('.modelboard').show()
//   api.gamesTBD()
//     .then(ui.gamesNotOver)
//     .catch(ui.falseGamesFail)
// }

module.exports = {
  onSignUp,
  onSignIn,
  onPassChange,
  onSignOut,
  onSquare,
  boxIn,
  boxOut,
  setOpponent,
  onNewGame,
  onGetStats
}
