import React, { Component } from 'react'
import Leaderboard from '../components/leaderboard/Leaderboard'
import { NavBar } from '../components/NavBar'
import { Container } from '../components/Container'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'

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

export default withUrqlClient(createUrqlClient, {ssr: true}) (leaderBoard);