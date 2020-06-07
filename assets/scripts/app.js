'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
const events = require('./events')


$(() => {
  $('#signup-form').on('submit', events.onSignUp)
  $('#signin-form').on('submit', events.onSignIn)
  $('#pwChange-form').on('submit', events.onPassChange)
  $('#signout-button').on('click',events.onSignOut)
})
