import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useDashboard } from '../context/DashboardContext'
import Browse from '../components/displays/Browse'
import Listings from '../components/displays/Listings'
import Messages from '../components/displays/Messages'
import Profile from '../components/displays/Profile'
import Modal from '../components/modal/Modal'
import Footer from '../components/footer/Footer'
import { DashboardContainer, MessageContainer } from '../assets/styles/DashboardStyles'

export default function Dashboard() {
	const { user, isAuthenticated, isLoading } = useAuth()
	const { activePage, handlePageChange } = useDashboard()

	const renderActiveDisplay = () => {
		switch (activePage) {
			case 'Browse':
				return <Browse />
			case 'Listings':
				return <Listings />
			case 'Messages':
				return <Messages />
			case 'Profile':
				return <Profile />
			default:
				return <Profile />
		}
	}

	if (isLoading) {
		return (
			<DashboardContainer>
				<MessageContainer>Loading...</MessageContainer>
			</DashboardContainer>
		)
	}

	if (!user || !isAuthenticated)
		return (
			<DashboardContainer>
				<MessageContainer>No user data available</MessageContainer>
			</DashboardContainer>
		)

	return (
		<>
			<DashboardContainer>
				{renderActiveDisplay()}
				<Modal />
				<Footer handlePageChange={handlePageChange} />
			</DashboardContainer>
		</>
	)
}
