//This page contains all front end ui results following event handlers
'use strict'
const store = require('./store')

const signUpSuccess = (data) => {
  $('#registration-result').text("Welcome to the greatest game since rock, paper, scissors. Sign in below to play.")
  $('#signup-form').trigger('reset')
}
const signUpFailure = () => {
  $('#registration-result').text("you failed")
  $('#signup-form').trigger('reset')
}
const signInSuccess = data => {
  $('#registration-result').text("Currently playing as "+data.user.email)
  $('#user-options').show()
  $('#signedIn').show()
  $('.registration').hide()
  store.user = data.user
  console.log(store)
  $('#signin-form').trigger('reset')
}
const signInFailure = () => {
  $("#registration-result").text("Email and Password not recognized")
  $('#signin-form').trigger('reset')
}
const pwChangeSuccess = data => {
  $('#registration-result').text("you have successfully changed password")
  $('#pwChange-form').trigger('reset')
  setTimeout(function(){
    // alert("how's it going?")
    $('#registration-result').text("Currently playing as "+data.user.email)
  }, 2000);
}
const pwChangeFailure = () => {
  $("#registration-result").text("you failed to change password")
}
const signOutSuccess = data => {
  $('#registration-result').text("Thanks for playing, "+store.user.email+"!")
  $('.registration').show()
  $('#user-options').hide()
  $('#signedIn').hide()
  $('#message-box').text('')
  $('.board').hide()
  $('#scoreboard').hide()
  store.user=null
  store.game.oneScore=0;
  store.game.twoScore=0;
}
const signOutFailure = data => {
  $("#registration-result").text("Sign out failed")
}

//Gameboard UI Events
const validClick = event => {
  $(event.target).html(store.game.cell.value).addClass('gamepiece')
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
  $('#message-box').text(`Player 1 won ${playerOne} time(s), and Player 2 won ${playerTwo} time(s).`)
}

const statsFailure = data => {
  console.log('Failed to retrieve stats')
}

//outcomme
const declareWinner = () => {
  if(store.game.turnNum>9){
    $('#message-box').text("It's a tie!")
  }else if(store.game.over){
    if((store.game.turnNum-1)%2===1){
      store.game.oneScore++
      $('#message-box').text("Player 1 wins")
      $('#scoreboard').show().text(`Player 1 - ${store.game.oneScore} : Player 2 - ${store.game.twoScore}`)
    }else{
      store.game.twoScore++
      $('#message-box').text("Player 2 wins")
      $('#scoreboard').show().text(`Player 1 - ${store.game.oneScore} : Player 2 - ${store.game.twoScore}`)
    }
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
