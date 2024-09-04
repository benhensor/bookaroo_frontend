import React from 'react'
import Browse from '../../icons/Browse'
import Listings from '../../icons/Listings'
import Messages from '../../icons/Messages'
import Profile from '../../icons/Profile'
import {
	FooterContainer,
	NavBar,
	NavItem,
} from '../../assets/styles/FooterStyles'

export default function Footer({ handlePageChange, activePage }) {
	// const handleClick = () => {
	//   console.log('Footer clicked')
	// }

	return (
		<FooterContainer>
			<NavBar>
				<NavItem onClick={() => handlePageChange('Browse')}>
					<Browse isActive={activePage === 'Browse'} />
				</NavItem>
				<NavItem onClick={() => handlePageChange('Listings')}>
					<Listings isActive={activePage === 'Listings'} />
				</NavItem>
				<NavItem onClick={() => handlePageChange('Messages')}>
					<Messages isActive={activePage === 'Messages'} />
				</NavItem>
				<NavItem onClick={() => handlePageChange('Profile')}>
					<Profile isActive={activePage === 'Profile'} />
				</NavItem>
			</NavBar>
		</FooterContainer>
	)
}
