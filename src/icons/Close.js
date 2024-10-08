import React from 'react'
import styled from 'styled-components'

export default function Trash() {
	return (
		<Container>
			<svg
				width="800"
				height="800"
				viewBox="0 0 800 800"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M454.294 382.335L697.107 139.521C712.524 124.104 712.524 100.979 697.107 85.5626C681.691 70.1458 658.566 70.1458 643.149 85.5626L400.335 328.376L157.521 85.5626C142.104 70.1458 118.979 70.1458 103.563 85.5626C88.1458 100.979 88.1458 124.104 103.563 139.521L346.376 382.335L103.563 625.149C95.8542 632.857 92 640.566 92 652.128C92 675.253 107.417 690.67 130.542 690.67C142.104 690.67 149.813 686.816 157.521 679.107L400.335 436.294L643.149 679.107C650.857 686.816 658.566 690.67 670.128 690.67C681.691 690.67 689.399 686.816 697.107 679.107C712.524 663.691 712.524 640.566 697.107 625.149L454.294 382.335Z" />
			</svg>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	svg {
		width: 1.5rem;
		height: 1.5rem;
		transition: var(--fast);
		path {
			fill: var(--dangerDk);
			stroke-width: 1.5;
			stroke-linecap: round;
			stroke-linejoin: round;
		}
		&:hover {
			path {
				fill: var(--danger);
			}
		}
	}
`