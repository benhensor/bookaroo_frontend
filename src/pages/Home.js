import React from 'react'
import Button from '../components/buttons/Button'
import Task from '../components/Task'
import {
  Container,
  Info,
} from '../assets/styles/HomeStyles'

export default function Home() {
  return (
    <section>
      <Task />
      <Container>
        <Info>
          <h1>Welcome to Bookaroo!</h1>
          <p>A place to discover and exchange old books.</p>
          <p>Simply create an account, list your books and connect with other Bookaroos to swap or donate!</p>
        </Info>
        <Button
          id="link"
          to="/register"
          text="Get Started"
        >
          Get Started
        </Button>
      </Container>
    </section>
  )
}