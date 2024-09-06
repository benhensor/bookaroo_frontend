import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Container = styled.div`
	margin-top: 11.2rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	div {
		max-width: 40rem;
		text-align: center;
    margin-bottom: var(--md);
		h1 {
			font-size: clamp(2rem, 4vw, 3.2rem);
			margin-bottom: var(--md);
		}
		p {
			font-size: clamp(1.2rem, 2.5vw, 1.6rem);
			margin-bottom: var(--md);
		}
	}
  @media only screen and (max-width: 768px) {
    margin-top: 5.6rem;
	}
	@media only screen and (max-width: 450px) {
    div {
		  max-width: 30rem;
      margin-bottom: var(--sm);
    }
	}
`

export const StyledLink = styled(Link)`
	text-decoration: none;
	background-color: var(--dkGreen);
	color: var(--white);
	padding: var(--sm) var(--md);
	font-size: clamp(1.2rem, 2vw, 1.4rem);
	border-radius: 25px;
	transition: var(--fast);
	&:hover {
		background-color: var(--accentGreen);
		color: var(--blkGreen);
	}
`
