import { withUrqlClient } from 'next-urql'
import { Container } from '../components/Container'
import Builder1 from '../components/Builder1'
import { NavBar } from '../components/NavBar'
import { createUrqlClient } from '../utils/createUrqlClient'

const LevelBuilder = () => (
  <Container height="100vh">
    <NavBar />
    <Builder1 />
  </Container>
)

export default withUrqlClient(createUrqlClient, {ssr: true}) (LevelBuilder);