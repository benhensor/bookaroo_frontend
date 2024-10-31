import React from 'react'
import { Container, StyledLink } from '../assets/styles/HomeStyles'
import { Note } from '../assets/styles/RegisterLoginStyles'

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
				<Note>
					* Please note, this app is deployed to Render and requires a
					moment to spin up. Please allow time for the app to become
					active. This app is for demonstration purposes only.
				</Note>
			</div>
			<StyledLink to="/register">Get Started</StyledLink>
		</Container>
	)
}
