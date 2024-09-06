import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useDashboard } from '../context/DashboardContext'
import Browse from '../components/displays/Browse'
import Listings from '../components/displays/Listings'
import Messages from '../components/displays/Messages'
import Profile from '../components/displays/Profile'
import Modal from '../components/modal/Modal'
import Footer from '../components/footer/Footer'
import { DashboardContainer } from '../assets/styles/DashboardStyles'

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
			<section>
				<div>Loading...</div>
			</section>
		)
	}

	if (!user || !isAuthenticated)
		return (
			<section>
				<div>No user data available</div>
			</section>
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
