import { withUrqlClient } from 'next-urql'
import { Container } from '../components/Container'
import Builder from '../components/Builder'
import { NavBar } from '../components/NavBar'
import { createUrqlClient } from '../utils/createUrqlClient'

const LevelBuilder = () => (
  <Container height="100vh">
    <NavBar />
    <Builder />
  </Container>
)

export default withUrqlClient(createUrqlClient, {ssr: true}) (LevelBuilder);