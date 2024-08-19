import styled from 'styled-components';

export const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

export const Info = styled.div`
max-width: 40rem;
margin-bottom: var(--lg);
text-align: center;
h1 {
  font-size: clamp(2rem, 4vw, 3.2rem);
  margin-bottom: var(--md);
}
p {
  font-size: clamp(1.2rem, 2.5vw, 1.6rem);
  margin-bottom: var(--md);
}
@media only screen and (max-width: 768px) {
  max-width: 35rem;
}
@media only screen and (max-width: 450px) {
  max-width: 30rem;
}
`