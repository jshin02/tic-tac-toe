'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
const events = require('./events')


$(() => {
  $('.board').hide()
  //User Documentation
  $('#signup-form').on('submit', events.onSignUp)
  $('#signin-form').on('submit', events.onSignIn)
  $('#pwChange-form').on('submit', events.onPassChange)
  $('#signout-button').on('click',events.onSignOut)

  // Game events
  // $('#top-left').on('click', events.onSquare)
  // $('#top-middle').on('click', events.onSquare)
  // $('#top-right').on('click', events.onSquare)
  // $('#middle-left').on('click', events.onSquare)
  // $('#center').on('click', events.onSquare)
  // $('#middle-right').on('click', events.onSquare)
  // $('#bottom-left').on('click', events.onSquare)
  // $('#bottom-middle').on('click', events.onSquare)
  // $('#bottom-right').on('click', events.onSquare)
  $('.board').on('click', events.onSquare)

  // Setup events
  $('#game-button').on('click', events.onNewGame)
  $('#game-stats').on('click',events.onGetStats)
})
