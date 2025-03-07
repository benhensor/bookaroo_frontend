import React from 'react'
import { useMessages } from '../context/MessagesContext'
import styled from 'styled-components'

export default function Messages({ isActive }) {
	const { messages } = useMessages()
	const unreadMessagesCount =
		messages?.filter((message) => !message.is_read).length || 0
	return (
		<Container $isactive={isActive}>
			{unreadMessagesCount > 0 &&
				<div className="unread-count">
				{unreadMessagesCount}
			</div>
			}
			<svg
				width="800px"
				height="800px"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M8 9.5H15M8 13.5H13M3.00003 11.5C2.99659 12.8199 3.30496 14.1219 3.90003 15.3C4.6056 16.7118 5.69028 17.8992 7.03258 18.7293C8.37488 19.5594 9.92179 19.9994 11.5 20C12.8199 20.0035 14.1219 19.6951 15.3 19.1L21 21L19.1 15.3C19.6951 14.1219 20.0035 12.8199 20 11.5C19.9994 9.92179 19.5594 8.37488 18.7293 7.03258C17.8992 5.69028 16.7118 4.6056 15.3 3.90003C14.1219 3.30496 12.8199 2.99659 11.5 3.00003H11C8.91568 3.11502 6.94699 3.99479 5.47089 5.47089C3.99479 6.94699 3.11502 8.91568 3.00003 11V11.5Z" />
			</svg>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	.unread-count {
		position: absolute;
		top: -0.5rem;
		right: -0.5rem;
		background-color: var(--dangerDk);
		color: var(--white);
		border-radius: 50%;
		width: 2rem;
		height: 2rem;
		display: flex;
		justify-content: center;
		align-items: center;
		font-family: 'Centra', sans-serif;
		font-size: 1.2rem;
	}
	svg {
		width: 3rem;
		height: 3rem;
		transition: var(--fast);
		path {
			stroke: ${(props) =>
				props.$isactive ? 'var(--accentGreen)' : 'var(--white)'};
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
