import styled, { keyframes } from 'styled-components';

export const BookContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	cursor: pointer;
`

export const BookCover = styled.div`
	height: calc(100% - 5rem);
	overflow: hidden;
	position: relative;
	width: 150px;
	max-height: 240px;
	img {
		aspect-ratio: auto 150 / 240;
		max-width: 100%;
		min-height: 240px;
		object-fit: cover;
		object-position: top;
	}
	@media only screen and (max-width: 450px) {
		width: 130px;
		max-height: 210px;
		img {
			min-height: 210px;
		}
	}
`

export const ContactedSash = styled.div`
	position: absolute;
	bottom: 2.5rem;
	left: 85%;
	transform: translateX(-50%);
	rotate: -45deg;
	transform-origin: bottom left;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 200px;
	height: 3rem;
	background-color: var(--dkGreen);
	color: var(--white);
	text-align: center;
	font-family: 'Roboto', sans-serif;
	font-size: 1.2rem;
`

export const BookCoverContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	overflow: hidden;
`

export const slideUpAnimation = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`

export const Controls = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: var(--sm);
	padding: var(--sm) 1.3rem;
	background-color: var(--white);
	visibility: ${(props) => (props.$isHovered ? 'visible' : 'hidden')};
	transform: translateY(${(props) => (props.$isHovered ? '0' : '100%')});
	transition: var(--fast);
	animation: ${(props) => (props.$isHovered ? slideUpAnimation : 'none')} 0.3s
		ease-out;
`

export const ButtonContainer = styled.div`
	max-width: 150px;
	display: flex;
	justify-content: center;
`

export const BookDetails = styled.div`
	z-index: 10000;
	width: 150px;
	margin-top: var(--sm);
	h3 {
		color: var(--dkGreenA);
		font-size: clamp(1.2rem, 2vw, 1.4rem);
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	p {
		color: var(--ltBrown);
		font-size: clamp(1rem, 2vw, 1.2rem);
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	span {
		color: var(--dkGreen);
	}
	@media only screen and (max-width: 450px) {
		width: 130px;
	}
`
