import React from 'react'
import Browse from '../../icons/Browse'
import Listings from '../../icons/Listings'
import Messages from '../../icons/Messages'
import LogOut from '../../icons/LogOut'
import { 
  FooterContainer,
  NavBar,
  NavItem,
} from '../../assets/styles/FooterStyles'

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