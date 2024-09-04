import styled from 'styled-components';

export const GalleryContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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

export const CarouselWrapper = styled.div`
  width: 100%;
  margin-bottom: var(--lg);
`