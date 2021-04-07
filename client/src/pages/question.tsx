import { withUrqlClient } from 'next-urql'
import { Container } from '../components/Container'
import Questions from '../components/Questions'
import { NavBar } from '../components/NavBar'
import { createUrqlClient } from '../utils/createUrqlClient'

const Question = () => (
  <Container height="100vh">
    <NavBar />
    <Questions />
  </Container>

)

export default withUrqlClient(createUrqlClient, {ssr: true}) (Question);