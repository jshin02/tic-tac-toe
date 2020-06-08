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
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
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
  //array status
  actions.cellStatus(store.game.cell.index)
  //update ui with player move options
  //game gameStatus
  console.log(actions.gameStatus())

  //update api

  //update ui with game status and declare winner
}
module.exports = {
  onSignUp,
  onSignIn,
  onPassChange,
  onSignOut,
  onSquare
}
