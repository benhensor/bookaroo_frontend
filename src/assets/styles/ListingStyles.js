import styled from 'styled-components';

export const Block = styled.div`
	width: fit-content;
	margin: 0 auto var(--lg) auto;
	border: 1px solid var(--greyGreen);
	padding: var(--lg);
	@media only screen and (max-width: 450px) {
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