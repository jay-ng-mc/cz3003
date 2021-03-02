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
import { Login } from '../components/Login'

const Index = () => (
  <Container height="100vh">
    <Login />
  </Container>
)

export default Index
