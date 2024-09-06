import styled from 'styled-components';

export const BrowseContainer = styled.div`
	height: 100%;
  overflow-y: scroll;
`

export const BrowseHeader = styled.div`
	position: fixed;
	top: 5.6rem;
	left: 0;
	padding: var(--lg) 0;
	background-color: var(--white);
	width: 100%;
	z-index: 100;
	box-shadow: ${(props) =>
		props.$isScrolled ? '0 5px 15px rgba(0, 0, 0, 0.3)' : 'none'};
	transition: var(--slow);
	@media only screen and (max-width: 999px) {
		padding: var(--sm) var(--md);
	}
	@media only screen and (max-width: 450px) {
		padding: var(--sm);
	}
`

export const BrowseControls = styled.div`
	max-width: 100rem;
	margin: 0 auto;
	h1 {
		margin-top: 2px;
	}
`

export const SearchBar = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	border-radius: var(--xs);
	label {
		display: flex;
		flex-direction: row;
		gap: none;
		width: 100%;
		align-items: center;
		border-radius: none;
	}
	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		border: 0;
	}
`

export const SearchInput = styled.input`
	max-width: 50rem;
	padding-right: 2.5rem; 
	border-radius: none;
`

export const SearchResults = styled.div`

	width: 100%;

`

export const ErrorMessage = styled.div`
  max-width: 100rem;
  margin: 1rem auto;
  padding: var(--sm);
  background-color: var(--creamA);
  color: var(--mdBrown);
  border: 1px solid var(--creamB);
  border-radius: 0.25rem;
  text-align: center;
`

export const GalleryContainer = styled.div`
	margin-top: 15rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
	@media only screen and (max-width: 999px) {
		margin-top: 10rem;
	}
	@media only screen and (max-width: 450px) {
		margin-top: 8rem;
	}
`


export const CarouselWrapper = styled.div`
  width: 100%;
  margin-bottom: var(--lg);
	@media only screen and (max-width: 450px) {
		margin-bottom: var(--sm);
	}
`