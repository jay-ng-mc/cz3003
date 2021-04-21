import { withUrqlClient } from 'next-urql'
import { Container } from '../components/Container'
import LevelBuilder from '../components/Builder'
import { NavBar } from '../components/NavBar'
import { createUrqlClient } from '../utils/createUrqlClient'

const Builder = () => (
  <Container height="100vh">
    <NavBar />
    <LevelBuilder />
  </Container>
)

export default withUrqlClient(createUrqlClient, {ssr: true}) (Builder);