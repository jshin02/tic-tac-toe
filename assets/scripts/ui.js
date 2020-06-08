//This page contains all front end ui results following event handlers
'use strict'
const store = require('./store')

const signUpSuccess = (data) => {
  $("#signup-result").text("it worked")
}
const signUpFailure = () => {
  $("#signup-result").text("you failed")
}
const signInSuccess = data => {
  $("#signin-result").text("you're signed in")
  store.user = data.user
  console.log(store)
}
const signInFailure = () => {
  $("#signin-result").text("you failed to sign in")
}
const pwChangeSuccess = data => {
  $("#pwChange-result").text("you have successfully changed password")
}
const pwChangeFailure = () => {
  $("#pwChange-result").text("denied")
}
const signOutSuccess = data => {
  $("#signout-result").text("Goodbye, "+store.user.email)
  store.user=null
}
const signOutFailure = data => {
  $("#signout-result").text("Sign out failed")
}

//Gameboard UI Events
const updateCell = event => {
  $(event.target).text(store.game.cell.value)
}
// const onPlaySuccess


//Game setup
const createSuccess = data => {
  console.log(data)
  $('#setup-result').text('Created new game from api')
  store.game.id=data.game._id
  $('.board').show()
}
const createFailure = () => {
  $('#setup-result').text('Failed to create new game')
}
module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  pwChangeSuccess,
  pwChangeFailure,
  signOutSuccess,
  signOutFailure,
  createSuccess,
  createFailure,
  updateCell
}
