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
  console.log(data)

  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

const onSignIn = event => {
  event.preventDefault()
  let data = getFormFields(event.target)
  console.log(data)

  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const onPassChange = event => {
  event.preventDefault();
  let data = getFormFields(event.target)
  console.log(data)

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
//in on square, we're going to check against who we're playing against.
//if turn number is even && store.opponent is store.computer, have computer generate value.
const onSquare = event => {
  console.log(event.target)
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
        //don't let user click
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
  $('.board').html('').fadeIn(1000).removeClass('gamepiece')
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

module.exports = {
  onSignUp,
  onSignIn,
  onPassChange,
  onSignOut,
  onSquare,
  onNewGame,
  onGetStats,
  setOpponent
}
