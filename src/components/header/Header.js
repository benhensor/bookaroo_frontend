import React, { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useQueryClient } from 'react-query'
import { useWindowWidth } from '../../utils/useWindowWidth'
import LogoIcon from '../../icons/LogoIcon'
import MenuIcon from '../../icons/MenuIcon'
import {
	Head,
	Container,
	LogoContainer,
	LogoImage,
	UserControls,
	NavItem,
	UserMenu,
	MenuItem,
	SignInButton,
	SignOutButton,
} from '../../assets/styles/HeaderStyles'

export default function Header() {
	const { user, logout } = useAuth()
	const navigate = useNavigate()
	const queryClient = useQueryClient()
	const [isOpen, setIsOpen] = useState(false)

	const mobile = useWindowWidth() < 768

	const toggleMenu = useCallback(() => {
		setIsOpen((prev) => !prev)
	}, [])


	const handleLogout = () => {
		queryClient.removeQueries('messages')
		logout()
		setIsOpen(false)
		navigate('/')
	}


	return (
		<Head>
			<Container>
				<LogoContainer>
					<LogoImage>
						<LogoIcon />
					</LogoImage>
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
						<SignInButton
							to='/login'
						>
							Sign In
						</SignInButton>
					)}
				</UserControls>
				
			</Container>
		{isOpen && (
			<UserMenu $isActive={isOpen}>
				<MenuItem>
					<SignOutButton onClick={handleLogout}>
						Sign Out
					</SignOutButton>
				</MenuItem>
			</UserMenu>
		)}
		</Head>
	)
}