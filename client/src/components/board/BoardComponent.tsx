import Grid from 'react-css-grid'
import Tile from './tiles/tile'
import RedTile from './tiles/redTile'
import Start from './tiles/Start'
import WallTile from './tiles/wallTile'
import ShopTile from './tiles/shopTile'
import React, { Component } from 'react'
import styles from './board.module.css'
import Character from './BoardCharacter'
import {Box, Stack, Flex, HStack, Button} from "@chakra-ui/react"
import SausageTile from './tiles/sausageTile'
import next from 'next'
import { DiceRoller } from './DiceRoller'
import { Questions } from '../components/Questions'
import Dice from "react-dice-roll"

class BoardComponent extends React.Component {

    state = {
      charactersCreated: false,
      characters: [],
      sausageTile: [3],
      shopTile: [95],
      redTile:[85,53,4,92],
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
      wall: [15,28,16,17,18,19,20,21,22,23,24,25,38,51,64,77,76,75,74,73,72,71,70,69,68,67,41,54],
      targetPlayer : 0,
  };
  
    createBoard = () => {
    let tileArray = []
    for (let counter = 130; counter > 0; counter--){
      tileArray.push(counter)
    }
    return this.occupyTiles(tileArray)
  }
  
  occupyTiles = (tileArray) => {
    return tileArray.map(number => (
      this.state.startTiles.includes(number)
      ? <Start startGame={this.startGame} didStart={this.state.didStart} number={number} />
      : this.state.sausageTile.includes(number) ?
        this.state.canMoveTo.includes(number)
        ? <SausageTile move={this.move} number={number} />
        : <SausageTile number={number} />
              :
              this.state.redTile.includes(number) ? 
              this.state.canMoveTo.includes(number)
                ? <RedTile move={this.move} number={number} />
                : <RedTile number={number} />
                :
              this.state.wall.includes(number)  ?
              <WallTile number = {number} />
                :
                this.state.shopTile.includes(number) ?
                this.state.canMoveTo.includes(number)
                ? <ShopTile move={this.move} number={number} />
                : <ShopTile number={number} /> :
                  this.state.canMoveTo.includes(number)
                    ? <Tile move={this.move} number={number} />
                    : <Tile number={number} />
    ))  
  }


  startGame = (number) => {
    this.setState({
      didStart: true,
      currentTile: number
    }, () => this.updateCanMoveTo(131)
    //131 is a random number so that a prameter can be taken in
    )
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
    console.log({updatedCanMoveTo});
    this.setState({
      canMoveTo: updatedCanMoveTo
    })
  }

  move = (number) => {
    var prev = this.state.currentTile;
    console.log({prev});
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
    }}
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
    const characters = [...this.state.characters];
    const index = characters.indexOf(character);
    characters[index] = {...character};
    characters[index].playerCoins += 3;
    this.setState({ characters });
  };

  increaseMustard = character => {
    const characters = [...this.state.characters];
    const index = characters.indexOf(character);
    characters[index] = {...character};
    characters[index].mustardCount ++;
    this.setState({ characters });
  };

  decreaseCoins = character => {
    const characters = [...this.state.characters];
    const index = characters.indexOf(character);
    characters[index] = {...character};
    characters[index].playerCoins -= 3;
    this.setState({ characters });
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
    } 
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
    if (characters[index].position === 0 && this.state.turnsTaken < number){ 
    this.state.didStart = false;
    console.log(this.state.didStart);
    this.state.turnsTaken++
    console.log(this.state.turnsTaken)}
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
          {characterId: x, playerCoins: 10, playerSausage: 0, mustardCount: 0,
          position:0,canMoveTo:[]})
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
            <Box color="black" bg="green.300" px={4} fontSize="30px"> 
                    <b> Current Turn: Player {this.state.playerTurn} </b>    
                </Box>
          </Stack>
        </Flex>
        <Box style={TextStyle}
        width="400px"
        height="50ps">
              Moves Left: {this.state.movesLeft}
        </Box>
        <HStack>
        <Grid className={styles.gameBoard} width={50} gap={0}>
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
    backgroundColor: "yellow",
    color: "black",
    borderRadius: "10px",
    fontSize:"30px"
  }

  export default BoardComponent;
