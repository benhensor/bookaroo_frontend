import styled from 'styled-components';

export const MessagesContainer = styled.div`
	height: calc(100vh - 10rem);
	overflow-y: auto;
`

export const MessagesHeader = styled.div`
  padding: var(--lg) 0;
`

export const MessagingContainer = styled.div`
	border: 1px solid var(--ltGreen);
	display: flex;
	flex-direction: column;
	padding: var(--lg) 0;
	overflow: hidden;
	overflow-y: auto;
	h2 {
		padding-left: var(--lg);
		margin-bottom: var(--sm);
	}
	hr {
		margin: 0 var(--md);
		border: 1px solid var(--ltGreenHover);
	}
`

export const Feedback = styled.p`
	margin: 0 var(--lg);
	background-color: var(--creamA);
	padding: var(--sm);
	color: var(--mdBrown);
	text-align: center;
`