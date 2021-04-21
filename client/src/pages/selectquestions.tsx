import { withUrqlClient } from 'next-urql'
import { Container } from '../components/Container'
import SelectQuestions from '../components/SelectQuestions'
import { NavBar } from '../components/NavBar'
import { createUrqlClient } from '../utils/createUrqlClient'

const SelectQuestionsPage = () => (
  <Container height="100vh">
    <NavBar />
    <SelectQuestions />
  </Container>
)

export default withUrqlClient(createUrqlClient, {ssr: true}) (SelectQuestionsPage);