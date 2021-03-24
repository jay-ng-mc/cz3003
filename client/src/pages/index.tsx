import {
  Link as ChakraLink,
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
} from '@chakra-ui/react'
import { CheckCircleIcon, LinkIcon } from '@chakra-ui/icons'
import { Container } from '../components/Container'
import { Questions } from '../components/Questions'
//import { Home } from '../components/Home'

import ReactDOM from 'react-dom';
import _app from './_app'
import Board from '../components/board'

const Index = () => (
  <Container height="100vh">
    <Board />
    <Questions />
  </Container>
)

export default Index
