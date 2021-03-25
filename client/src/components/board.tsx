import Grid from 'react-css-grid'
import Tile from './Tile'
import RedTile from './redTile'
import Start from './Start'
import React, { Component } from 'react'
import styles from '../board/board.module.css'
import Character from './Character'
import {Box} from "@chakra-ui/react";
import next from 'next'

class Board extends React.Component {

    state = {
      charactersCreated: false,
      characters: [],
      redTile:[18,23,45,62],
      startTiles: [1],
      leftWall: [130, 117, 104, 91, 78, 65, 52, 39, 26, 13],
      rightWall: [118, 105, 92, 79, 66, 53, 40, 27, 14, 1],
      currentTile: 0,
      canMoveTo: [],
      playerTurn: 1,
      turnsTaken: 0,
      didStart: false,
      numberOfPlayers: 3,
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
      : this.state.redTile.includes(number) ? 
        this.state.canMoveTo.includes(number)
          ? <RedTile move={this.move} number={number} />
          : <RedTile number={number} />:
        this.state.canMoveTo.includes(number)
          ? <Tile move={this.move} number={number} />
          : <Tile number={number} />
    ))  
  }

  startGame = (number) => {
    this.setState({
      didStart: true,
      currentTile: number
    }, () => this.updateCanMoveTo()
    )
  }

  updateCanMoveTo = () => {
    let updatedCanMoveTo = []
    updatedCanMoveTo.push((this.state.currentTile + 13), this.state.currentTile - 13)
    if (!this.state.leftWall.includes(this.state.currentTile)){
      updatedCanMoveTo.push(this.state.currentTile + 1)
    }
    if (!this.state.rightWall.includes(this.state.currentTile)){
      updatedCanMoveTo.push(this.state.currentTile - 1)
    }
    this.setState({
      canMoveTo: updatedCanMoveTo
    })
  }

  move = (number) => {
    this.state.redTile.includes(number) ? 
      this.decreaseCoins(this.state.characters[this.state.playerTurn-1]) :
      this.increaseCoins(this.state.characters[this.state.playerTurn-1])
    this.setState({
      currentTile: number
    }, () => this.updateCanMoveTo())
  }

  increaseCoins = character => {
    const characters = [...this.state.characters];
    const index = characters.indexOf(character);
    characters[index] = {...character};
    characters[index].playerCoins++;
    this.setState({ characters });
  };

  decreaseCoins = character => {
    const characters = [...this.state.characters];
    const index = characters.indexOf(character);
    characters[index] = {...character};
    characters[index].playerCoins--;
    this.setState({ characters });
  };

  nextTurn = (number) => {
    const characters = [...this.state.characters];
    const index = this.state.playerTurn-1;
    let nextIndex;
    index === number-1 ? nextIndex = 0: nextIndex = index+1;
    if (characters[index].position === 0 && this.state.turnsTaken < number-1){ 
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
          {characterId: x, playerCoins: 10, playerSausage: 0, 
          position:0,canMoveTo:[]})
    }}
  };


  render(){
    return (
      <div className={styles.gameBoard}>
        {this.createCharacters(this.state.numberOfPlayers)}
        { this.state.characters.map(character => (
          <Character 
          key ={character.characterId} 
          increaseCoins={this.increaseCoins}
          decreaseCoins={this.decreaseCoins}
          nextTurn={this.nextTurn}
          character={character}
          />))}
        <Box as="button" style={ButtonStyle} px={4} mr="10px"
        width="50%"
        height="50%"
                onClick={() => this.nextTurn(this.state.numberOfPlayers)}
                className="btn btn-secondary btn-sm"
                >
                    nextTurn
                </Box>
        <Grid
          width={50}
          gap={0}
          >
          {this.createBoard()}  
          </Grid>
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

  export default Board;