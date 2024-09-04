import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background-color: var(--blkGreen);
  color: var(--white);
  text-align: center;
  margin: 0 auto;
  width: 100%;
  position: fixed;
  bottom: 0;
`

export const NavBar = styled.nav`
  max-width: 100rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  padding: var(--md) 0;
`

export const NavItem = styled.div`
  display: flex;
  align-items: center;
`