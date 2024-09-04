import React from 'react'
import styled from 'styled-components'

export default function Profile({ isActive }) {


	return (
		<Container
			$isactive={isActive}
		>
			<svg
				width="800"
				height="800"
				viewBox="0 0 800 800"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M400.335 400.335C331.993 400.335 276.414 345.019 276.414 277.001C276.414 208.982 331.993 153.667 400.335 153.667C468.678 153.667 524.256 208.982 524.256 277.001C524.256 345.019 468.678 400.335 400.335 400.335ZM516.759 421.085C565.925 381.711 594.582 318.038 584.048 248.324C571.811 167.448 504.212 102.729 422.61 93.2943C309.997 80.2517 214.453 167.511 214.453 277.001C214.453 335.276 241.592 387.199 283.911 421.085C179.941 459.966 104.039 551.265 92.1429 674.475C90.408 692.698 104.69 708.67 123.092 708.67C138.861 708.67 152.307 696.83 153.701 681.198C166.124 543.588 271.984 462.002 400.335 462.002C528.686 462.002 634.546 543.588 646.969 681.198C648.363 696.83 661.809 708.67 677.578 708.67C695.98 708.67 710.262 692.698 708.527 674.475C696.631 551.265 620.729 459.966 516.759 421.085Z"
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
			fill: ${(props) => (props.$isactive ? 'var(--accentGreen)' : 'var(--white)')};
			stroke-width: 1;
			stroke-linecap: round;
			stroke-linejoin: round;
		}
		&:hover {
			path {
				fill: var(--accentGreen);
			}
		}
	}
`
