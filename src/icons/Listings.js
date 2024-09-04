import React from 'react'
import styled from 'styled-components'

export default function Listings({ isActive }) {



	return (
		<Container
			$isactive={isActive}
		>
			<svg
				width="800px"
				height="800px"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M5 19V6.2C5 5.0799 5 4.51984 5.21799 4.09202C5.40973 3.71569 5.71569 3.40973 6.09202 3.21799C6.51984 3 7.0799 3 8.2 3H15.8C16.9201 3 17.4802 3 17.908 3.21799C18.2843 3.40973 18.5903 3.71569 18.782 4.09202C19 4.51984 19 5.0799 19 6.2V17H7C5.89543 17 5 17.8954 5 19ZM5 19C5 20.1046 5.89543 21 7 21H19M18 17V21M10 6V10M14 10V14M8 8H12M12 12H16"
				/>
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
			stroke: ${(props) => (props.$isactive ? 'var(--accentGreen)' : 'var(--white)')};
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
