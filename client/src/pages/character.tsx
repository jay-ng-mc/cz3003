import { withUrqlClient } from 'next-urql'
import { Container } from '../components/Container'
import { NavBar } from '../components/NavBar'
import { createUrqlClient } from '../utils/createUrqlClient'

import _app from './_app'
import ChooseCharacter from '../components/ChooseCharacter'

const Index = () => (
  <Container height="100vh">
    <NavBar />
    <ChooseCharacter/>
  </Container>

)

export default withUrqlClient(createUrqlClient, {ssr: true}) (Index);
