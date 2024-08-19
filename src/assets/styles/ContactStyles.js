import styled from 'styled-components';

export const Layout = styled.div`
	margin-top: var(--lg);
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	gap: 10%;
	@media only screen and (max-width: 768px) {
		flex-direction: column;
		align-items: center;
		gap: var(--lg);
	}
`

export const ContactFormContainer = styled.div`
	width: 100%;
	height: 100%;
`

export const ContactForm = styled.div`
	border: 1px solid var(--ltGreen);
	padding: 0 var(--lg) var(--lg) var(--lg);
	height: 100%;
`

export const FormHeader = styled.div`
	font-weight: bold;
	background-color: var(--ltGreen);
	padding: var(--sm) var(--lg);
`

export const FormField = styled.div`
	display: flex;
	align-items: center;
	border-bottom: 1px solid var(--ltGreen);

	label {
		width: var(--lg);
		font-weight: bold;
	}

	input {
		flex: 1;
		border: none;
		outline: none;
	}
`

export const MessageArea = styled.textarea`
	width: 100%;
	height: 30rem;
	padding: var(--sm) 0;
	border: none;
	outline: none;
	resize: vertical;
	font-family: inherit;
	border-bottom: 1px solid var(--ltGreen);
	margin-bottom: var(--md);
`
