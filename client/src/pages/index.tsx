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
import { DiceRoller } from '../components/DiceRoller'
import Shop from '../components/Shop'
//import { Home } from '../components/Home'

const Index = () => (
  <Container height="100vh">
    <Shop />
  </Container>
)

export default Index
