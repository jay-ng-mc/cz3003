import Grid from 'react-css-grid'
import Tile from '../components/Tile'
import Start from '../components/Start'
import React, { Component } from 'react'
import './board.module.css'

class Board extends React.Component {
    state = {
        startTiles: [130, 118, 13, 1],
        leftWall: [130, 117, 104, 91, 78, 65, 52, 39, 26, 13],
        rightWall: [118, 105, 92, 79, 66, 53, 40, 27, 14, 1],
        currentTile: 0,
        canMoveTo: [],
        didStart: false
    }
  
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
      : this.state.canMoveTo.includes(number)
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
    this.setState({
      currentTile: number
    }, () => this.updateCanMoveTo())
  }
  
  render(){
    return (
      <div className="game-board">
        <Grid
          width={50}
          gap={0}
          >
          {this.createBoard()}  
          </Grid>
        </div>
    );
  }}

  export default Board;