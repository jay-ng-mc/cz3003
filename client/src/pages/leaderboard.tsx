import React, { Component } from 'react'
import Leaderboard from '../components/leaderboard/Leaderboard'
import { NavBar } from '../components/NavBar'
import { Container } from '../components/Container'

class leaderBoard extends React.Component {
  render() {
    return(
      <Container height='100vh'>
        <NavBar />
        <Leaderboard/>
      </Container>
    )
  }
}

export default leaderBoard;