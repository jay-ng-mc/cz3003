import Grid from 'react-css-grid'
import Tile from './tiles/tile'
import RedTile from './tiles/redTile'
import Start from './tiles/Start'
import WallTile from './tiles/wallTile'
import ShopTile from './tiles/shopTile'
import CurrentTile from './tiles/currentTile'
import React, { Component, useRef } from 'react'
import styles from './board.module.css'
import Character from './BoardCharacter'
import {Box, Stack, Flex, HStack, Button} from "@chakra-ui/react"
import SausageTile from './tiles/sausageTile'
import next from 'next'
import DiceRoller from '../DiceRoller'
import Questions from '../Questions'
import Dice from "react-dice-roll"
import Popup from 'reactjs-popup';
import PopupController from '../PopupController';

class BoardComponent extends React.Component {

    state = {
      charactersCreated: false,
      characters: [],
      sausageTile: [70],
      shopTile: [95],
      redTile:[85, 20,41,72],
      startTiles: [1],
      leftWall: [130, 117, 104, 91, 78, 65, 52, 39, 26, 13],
      rightWall: [118, 105, 92, 79, 66, 53, 40, 27, 14, 1],
      currentTile: 0,
      canMoveTo: [],
      playerTurn: 1,
      turnsTaken: 0,
      didStart: false,
      numberOfPlayers: 3,
      movesLeft : 0,
      wall: [3,4,5,6,7,8,9,10,11,12,13,14,26,27,39,40,52,53,65,66,78,79,91,92,104,105,117,118,119,
      120,121,122,123,124,125,126,127,128,129,130,94,96,97,98,99,100,101,102,
      37,36,35,34,33,32,31,30,29],
      targetPlayer : 0,
      correctlyAnswered : true
  };
  
    createBoard = () => {
    let tileArray = []
    for (let counter = 130; counter > 0; counter--){
      tileArray.push(counter)
    }
    return this.occupyTiles(tileArray)
  }
  
  occupyTiles = (tileArray) => {
    if (this.state.movesLeft == 0){
      return tileArray.map(number => (
        this.state.startTiles.includes(number)
        ? <Start startGame={this.startGame} didStart={false} number={number} />
        : this.state.sausageTile.includes(number) ?
        <SausageTile number={number} />
                :
                this.state.redTile.includes(number) ? 
                <RedTile number={number} />
                  :
                this.state.wall.includes(number)  ?
                <WallTile number = {number} />
                  :
                  this.state.shopTile.includes(number) ?
                  <ShopTile number={number} /> :
                  <Tile number={number} />
      ))
    }
    else {
      return tileArray.map(number => {
          if (this.state.startTiles.includes(number)) {
              return <Start startGame={this.startGame} didStart={this.state.didStart} number={number} />
          } else if (this.state.sausageTile.includes(number)) {
              if (this.state.canMoveTo.includes(number)) {
                  return <SausageTile move={this.move} number={number} />
              } else {
                  return <SausageTile number={number} />
              }

          } else if (this.state.redTile.includes(number)) {
              if (this.state.canMoveTo.includes(number)) {
                  return (
                    <RedTile move={this.move} number={number} movesLeft={this.state.movesLeft} answerQuestion={this.answerQuestion}/>
                  )
              } else {
                  return <RedTile number={number} />
              }
          } else if (this.state.wall.includes(number)) {
              return <WallTile number = {number} />
          } else if (this.state.shopTile.includes(number)) {
              if (this.state.canMoveTo.includes(number)) {
                  return <ShopTile move={this.move} number={number} />
              } else {
                  return <ShopTile number={number} />
              }
          } else if (this.state.canMoveTo.includes(number)) {
              return (
                <Tile move={this.move} number={number} movesLeft={this.state.movesLeft} answerQuestion={this.answerQuestion}/>
              )
          } else if (number == this.state.currentTile) {
              return <CurrentTile number = {number}/>
          } else {
              return <Tile number={number} />
          }
      
        // const tileToRender = 
        // this.state.startTiles.includes(number)
        // ? <Start startGame={this.startGame} didStart={this.state.didStart} number={number} />
        // : this.state.sausageTile.includes(number) ?
        //   this.state.canMoveTo.includes(number)
        //   ? <SausageTile move={this.move} number={number} />
        //   : <SausageTile number={number} />
        //         :
        //         this.state.redTile.includes(number) ? 
        //         this.state.canMoveTo.includes(number)
        //           ? <RedTile move={this.move} number={number} />
        //           : <RedTile number={number} />
        //           :
        //         this.state.wall.includes(number)  ?
        //         <WallTile number = {number} />
        //           :
        //           this.state.shopTile.includes(number) ?
        //           this.state.canMoveTo.includes(number)
        //           ? <ShopTile move={this.move} number={number} />
        //           : <ShopTile number={number} /> :
        //             this.state.canMoveTo.includes(number)
        //               ? <Tile move={this.move} number={number} />
        //               : number == this.state.currentTile ? 
        //               <CurrentTile number = {number}/>
        //               :
        //               <Tile number={number} />
        console.log(tileToRender)
        // return(<PopupController hostDiv={tileToRender} enable={true}/>)
        return(tileToRender)
      })
    }  
  }

  answerQuestion(correctAnswer){
    if (correctAnswer){
      this.setState({
        correctlyAnswered: true
      })
    }
    else {
      this.setState({
        correctlyAnswered: false
      })
    }
  }

  startGame = (number) => {
    if (!this.state.didStart) {
      this.setState({
        didStart: true,
        currentTile: number
      }, () => this.updateCanMoveTo(131))
    }
    //131 is a random number so that a prameter can be taken in
  }

  updateCanMoveTo = (prev) => {
    let updatedCanMoveTo = []
    updatedCanMoveTo.push((this.state.currentTile + 13), this.state.currentTile - 13)
    if (!this.state.leftWall.includes(this.state.currentTile)){
      updatedCanMoveTo.push(this.state.currentTile + 1)
    }
    if (!this.state.rightWall.includes(this.state.currentTile)){
      updatedCanMoveTo.push(this.state.currentTile - 1)
    }
    if (prev == 131){}
    else{
    var index = updatedCanMoveTo.indexOf(prev)
    updatedCanMoveTo.splice(index, 1);
    }
    this.setState({
      canMoveTo: updatedCanMoveTo
    })
  }

  move = (number) => {
    var prev = this.state.currentTile;
    if (this.state.movesLeft == 0){
      console.log("Out of moves")
    }
    else{
    if (this.state.movesLeft == 1){
      if (this.state.redTile.includes(number)){ 
        this.decreaseCoins(this.state.characters[this.state.playerTurn-1])
      }
      else if (this.state.sausageTile.includes(number)){
        this.increaseSausage(this.state.characters[this.state.playerTurn-1])
      }
      else{  
        this.increaseCoins(this.state.characters[this.state.playerTurn-1])
      }
    }
    if (this.state.sausageTile.includes(number)){
      this.increaseSausage(this.state.characters[this.state.playerTurn-1])
    }
    this.state.movesLeft -= 1;
    console.log(this.state.movesLeft);
    this.setState({
      currentTile: number,
    }, () => this.updateCanMoveTo(prev))
  }
  }

  increaseCoins = character => {
    if (this.state.correctlyAnswered){
    const characters = [...this.state.characters];
    const index = characters.indexOf(character);
    characters[index] = {...character};
    characters[index].playerCoins += 3;
    this.setState({ characters });
    }
  };

  increaseMustard = character => {
    const characters = [...this.state.characters];
    const index = characters.indexOf(character);
    characters[index] = {...character};
    characters[index].mustardCount ++;
    this.setState({ characters });
  };

  decreaseCoins = character => {
    if (!this.state.correctlyAnswered){
    const characters = [...this.state.characters];
    const index = characters.indexOf(character);
    characters[index] = {...character};
    characters[index].playerCoins -= 3;
    this.setState({ characters });
    }
  };

  increaseSausage = character => {
    let NewTile = 1;
    let NewSausageTile = [];
    const characters = [...this.state.characters];
    const index = characters.indexOf(character);
    characters[index] = {...character};
    if (characters[index].playerCoins > 20){
    characters[index].playerCoins = characters[index].playerCoins -20;
    characters[index].playerSausage++;
    while (this.state.wall.includes(NewTile) || NewTile == 1 || this.state.shopTile.includes(NewTile)){
      NewTile = Math.floor(Math.random()*130)+2;
      console.log("New Sausage Tile location: ", {NewTile});
    } 
    console.log("New Sausage Tile location: ", {NewTile})
    NewSausageTile.push(NewTile)
    this.setState({
      sausageTile : NewSausageTile
    })
    if(characters[index].playerSausage == 3){
      console.log("End game");
    }
  }
    this.setState({ characters });
  };


  nextTurn = (number) => {
    const characters = [...this.state.characters];
    const index = this.state.playerTurn-1;
    let nextIndex;
    index === number-1 ? nextIndex = 0: nextIndex = index+1;
    if (this.state.turnsTaken == 3 * this.state.numberOfPlayers){
      console.log("GAME END");
    }
    if (characters[index].position === 0 && this.state.turnsTaken < number){ 
    this.state.didStart = false;}
    this.state.turnsTaken++;
    console.log("Turns Taken:", this.state.turnsTaken)
    characters[index] = {...characters[index]};
    characters[index].position = this.state.currentTile;
    characters[index].canMoveTo = this.state.canMoveTo;
    this.state.currentTile = characters[nextIndex].position;
    this.state.canMoveTo = characters[nextIndex].canMoveTo;
    this.state.playerTurn = nextIndex + 1;
    this.setState({ characters });
  };

  createCharacters = (number) =>{
    if (this.state.charactersCreated == false){
      this.state.charactersCreated = true;
      for (let x = 1; x <= number; x++){
        this.state.characters.push(
          {characterId: x, playerCoins: 100, playerSausage: 0, mustardCount: 0,ketchupCount: 0,
          position:0,canMoveTo:[], answeredCorrectly: true})
    }}
  };

  rollDice = (value) => {
    if (this.state.movesLeft == 0){{
      this.setState({ movesLeft : value });
    }
    if (this.state.turnsTaken != 0){
    this.nextTurn(this.state.numberOfPlayers);
    }
    else{
      this.state.turnsTaken++;
    }}
    this.startGame(1)
  };

  createMustardButton = () => {
    let currentPlayer = [this.state.playerTurn]
    let playerArray = []
    for (let counter = this.state.numberOfPlayers; counter > 0; counter--){
      playerArray.push(counter)
    }
    if(this.state.characters[this.state.playerTurn-1].mustardCount == 0){}
    else{
    return playerArray.map(number => (
      currentPlayer.includes(number)?<Box/>
      :
      <Button colorScheme = "yellow"
      onClick={() => this.mustardFunction(number)}>
        Steal from {number}
      </Button>
    ))}
  }

  mustardFunction = (targetPlayer) => {
    this.state.targetPlayer = targetPlayer - 1
    this.mustardCall(this.state.characters[this.state.playerTurn-1])
  }

  mustardCall = character => {
    const characters = [...this.state.characters];
    const index = characters.indexOf(character);
    characters[index] = {...character};
    characters[index].playerCoins += 5;
    characters[index].mustardCount--;
    characters[this.state.targetPlayer].playerCoins -= 5;
    this.setState({ characters });
  };

  declareTurn = () => {
    if (this.state.turnsTaken == 0){
      return "Game has not started"
    }
    else{ 
      return (this.state.turnsTaken - this.state.playerTurn)/3 + 1
    }
  }


  render(){
    return (
      <div>
        {this.createCharacters(this.state.numberOfPlayers)}
        <Flex flexDir='column'>
          <Stack isInline={true} mt='30px' mb='30px' spacing ="10px" height='auto'>
            { this.state.characters.map(character => (
              <Character 
              key ={character.characterId} 
              increaseCoins={this.increaseCoins}
              decreaseCoins={this.decreaseCoins}
              nextTurn={this.nextTurn}
              mustardCall = {this.mustardFunction}
              character={character}
              />))}
            <Box as="button" style={ButtonStyle} px={4} mr="10px"
              width="250px"
              height="50px"
              onClick={() => this.increaseMustard(this.state.characters[this.state.playerTurn-1])}
              className="btn btn-secondary btn-sm"
            >
              increase Mustard
            </Box>
          </Stack>
        </Flex>
        <Box color="black" bg="green.300" px={4} fontSize="30px" height = "50px" > 
                    <b> Current Player: Player {this.state.playerTurn} </b>    
                </Box>
        <Box style={TextStyle}
        width="400px"
        height="50ps">
              Current Turn: {this.declareTurn()}
        </Box>
        <Box style={TextStyle}
        width="400px"
        height="50ps">
              Moves Left: {this.state.movesLeft}
        </Box>
        <HStack>
        <Grid className={styles.gameBoard} width={45} gap={5} >
          {this.createBoard()}  
        </Grid>
        <Stack>
        <Dice size={100} onRoll={(value) => this.rollDice(value)}/>
        {this.createMustardButton()}
        </Stack>
        </HStack>
      </div>
    );
  }

}

  const ButtonStyle = {
    backgroundColor: "tomato",
    color: "yellow",
    borderRadius: "10px",
    fontSize:"20px"
  }

  const TextStyle = {
    color: "black",
    borderRadius: "10px",
    fontSize:"30px"
  }

  export default BoardComponent;
