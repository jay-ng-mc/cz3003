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
import Register from '../components/Register'

const Index = () => (
  <Container height="100vh">
    <Register />
  </Container>
)

export default Index
