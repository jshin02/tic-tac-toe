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
  $('.user-options').show()
  // $('.board').show()
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
  $("#pwChange-result").text("you failed to change password")
}
const signOutSuccess = data => {
  $("#pwChange-result").text("Goodbye, "+store.user.email)
  store.user=null
}
const signOutFailure = data => {
  $("#pwChange-result").text("Sign out failed")
}

//Gameboard UI Events
const validClick = event => {
  $(event.target).addClass('gamepiece').html(store.game.cell.value)
  if((store.game.turnNum)%2===1){
    $('#message-box').text(`Player 1's turn`)
  }else{
    $('#message-box').text(`Player 2's turn`)
  }
}
const invalidClick = () => {
    $('#message-box').text(`That square has already been selected, click on an empty square to make a valid selection.`)
}

//Game setup
const createSuccess = data => {
  console.log(data)
  $('#message-box').text('Created new game')
  store.game.id=data.game._id
  $('.board').show()
}
const createFailure = () => {
  $('#message-box').text('Failed to create new game')
}

const statsSuccess = data => {
  let games = [];
  let playerOne = 0;
  let playerTwo = 0;
  data.games.forEach(a => {
    let num = 0;
    for(let i=0; i<9; i++){
      if(a.cells[i]!==''){
        num++;
      }
    }
    games.push(num)
  })
  games.forEach(a => (a%2===1)? playerOne++ : playerTwo++)
  $('#message-box').text(`Player 1 won ${playerOne} times, and Player 2 won ${playerTwo} times.`)
}

const statsFailure = data => {
  console.log('Failed to retrieve stats')
}

//outcomme
const declareWinner = () => {
  if(store.game.turnNum>9){
    $('#message-box').text("It's a tie!")
  }else if(store.game.over){
    (store.game.turnNum-1)%2===1 ?
    $('#message-box').text("Player 1 wins") :
    $('#message-box').text("Player 2 wins")
  }
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
  validClick,
  invalidClick,
  statsSuccess,
  statsFailure,
  declareWinner
}
