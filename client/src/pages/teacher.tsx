import React, { Component } from 'react'
import Teacher from '../components/teacher/Teacher'
import { NavBar } from '../components/NavBar'
import { Container } from '../components/Container'

class teacher extends React.Component {
  render() {
    return(
      <Container height='100vh'>
        <NavBar />
        <Teacher/>
      </Container>
    )
  }
}

export default teacher;