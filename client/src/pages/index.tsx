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

const Index = () => (
  <Container height="100vh">
    <Questions />
  </Container>
)

export default Index
