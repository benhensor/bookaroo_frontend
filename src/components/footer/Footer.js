import React from 'react'
import styled from 'styled-components'
import Browse from '../../icons/Browse'
import Listings from '../../icons/Listings'
import Messages from '../../icons/Messages'
import LogOut from '../../icons/LogOut'

export default function Footer() {

  const handleClick = () => {
    console.log('Footer clicked')
  }

  
  return (
    <FooterContainer>
      <NavBar>
        <NavItem>
          <Browse
            onClick={handleClick}
          />
        </NavItem>
        <NavItem>
          <Listings
            onClick={handleClick}
          />
        </NavItem>
        <NavItem>
          <Messages
            onClick={handleClick}
          />
        </NavItem>
        <NavItem>
          <LogOut
            onClick={handleClick}
          />
        </NavItem>
      </NavBar>
    </FooterContainer>
  )
}

const FooterContainer = styled.footer`
  background-color: var(--blkGreen);
  color: var(--white);
  padding: var(--lg) var(--md);
  text-align: center;
  width: 100%;
  position: fixed;
  bottom: 0;
`

const NavBar = styled.nav`
  max-width: 100rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
`

const NavItem = styled.div`
  display: flex;
  align-items: center;
`