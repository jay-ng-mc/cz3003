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
import ReactDOM from 'react-dom';
import _app from './_app'
import Board from '../board/board'

const Index = () => (
  <Container height="100vh">
  </Container>
)
ReactDOM.render(<Board />, document.getElementById('root'));

export default Index
