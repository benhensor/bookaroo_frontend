import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background-color: var(--blkGreen);
  color: var(--white);
  margin: 0 auto;
  width: 100%;
  min-height: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
`

export const NavBar = styled.nav`
  max-width: 100rem;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

export const NavItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`