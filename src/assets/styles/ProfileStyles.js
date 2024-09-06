import styled from 'styled-components';

export const ProfileContainer = styled.div`
	height: calc(100vh - 5.6rem);
`

export const ProfileHeader = styled.div`
  padding: var(--lg) 0;
`

export const ProfileMenuItem = styled.div`
  display: flex;
	flex-direction: column;
  align-items: flex-start;
	width: 100%;
	overflow: hidden;
	border-bottom: ${({ $isVisible }) => ($isVisible ? 'none' : '1px solid var(--ltGreen)')};
  margin-bottom: var(--sm);
	transition: var(--fast);
`

export const ProfileMenuItemHeading = styled.button`
  width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: none;
	border: none;
	outline: none;
  font-family: 'Poppins', sans-serif;
	text-align: left;
	color: ${({ $isVisible }) => ($isVisible ? 'var(--dkGreen)' : 'var(--mdBrown)')};
	overflow: hidden;
	position: relative;
	cursor: pointer;
`

export const ProfileMenuItemContent = styled.div`
  width: 100%;
  max-height: ${({ $isVisible }) => ($isVisible ? 'fit-content' : '0')}; 
	opacity: ${({ $isVisible }) => ($isVisible ? '1' : '0')}; 
	overflow: hidden;
  padding: ${({ $isVisible }) => ($isVisible ? '2rem 0' : '0 0 1rem 0')};
	line-height: 1.6;
  color: var(--mdBrown);
  transition: all .3s;
`

export const MenuContentPanel = styled.div`
	border: 1px solid var(--ltGreen);
  padding: var(--lg);
  background-color: ${({ $signOut }) => ($signOut ? 'creamA' : 'var(--white)')};
	@media only screen and (max-width: 768px) {
		padding: var(--md);
	}
`

export const DropdownHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
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

export const MessagingContainer = styled.div`
	border: 1px solid var(--ltGreen);
	display: flex;
	flex-direction: column;
	padding: var(--lg);
	overflow: hidden;
	overflow-y: auto;
	h2 {
		margin-bottom: var(--sm);
	}
	hr {
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

export const CarouselContainer = styled.div`
	position: relative;
	background-color: var(--offWhite);
`