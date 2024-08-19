import styled from 'styled-components';

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
`

export const BookDetailsContainer = styled.div`
	display: flex;
	justify-content: space-between;
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
	max-width: 260px;
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
