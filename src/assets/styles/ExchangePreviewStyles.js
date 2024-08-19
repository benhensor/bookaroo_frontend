import styled from 'styled-components';

export const BookContainer = styled.div`
	display: block;
	cursor: pointer;
`

export const BookCover = styled.div`
	width: 260px;
	max-height: 400px;
	margin-bottom: var(--sm);
	img {
		aspect-ratio: auto 260 / 400;
		max-width: 100%;
		height: 400px;
		object-fit: cover;
		object-position: top;
	}
`

export const BookDetails = styled.div`
	width: 260px;
	padding-top: var(--sm);
	h3 {
		color: var(--dkGreenA);
		font-size: clamp(1.2rem, 2vw, 1.6rem);
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	p {
		color: var(--ltBrown);
		font-size: clamp(1rem, 2vw, 1.4rem);
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
`