import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Container = styled.div`
	margin-top: 11.2rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	@media only screen and (max-width: 768px) {
		margin-top: 5.6rem;
	}
`

export const Content = styled.div`
	width: 100%;
	max-width: 40rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: var(--lg);
	@media only screen and (max-width: 768px) {
		max-width: 30rem;
		gap: var(--md);
	}
`

export const P = styled.p`
	margin-top: var(--sm);
	font-size: clamp(1.2rem, 2vw, 1.4rem);
	display: flex;
`

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: var(--sm);
	margin: var(--sm) auto;
	overflow-x: hidden;
	width: 100%;
`

export const InputGroup = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	margin-bottom: var(--sm);
	&:last-of-type {
		margin-bottom: var(--lg);
	}
`

export const CheckContainer = styled.div`
	position: absolute;
	right: var(--sm);
	top: calc(50% + 0.25rem);
	display: flex;
	align-items: center;
	justify-content: center;
`

export const Label = styled.label`
	display: flex;
	width: 100%;
	flex-direction: column;
	gap: var(--sm);
	font-size: clamp(1rem, 2vw, 1.2rem);
	margin-bottom: var(--xs);
	overflow: hidden;
`

export const Input = styled.input`
	width: 100%;
	padding: var(--sm);
	font-size: clamp(1.4rem, 2vw, 1.6rem);
	border: none;
	border-bottom: 3px solid var(--dkGreen);
	transition: var(--fast);
	&:focus {
		outline: none;
		border-bottom: 3px solid var(--selected);
	}
	&.valid {
		border-bottom: 3px solid var(--accentGreen);
	}
	&.error {
		border-bottom: 3px solid var(--softRed);
	}
	&.error::placeholder {
		color: var(--softRed);
	}
`

export const Error = styled.p`
	position: absolute;
	top: 100%;
	width: 100%;
	text-align: right;
	font-family: 'Roboto', sans-serif;
	font-size: var(--fs-xxs);
	color: var(--danger);
`

export const RegisterButton = styled.button`
	width: 100%;
	background-color: var(--dkGreen);
	color: var(--white);
	padding: var(--sm) var(--md);
	font-size: clamp(1.2rem, 2vw, 1.4rem);
	border: none;
	display: inline-block;
	text-align: center;
	border-radius: var(--xs);
	cursor: pointer;
	&:hover {
		background-color: var(--accentLtGreen);
		color: var(--blkGreen);
	}
`

export const StyledLink = styled(Link)`
	text-decoration: none;
	color: var(--dkGreen);
	font-size: inherit;
	cursor: pointer;
	transition: var(--fast);
	&:hover {
		color: var(--accentGreen);
	}
`
