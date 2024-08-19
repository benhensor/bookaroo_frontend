import styled from 'styled-components';


export const MessageContainer = styled.div`
  transition: var(--fast);
	p {
		font-family: 'Roboto', sans-serif;
		font-size: 1.4rem;
	}
`

export const StyledMessage = styled.div`
  padding: var(--sm) var(--lg);
  background-color: ${({ $isActive }) =>
    $isActive ? 'var(--ltGreenHover)' : 'none'};
  &:hover {
    background-color: var(--ltGreenHover);
  }
`

export const MessageContent = styled.div`
	border: 1px solid var(--ltGreen);
	display: flex;
  flex-direction: column;
	justify-content: space-between;
`

export const MessageBody = styled.div`
	display: flex;
	flex-direction: column;
	gap: var(--sm);
  padding: var(--lg);
  background-color: var(--white);
	p {
		font-size: 1.4rem;
		white-space: pre-wrap;
		word-break: break-word;
	}
	span {
		font-weight: bold;
		color: var(--dkGreen);
	}
`

export const MessageControls = styled.div`
  background-color: var(--dkGreenA);
	display: flex;
	justify-content: space-between;
  align-items: center;
	gap: var(--sm);
  padding: 0 var(--lg);
  div {
    display: flex;
    gap: var(--lg);
  }
`