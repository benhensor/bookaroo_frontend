import React from 'react'
import { Container, StyledLink } from '../assets/styles/HomeStyles'

export default function Home() {
	return (
		<Container>
			<div>
				<h1>Welcome to Bookaroo!</h1>
				<p>A place to discover and exchange old books.</p>
				<p>
					Simply create an account, list your books and connect with
					other Bookaroos to swap or donate!
				</p>
			</div>
			<StyledLink to="/register">Get Started</StyledLink>
		</Container>
	)
}
