import styled from 'styled-components'

export const CarouselContainer = styled.div`
	width: 100%;
	z-index: 1000;
	padding-bottom: var(--lg);
`

export const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 0 auto;
	color: var(--blkGreen);
`

export const CarouselWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: var(--lg) 0;
`

export const ChevronContainer = styled.div`
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: ${(props) =>
		props.$position === 'left' ? 'flex-start' : 'flex-end'};
	margin: ${(props) =>
		props.$position === 'left' ? '0 var(--lg) 0 0' : '0 0 0 var(--lg)'};
	width: fit-content;
	height: 100%;
	@media only screen and (max-width: 479px) {
		margin: ${(props) =>
			props.$position === 'left' ? '0 var(--xs) 0 0' : '0 0 0 var(--xs)'};
	}
`

export const BooksViewport = styled.div`
	overflow: hidden;
	flex: 1;
`

export const BooksWrapper = styled.div`
	display: flex;
	transition: transform 0.5s ease;
	transform: ${(props) =>
		props.$isEmpty
			? 'translateX(0)'
			: `translateX(${props.$offset * -100}%)`};
	width: ${(props) => (props.$isEmpty ? '100%' : 'auto')};
	justify-content: ${(props) => (props.$isEmpty ? 'center' : 'initial')};
`

export const BookPreview = styled.div`
	flex: 0 0 calc(100% / 5);
	position: relative;
	@media only screen and (max-width: 999px) {
		flex: 0 0 calc(100% / 4);
	}
	@media only screen and (max-width: 849px) {
		flex: 0 0 calc(100% / 3);
	}
	@media only screen and (max-width: 679px) {
		flex: 0 0 calc(100% / 2);
	}
`

export const ErrorMessage = styled.div`
	width: 100%;
	margin: 1rem auto;
	padding: var(--sm);
	background-color: var(--creamA);
	color: var(--mdBrown);
	border: 1px solid var(--creamB);
	border-radius: 0.25rem;
	text-align: center;
`
