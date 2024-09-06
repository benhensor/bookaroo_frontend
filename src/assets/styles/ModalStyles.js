import styled from 'styled-components';

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 15rem 0;
  z-index: 1000;
  width: 100%;
  height: 100svh;
  margin: 0 auto;
  background-color: var(--white);
  overflow-y: auto;
  @media only screen and (max-width: 768px) {
    padding: 7rem 0;
  }
`