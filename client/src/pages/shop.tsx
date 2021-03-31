import { withUrqlClient } from 'next-urql'
import { Container } from '../components/Container'
import ShopPage from '../components/Shop'
import { NavBar } from '../components/NavBar'
import { createUrqlClient } from '../utils/createUrqlClient'

const Shop = () => (
  <Container height="100vh">
    <NavBar />
    <ShopPage />
  </Container>

)

export default withUrqlClient(createUrqlClient, {ssr: true}) (Shop);