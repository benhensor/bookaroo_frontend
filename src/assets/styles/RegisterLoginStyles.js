import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 5.6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`

export const Content = styled.div`
	width: 100%;
  max-width: 40rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: var(--lg);
  @media only screen and (max-width: 768px) {
    gap: var(--md);
  }
`

export const P = styled.p`
  margin-top: var(--sm);
  font-size: clamp(1.2rem, 2vw, 1.4rem);
  display: flex;
`

export const InputGroup = styled.div`
position: relative;
display: flex;
flex-direction: column;
margin-bottom: var(--sm);
&:last-of-type {
  margin-bottom: var(--lg);
}
`

export const Error = styled.p`
  position: absolute;
  top: 100%;
  width: 100%;
  text-align: right;
  font-family: 'Roboto', sans-serif;
  font-size: var(--fs-xxs);
  color: var(--danger);
`