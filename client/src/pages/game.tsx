import { withUrqlClient } from 'next-urql'
import { Container } from '../components/Container'
import { NavBar } from '../components/NavBar'
import { createUrqlClient } from '../utils/createUrqlClient'
import _app from './_app'
import React from 'react'
import GameComponent from '../components/GameComponent'

const Index = () => (
  <Container height="100vh">
    <NavBar />
    <GameComponent />
  </Container>

)

export default withUrqlClient(createUrqlClient, {ssr: true}) (Index);
