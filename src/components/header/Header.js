import React, { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useMessages } from '../../context/MessagesContext'
import { useQueryClient } from 'react-query'
import Button from '../buttons/Button'
import Logo from '../../assets/images/bookarooLogo.webp'
import MenuIcon from '../../icons/MenuIcon'
import {
	Head,
	Container,
	LogoContainer,
	LogoBackground,
	UserControls,
	UserMenu,
	MenuItem,
	Notification,
} from '../../assets/styles/HeaderStyles'

export default function Header() {
	const { user, logout } = useAuth()
	const { messages } = useMessages()
	const navigate = useNavigate()
	const queryClient = useQueryClient()
	const [isOpen, setIsOpen] = useState(false)
	const unreadMessagesCount = messages?.filter(message => !message.isRead).length || 0


	const toggleMenu = useCallback(() => {
		setIsOpen((prevIsOpen) => !prevIsOpen)
	}, [])


	const handleEditProfile = () => {
		setIsOpen(false)
		navigate('/dashboard')
	}


	const handleLogout = () => {
		setIsOpen(false)
		queryClient.removeQueries('messages')
		logout()
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
					{!user && (
						<Button type="link" text="Login" to='/login' />
					)}
					<MenuIcon isOpen={isOpen} onClick={toggleMenu}/>
				</UserControls>
				
			</Container>
		{isOpen && (
			<UserMenu $isActive={isOpen}>
				<MenuItem>
					{user.username}
				</MenuItem>
				<MenuItem>
					<Button type="word" text="Messages" onClick={handleEditProfile} />
					{unreadMessagesCount > 0 &&
						<Notification>{unreadMessagesCount}</Notification>}
				</MenuItem>
				<MenuItem>
					<Button type="word" text="Edit Profile" onClick={handleEditProfile} />
				</MenuItem>
				<MenuItem>
					<Button type="word" text="Sign Out" onClick={handleLogout} />
				</MenuItem>
			</UserMenu>
		)}
		</Head>
	)
}

