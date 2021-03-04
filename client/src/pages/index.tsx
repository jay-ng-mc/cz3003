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
//import { DiceRoller } from '../components/DiceRoller'
//import { Home } from '../components/Home'
import { ChooseCharacter } from '../components/ChooseCharacter'

const Index = () => (
  <Container height="100vh">
    <ChooseCharacter />
  </Container>
)

export default Index
