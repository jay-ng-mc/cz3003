import { withUrqlClient } from 'next-urql'
import { Container } from '../components/Container'
import { Home } from '../components/Home'
import { NavBar } from '../components/NavBar'
import { createUrqlClient } from '../utils/createUrqlClient'
import { Questions } from '../components/Questions'

import ReactDOM from 'react-dom';
import _app from './_app'
import Board from './board'
import React from 'react'
import GameLobby from '../components/GameLobby'

const Index = () => (
  <Container height="100vh">
    <NavBar />
    <GameLobby />
  </Container>

)

export default withUrqlClient(createUrqlClient, {ssr: true}) (Index);
