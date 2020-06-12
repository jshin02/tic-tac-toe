//This page contains all front end ui results following event handlers
'use strict'
const store = require('./store')

//User Documentation Results
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
  $('.start-options').show()
  $('#signedIn').show()
  $('.registration').hide()
  store.user = data.user
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
    $('#registration-result').text(`Contine playing Tic-Tac-Toe`)
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
  $('#message-box').fadeOut('fast')
  $('.board').fadeOut('fast')
  $('#scoreboard').fadeOut('fast')
  store.user=null
  store.game.oneScore=0;
  store.game.twoScore=0;
  store.game.yourScore=0;
  store.game.aiScore=0;
}
const signOutFailure = data => {
  $("#registration-result").text("Sign out failed")
}

//Gameboard UI Events
const validClick = event => {
  $(event.target).html(store.game.cell.value).addClass('gamepiece')
  if(store.game.over===false){
    if(store.opponent==='ai'&&(store.game.turnNum%2===0)){
      $('#message-box').text(`I'm thinking.`)
    }else if((store.game.turnNum)%2===0&&store.game.winner===false){
      $('#message-box').text(`Player 2's turn`)
    }else{
      $('#message-box').text(`Player 1's turn`)
    }
  }
}
const validClickFail = () => {
  $('#message-box').text('Internal malfunction')
}

const invalidClick = () => {
  if(store.game.over===false&&store.opponent==='ai'){
    $('#message-box').text('Umm, do you mind?')
  }else if(store.game.over===false){
    $('#message-box').text(`That square has already been selected, click on an empty square to make a valid selection.`)
  }
}

const aiSuccess = (data) => {
  $('[data-index='+store.game.cell.index+']').html(store.game.cell.value).addClass('gamepiece')
  if(store.game.over===false){
    $('#message-box').text(`Your turn`)
  }
}

const aiFailure = () => {
  $('#message-box').text('Internal malfunction. Probably your fault though.')
}

//Game setup
const createSuccess = data => {
  $('#message-box').show().text('Created New Game')
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
  $('#message-box').text(`Player 1 won ${playerOne} time(s), and Player 2 won ${playerTwo} time(s).`).fadeIn(2000)
}
const statsFailure = data => {
  $('#message-box').text('Failed to retrieve stats')
}
// const gamesNotOver = data => {
//   console.log(data)
//   let games = []
//   for (let i=0; i<3; i++){
//     // console.log('game'+i)
//     store.tbd['game'+i].cells=data.games[i].cells
//     store.tbd['game'+i].id=data.games[i]._id
//     store.tbd['game'+i].over=data.games[i].over
//   }
//   console.log(store.tbd)
// }
// const falseGamesFail = data => {
//   console.log('fail')
// }
//Outcome Messaging
const blinkCondition = () => {
  let firstBox = store.game.winners[store.game.wIndex][0]
  let secondBox = store.game.winners[store.game.wIndex][1]
  let thirdBox = store.game.winners[store.game.wIndex][2]
      store.interval = setInterval(function(){
        $('[data-index='+firstBox+']').hasClass('blink') ? $('[data-index='+firstBox+']').removeClass('blink') : $('[data-index='+firstBox+']').addClass('blink');
        $('[data-index='+secondBox+']').hasClass('blink') ? $('[data-index='+secondBox+']').removeClass('blink') : $('[data-index='+secondBox+']').addClass('blink');
        $('[data-index='+thirdBox+']').hasClass('blink') ? $('[data-index='+thirdBox+']').removeClass('blink') : $('[data-index='+thirdBox+']').addClass('blink');
      }, 700)
}
const declareWinner = () => {
  if(store.game.winner){
    blinkCondition()
  }
  if(store.game.turnNum>9&&store.game.winner===false){
    $('#message-box').text("It's a tie!")
  }else if(store.opponent==='ai'){
      if(store.game.over&&store.game.turnNum%2===1){
        store.game.aiScore++
        $('#message-box').text("I win!")
        $('#scoreboard').show().text(`You - ${store.game.yourScore} : Me - ${store.game.aiScore}`)
      }else if(store.game.over&&store.game.turnNum%2===0){
        store.game.yourScore++
        $('#message-box').text("Ugh, you win")
        $('#scoreboard').show().text(`You - ${store.game.yourScore} : Me - ${store.game.aiScore}`)
      }
  }else if(store.game.over&&store.opponent==='player'){
    if(store.game.turnNum%2===0){
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
  validClickFail,
  aiSuccess,
  aiFailure,
  invalidClick,
  statsSuccess,
  statsFailure,
  declareWinner
}
