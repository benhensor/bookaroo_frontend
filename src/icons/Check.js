import React from 'react'
import styled from 'styled-components'

export default function Check({ isactive }) {
	return (
		<Container $isactive={isactive}>
			<svg
				width="800px"
				height="800px"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M20 7L9.00004 18L3.99994 13" />
			</svg>
		</Container>
	)
}

const Container = styled.div`
	display: ${({ $isactive }) => ($isactive ? 'flex' : 'none')};
	justify-content: center;
	align-items: center;
	svg {
		width: 1.5rem;
		height: 1.5rem;
		transition: var(--fast);
		path {
			stroke: ${(props) =>
				props.$isactive ? 'var(--blkGreen)' : 'var(--white)'};
			stroke-width: 1.5;
			stroke-linecap: round;
			stroke-linejoin: round;
		}
		&:hover {
			path {
				stroke: var(--accentGreen);
			}
		}
	}
`
