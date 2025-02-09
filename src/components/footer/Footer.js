import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { useDashboard } from '../../context/DashboardContext'
import Browse from '../../icons/Browse'
import Listings from '../../icons/Listings'
import Messages from '../../icons/Messages'
import Profile from '../../icons/Profile'
import { Container, NavBar, NavItem } from '../../assets/styles/FooterStyles'

export default function Footer() {
	const { user, isAuthenticated } = useAuth()

	const { activePage, handlePageChange } = useDashboard()

	return (
		<>
			{!user || !isAuthenticated ? null : (
				<Container>
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
				</Container>
			)}
		</>
	)
}
