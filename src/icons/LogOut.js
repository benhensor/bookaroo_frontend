import React from 'react'
import styled from 'styled-components'
import { useAuth } from '../context/AuthContext'

export default function LogOut({ onClick }) {
	const { logout } = useAuth()

	const handleOnClick = () => {
		if (onClick) {
			logout()
		}
	}

	return (
		<Container onClick={handleOnClick}>
			<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
				<path d="M14 4L18 4C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H14M3 12L15 12M3 12L7 8M3 12L7 16" />
			</svg>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	svg {
		width: 3rem;
		height: 3rem;
		transition: var(--fast);
		path {
			stroke: var(--white);
			stroke-width: 1.5;
			stroke-linecap: round;
			stroke-linejoin: round;
		}
		&:hover {
			path {
				stroke: var(--danger);
			}
		}
	}
`
