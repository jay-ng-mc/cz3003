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
import { BrowSerRouter as Router, Route, Link, NavLink, Switch } from "react-router-dom"
//import { DiceRoller } from '../components/DiceRoller'
import Home from './Home'
//import ChooseCharacter from '../pages/ChooseCharacter'

const Index = () => (
  <Container height="100vh">
    <Home />
  </Container>
)

export default Index
