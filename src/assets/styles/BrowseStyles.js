import styled from 'styled-components';

export const Controls = styled.div`
	position: fixed;
	top: 5.8rem;
	width: 100%;
	max-height: 100%;
	z-index: 100;
	background-color: var(--white);
	padding-top: var(--lg);
	box-shadow: ${(props) =>
		props.$isScrolled ? '0 5px 5px rgba(0, 0, 0, 0.1)' : 'none'};
	transition: var(--slow);
	@media only screen and (max-width: 999px) {
		padding: var(--sm) var(--md);
	}
	@media only screen and (max-width: 450px) {
		padding: var(--sm);
	}
`

export const SearchBar = styled.div`
	max-width: 100rem;
	width: 100%;
	margin: 0 auto var(--lg) auto;
	display: flex;
	justify-content: center;
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
	width: 100%;
	padding-right: 2.5rem; /* Adds space for the icon */
	border-radius: none;
`

export const SearchResults = styled.div`
	max-width: 100rem;
	margin: 0 auto;
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

export const Display = styled.div`
  transition: max-height 0.5s ease, opacity 0.5s ease;

  overflow: hidden;
`
