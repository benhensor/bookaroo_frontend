import React, { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useMessages } from '../../context/MessagesContext'
import { useDashboard } from '../../context/DashboardContext'
import { useQueryClient } from 'react-query'
import { useWindowWidth } from '../../utils/useWindowWidth'
import LinkButton from '../buttons/LinkButton'
import Button from '../buttons/Button'
import Logo from '../../assets/images/bookarooLogo.webp'
import MenuIcon from '../../icons/MenuIcon'
import Profile from '../../icons/Profile'
import {
	Head,
	Container,
	LogoContainer,
	LogoBackground,
	UserControls,
	NavItem,
	UserMenu,
	MenuItem,
	Notification,
} from '../../assets/styles/HeaderStyles'

export default function Header() {
	const { user, logout } = useAuth()
	const { messages } = useMessages()
	const { setActivePage } = useDashboard()
	const navigate = useNavigate()
	const queryClient = useQueryClient()
	const [isOpen, setIsOpen] = useState(false)
	const unreadMessagesCount = messages?.filter(message => !message.isRead).length || 0

	const mobile = useWindowWidth() < 768

	// debugging
	// useEffect(() => {
	// 	if (user) {
	// 		console.log(`${user.username} is still logged in`, user, isAuthenticated)
	// 	}
	// }, [user, isAuthenticated])


	const toggleMenu = useCallback(() => {
		setIsOpen((prev) => !prev)
	}, [])


	const handleLogout = () => {
		console.log('Logging out...')
		queryClient.removeQueries('messages')
		logout()
		setIsOpen(false)
		navigate('/')
	}


	return (
		<Head>
			<Container>
				<LogoContainer>
					<LogoBackground>
						<img src={Logo} alt="Bookaroo" />
					</LogoBackground>
					<p>Bookaroo</p>
				</LogoContainer>
				<UserControls>
					{!mobile && user && (
						<>
							<NavItem
								onClick={toggleMenu}
							>
								{user.username}
							</NavItem>
						</>
					)}
					{mobile && user && (
						<MenuIcon isOpen={isOpen} onClick={toggleMenu}/>
					)}
					{!user && (
						<Button id="link" text="Login" to='/login' />
					)}
				</UserControls>
				
			</Container>
		{isOpen && (
			<UserMenu $isActive={isOpen}>
				<MenuItem>
					<Button id="word" text="Sign Out" onClick={handleLogout} />
				</MenuItem>
			</UserMenu>
		)}
		</Head>
	)
}

