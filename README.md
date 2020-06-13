# Application Title: A Description

This application allows the user to do play a game of Tic-Tac-Toe against another player, or against "the computer" - auto generated responses.

## Important Links

- [API Documentation](https://git.generalassemb.ly/ga-wdi-boston/game-project-api)
- [Deployed Client](https://jshin02.github.io/tic-tac-toe/)

## Planning Story
This is an adaptation of the key problems that came out of my whiteboarding (pictures below) that I knew would require more attention.

Consolidated plan for game engine:
The Game Engine
First, manipulate a single cell.
Is this box empty?
If no, provide a queue that says the square is occupied.
If yes, call function that changes box to yes or no.

function -> Tick(id of box that needs to be changed)
Tick gives that position X or O depending on value of store.turnNum
add to the turnNum

function -> Is game over? (gameStatus) -> game engine
Find winning conditions

**Update api with “game: over”**

**Update api with the cell and game status change**

### User Stories

- As a user I want to sign in/up
- As a user I want to Create a new game
- As a user I want to Read multiple < resources >
- As a user I want to Read a single < resource >
- As a user I want to Update a game with each move that I make.
- As a user I want to Delete a < resource > I own from the history of games.
- As a competitive user, I want to see a history of my games so that I can see how I have been doing.
- As a competitive user, I want to see a running scoreboard of the number of times I won so that I can see who is winning.
- As a forgetful user, I want to be able to change my password with ease so that I don't lose too much time before playing again.
- As a user who doesn't speak English, I want to add instructions, through instructions or animations so that anyone can start playing this game.

### Technologies Used

- jQuery
- HTML/CSS
- Bootstrap
- Javascript

### Unsolved Problems

- Still need to complete view and interaction of incomplete games stored in the api.
- Would like to eventually create a more "difficult" level of ai interaction.

## Images
![Logo](public/tic_tac_toe.svg.png)
---

#### Wireframe:
![wireframe](https://media.git.generalassemb.ly/user/28541/files/49ea3480-a968-11ea-82fe-dd6ee5f14cb0)

#### Planning:
![Planning1](https://media.git.generalassemb.ly/user/28541/files/46ef4400-a968-11ea-8418-2a2ffe34d88e)
![Planning2](https://media.git.generalassemb.ly/user/28541/files/4d7dbb80-a968-11ea-9985-4645edf8c64a)
