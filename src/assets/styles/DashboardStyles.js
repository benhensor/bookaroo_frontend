import styled from 'styled-components';

export const DashboardHeader = styled.div`
	display: flex;
	flex-direction: column;
	padding-top: var(--lg);
`

export const Container = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: var(--sm);
	margin-bottom: var(--lg);
	@media only screen and (max-width: 768px) {
		flex-direction: column;
	}
`

export const Details = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	border: 1px solid var(--ltGreen);
	padding: var(--lg);
	p {
		display: flex;
		align-items: center;
		&:last-child {
			margin-bottom: 0;
		}
	}
	span {
		color: var(--dkGreen);
		font-weight: bold;
	}
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

export const Controls = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: var(--xs);
	margin: var(--sm) 0 0 0;
	button {
		color: var(--dkGreen);
		font-size: 1.6rem;
		text-align: left;
		padding: 0;
		border-radius: 0;
		background: none;
	}
`

export const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-bottom: var(--sm);
	border-bottom: 1px solid var(--ltGreen);
`

export const Dropdown = styled.div`
	position: ${({ $position }) => $position};
	top: ${({ $top }) => $top};
	left: ${({ $left }) => $left};
	transform: ${({ $transform }) => $transform};
	width: ${({ $width }) => $width};
	z-index: ${({ $isClicked }) => ($isClicked ? '1000' : '-1')};
	overflow: hidden;
	max-height: ${({ $isClicked }) =>
		$isClicked
			? 'auto'
			: '0'}; /* Set a reasonable max-height for the open state */
	opacity: ${({ $isClicked }) => ($isClicked ? '1' : '0')};
	padding: ${({ $padding }) => $padding};
	box-shadow: ${({ $boxShadow }) => $boxShadow};
	display: flex;
	flex-direction: column;
	margin-top: var(--lg);
	border: ${({ $border }) => $border};
	border-radius: var(--xs);
	background: #fff;
	transition: all 2s ease, opacity 0.3s ease, padding 0.3s ease;
	@media only screen and (max-width: 450px) {
		width: 100%;
		border-radius: 0;
	}
`

export const CarouselContainer = styled.div`
	position: relative;
`
