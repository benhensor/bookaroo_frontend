import styled from 'styled-components';

export const ListingsContainer = styled.div`
  height: calc(100vh - 5.6rem);
`

export const ListingsHeader = styled.div`
  padding: var(--lg) 0;
  @media only screen and (max-width: 999px) {
		padding: var(--sm) var(--md);
	}
	@media only screen and (max-width: 450px) {
		padding: var(--sm);
	}
`

export const Block = styled.div`
  display: flex;
	border: 1px solid var(--greyGreen);
	padding: var(--lg);
  margin-bottom: var(--sm);
	@media only screen and (max-width: 450px) {
		width: 100%;
	}
`

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: var(--sm);
	width: 40rem;
	overflow-x: hidden;
  label {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: var(--sm);
		font-size: clamp(1rem, 2vw, 1.4rem);
		margin-bottom: var(--xs);
    overflow: hidden;
	}
  input, select, textarea {
  width: 100%;
  padding: var(--sm);
  font-size: clamp(1.2rem, 2vw, 1.4rem);
  border: 1px solid #ccc;
  border-radius: var(--xs);
  transition: border-color 0.3s ease; /* Smooth transition for border color */
  
  &:focus {
    outline: none;
    border-color: var(--accentGreen); /* Default focus state color */
  }
  
  &.valid {
    border-color: var(--accentGreen); /* Valid state */
  }

  &.error {
    border-color: var(--softRed); /* Error state */
  }

  &.error::placeholder {
    color: var(--softRed); /* Error state placeholder color */
  }
}

  select, option {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  textarea {
    resize: vertical;
    height: 150px;
  }
	@media only screen and (max-width: 768px) {
    width: 100%;
	}
`

export const ErrorMessage = styled.p`
	color: red;
	font-weight: bold;
	margin-top: 10px;
`

export const SuccessMessage = styled.div`
  max-width: 100rem;
  margin: var(--sm) auto;
  padding: var(--sm);
  background-color: var(--creamA);
  color: var(--mdBrown);
  border: 1px solid var(--creamB);
  border-radius: var(--xs);
  text-align: center;
`