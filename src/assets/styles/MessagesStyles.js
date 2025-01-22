import styled from 'styled-components';

export const MessagesContainer = styled.div`
	height: calc(100svh - 10rem);
	overflow-y: auto;
	display: flex;
	flex-direction: column;
`

export const MessagesHeader = styled.div`
  padding: var(--lg) 0;
	@media only screen and (max-width: 999px) {
		padding: var(--md) 0;
	}
	@media only screen and (max-width: 450px) {
		padding: var(--sm) 0;
	}
`

export const MessagingContainer = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	overflow-y: auto;
	min-height: 0;
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