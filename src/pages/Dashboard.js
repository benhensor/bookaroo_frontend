import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useDashboard } from '../context/DashboardContext'
import Browse from '../components/displays/Browse'
import Listing from '../components/displays/Listing'
import Messages from '../components/displays/Messages'
import Profile from '../components/displays/Profile'
import BookDetail from '../components/books/BookDetail'
import Footer from '../components/footer/Footer'
import {
	DashboardContainer,
	DashboardContent,
	PageContainer,
} from '../assets/styles/DashboardStyles'



export default function Dashboard() {
	const { user, isAuthenticated, isLoading } = useAuth()
	const { activePage, handlePageChange } = useDashboard()


	const renderActiveDisplay = () => {
		switch (activePage) {
			case 'Browse':
				return (
					<Browse />
				)
			case 'Listings':
				return (
					<Listing />
				)
			case 'Messages':
				return (
					<Messages />
				)
			case 'Profile':
				return (
					<Profile />
				)
			default:
				return (
					<Profile />
				)
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
				<DashboardContent>
					<PageContainer>
						{renderActiveDisplay()}
					</PageContainer>			
				</DashboardContent>
				<Footer handlePageChange={handlePageChange} />
			</DashboardContainer>
		</>
	)
}