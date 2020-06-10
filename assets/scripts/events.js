// This page is to handle all event calls made in app.js
'use strict'
const getFormFields = require('./../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store=require('./store')
const actions=require('./actions')
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
const onSquare = event => {
  event.preventDefault()
  console.log(event.target)
  store.game.cell.index=event.target.dataset.index
  //Update MODEL array and instructions (is model array element empty?)
  if(actions.cellStatus(store.game.cell.index)){
    //check if valid cell ends game
    actions.gameStatus()
    //update api and mark Player's move on VIEW array
    api.updateCell()
      .then(ui.validClick(event))
      .catch(ui.invalidClick)
      ui.declareWinner()
    }
}

//Set Up Events
const onNewGame = event => {
  api.createGame()
    .then(ui.createSuccess)
    .catch(ui.createFailure)

  api.updateCell

  store.game.cells = ["","","","","","","","",""]
  store.game.turnNum = 1
  store.game.over = false
  $('.board').html('').removeClass('gamepiece')
  console.log(store.game)
}

const onGetStats = event => {
  $('.board').hide()
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
  onGetStats
}
