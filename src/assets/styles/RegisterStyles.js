import styled from 'styled-components';

export const P = styled.p`
margin-top: var(--sm);
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