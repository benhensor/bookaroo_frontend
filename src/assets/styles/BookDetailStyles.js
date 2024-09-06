import styled from 'styled-components';

export const BookDetailContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	max-width: 80rem;
	margin: 0 auto;
	@media only screen and (max-width: 999px) {
    padding: var(--sm) var(--md);
  }
  @media only screen and (max-width: 768px) {
    
  }
  @media only screen and (max-width: 450px) {
    padding: var(--sm);
  }
`

export const CloseButton = styled.button`
	background: none;
	border: none;
	outline: none;
	font-size: clamp(1.4rem, 2vw, 1.6rem);
	color: var(--dkGreen);
	cursor: pointer;
	transition: var(--fast);
	&:hover {
		color: var(--accentGreen);
	}
`

export const Title = styled.h1`
	font-size: clamp(2rem, 3vw, 3.2rem);
	color: var(--dkGreen);
`

export const Subtitle = styled.p`
	font-family: 'Roboto', sans-serif;
	font-size: clamp(1.6rem, 2vw, 2rem);
	span {
		font-weight: 700;
		color: var(--mdBrown);
	}
`

export const Row = styled.div`
	display: flex;
	width: 100%;
	margin-bottom: var(--lg);
`

export const BookDetailsContainer = styled.div`
	display: flex;
	justify-content: space-between;
	gap: var(--lg);
	margin-bottom: var(--lg);
	width: 100%;

	@media only screen and (max-width: 768px) {
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: var(--lg);
	}
`

export const BookInfoContainer = styled.div`
	width: 50%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: var(--xs);
	font-size: 1.4rem;
	@media only screen and (max-width: 768px) {
		width: 100%;
		div {
			margin-bottom: var(--sm);
		}
	}
`

export const BookInfo = styled.div`
	font-family: 'Roboto', sans-serif;
	color: var(--bgGreenB);
`

export const Category = styled.div`
	font-size: 1.2rem;
	margin-bottom: var(--sm);
	font-family: 'Roboto', sans-serif;
	color: var(--dkGreenA);

	.divide {
		color: var(--ltBrown);
	}
`

export const BookPreview = styled.div`
	width: 50%;
	display: flex;
	justify-content: center;
	align-items: center;

	@media only screen and (max-width: 768px) {
		width: 100%;
	}
`

export const BookCover = styled.img`
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px solid var(--ltGreen);
	width: 26rem;
`

export const BookDescription = styled.div`
	margin-bottom: var(--xl);
	border: 1px solid var(--ltGreen);
	padding: var(--lg);
	width: 100%;

	h3 {
		font-size: clamp(1.6rem, 2vw, 2rem);
		color: var(--mdBrown);
		margin-bottom: var(--lg);
	}

	p {
		font-size: clamp(1.2rem, 2vw, 1.4rem);
	}
`

export const OwnersNotes = styled.div`
	display: flex;
	flex-direction: column;
	border: 1px solid var(--ltGreen);
	padding: var(--lg);

	h3 {
		font-size: clamp(1.6rem, 2vw, 2rem);
		color: var(--mdBrown);
		margin-bottom: var(--lg);
	}

	span {
		color: var(--dkGreen);
	}

	blockquote {
		font-style: italic;
	}
`

export const ButtonContainer = styled.div`
	margin-top: var(--md);
`

export const ActionButton = styled.button`
  width: 100%;
	background-color: ${({ $delete }) => ($delete ? 'var(--dangerDk)' : 'var(--dkGreen)')};
	color: var(--white);
	padding: var(--sm) var(--md);
	font-size: clamp(1.2rem, 2vw, 1.4rem);
	border: none;
	display: inline-block;
	text-align: center;
	border-radius: var(--xs);
	cursor: pointer;
	&:hover {
		background-color: ${({ $delete }) => ($delete ? 'var(--danger)' : 'var(--accentGreen)')};
    color: ${({ $delete }) => ($delete ? 'var(--white)' : 'var(--blkGreen)')};
	}
`