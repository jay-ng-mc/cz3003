import { withUrqlClient } from 'next-urql'
import { Container } from '../components/Container'
import { Home } from '../components/Home'
import { NavBar } from '../components/NavBar'
import { createUrqlClient } from '../utils/createUrqlClient'

import ReactDOM from 'react-dom';
import _app from './_app'
import Board from './board'
import UserProfile from '../components/user/UserProfile'

const Index = () => (
  <Container height="100vh">
    <NavBar />
    <UserProfile />
  </Container>

)

export default withUrqlClient(createUrqlClient, {ssr: true}) (Index);
