import React, { Component } from 'react'
import BoardComponent from '../components/board/BoardComponent'
import { NavBar } from '../components/NavBar'
import { Container } from '../components/Container'

class Board extends React.Component {
  render() {
    return(
      <Container height='100vh'>
        <NavBar />
        <BoardComponent/>
      </Container>
    )
  }
}

export default Board;