import styled from 'styled-components';

export const DashboardContainer = styled.div`
	height: calc(100vh - 5.8rem);
	width: 100%;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
`

export const DashboardContent = styled.section`
	width: 100%;
	overflow-y: auto;
`

export const DashboardHeader = styled.div`
	max-width: 100rem;
	width: 100%;
	margin: 0 auto;
	padding: var(--lg) 0 0 0;
	@media only screen and (max-width: 999px) {
		padding: var(--sm) var(--md) 0 var(--md);
	}
	@media only screen and (max-width: 450px) {
		padding: var(--sm) var(--sm) 0 var(--sm);
	}
`

export const DashboardControls = styled.div`
	display: flex;
`

export const PageContainer = styled.div`
	flex-grow: 1;
	overflow-y: auto;
	display: flex;
	flex-direction: column;
	@media only screeen and (max-width: 999px) {
		padding: var(--sm) var(--md);
	}
	@media only screeen and (max-width: 450px) {
		padding: var(--sm);
	}
`

export const NavItem = styled.div`
	display: flex;
	align-items: center;
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

export const Options = styled.div`
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
	background-color: var(--offWhite);
`
