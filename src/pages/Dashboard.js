import React, { useRef, useState, useEffect, useCallback } from 'react'
import { useAuth } from '../context/AuthContext'
import { useUser } from '../context/UserContext'
import { useBooks } from '../context/BooksContext'
import { useMessages } from '../context/MessagesContext'
import { categories } from '../utils/categories'
import CollapsibleItem from '../components/dashboard/CollapsibleItem'
import Genre from '../components/dashboard/Genre'
import Message from '../components/message/Message'
import Carousel from '../components/carousel/Carousel'
import ProfileControls from '../components/controls/ProfileControls'
import ListingControls from '../components/controls/ListingControls'
import MessageControls from '../components/controls/MessageControls'
import BrowseControls from '../components/controls/BrowseControls'
import BooksGallery from '../components/books/BooksGallery'
import BookDetail from '../components/books/BookDetail'
import Listing from '../components/listing/Listing'
import DashboardButton from '../components/buttons/DashboardButton'
import Footer from '../components/footer/Footer'
import {
	DashboardContainer,
	DashboardContent,
	PageContainer,
	DashboardHeader,
	DashboardControls,
	MessagingContainer,
	Feedback,
	Options,
	Dropdown,
	Header,
	CarouselContainer,
} from '../assets/styles/DashboardStyles'



export default function Dashboard() {
	const { user, isAuthenticated, isLoading } = useAuth()
	const { likedBooks, likedBooksLoading, updateUserPreferences, updateUserDetails } = useUser()
	const { usersBooks, recommendations, loading } = useBooks()
	const { messages, isMessagesLoading, isError, markAsRead, refreshMessages } = useMessages()
	const [activePage, setActivePage] = useState('Profile')
	const [activeDropdown, setActiveDropdown] = useState(false)
	const [selectedPreferences, setSelectedPreferences] = useState([])
	const [openMessage, setOpenMessage] = useState(null)
	const userDetailsRef = useRef(null)
	const preferencesRef = useRef(null)
	const likedRef = useRef(null)
	const messagesRef = useRef(null)



	const [formValues, setFormValues] = useState({
		username: '',
		email: '',
		phone: '',
		addressLine1: '',
		addressLine2: '',
		city: '',
		postcode: '',
	})
	


	useEffect(() => {
		if (user) {
			refreshMessages()
		}
	}, [user, refreshMessages])



	useEffect(() => {
		if (user) {
			setSelectedPreferences(user.preferences || [])
			setFormValues({
				username: user.username || '',
				email: user.email || '',
				phone: user.phone || '',
				addressLine1: user.addressLine1 || '',
				addressLine2: user.addressLine2 || '',
				city: user.city || '',
				postcode: user.postcode || '',
			})
		}
	}, [user])



	const handlePageChange = (page) => {
		setActivePage(page)
	}


	const renderActivePage = () => {
		switch (activePage) {
			case 'Browse':
				return (
					<BooksGallery />
				)
			case 'Listings':
				return (
					<Listing />
				)
			case 'Messages':
				return renderMessages()
			case 'Profile':
				return renderProfile()
			default:
				return renderProfile()
		}
	}


	const renderActiveControls = () => {
		switch (activePage) {
			case 'Browse':
				return (
					<BrowseControls />
				)
			case 'Listings':
				return (
					<ListingControls />
				)
			case 'Messages':
				return (
					<MessageControls />
				)
			case 'Profile':
				return (
					<ProfileControls />
				)
			default:
				return (
					<></>
				)
		}
	}



	

	const renderBrowse = () => {
		return (
			<BooksGallery />
		)
	}


	const renderListings = () => {
		return (
			<Listing />
		)
	}


	const renderProfile = () => {
		return null
	}



	const handleInputChange = (e) => {
		const { name, value } = e.target
		setFormValues((prevValues) => ({
			...prevValues,
			[name]: value,
		}))
	}



	const handleSaveUserDetails = useCallback(() => {
		if (!user) return

		const { username, email, phone, addressLine1, city, postcode } =
			formValues

		if (
			!username ||
			!email ||
			!phone ||
			!addressLine1 ||
			!city ||
			!postcode
		) {
			console.log('Missing required fields') // Debugging log
			setActiveDropdown(null)
			return
		}

		updateUserDetails(formValues)
			.then(() => {
				setActiveDropdown(false)
			})
			.catch((error) => {
				console.error('Error updating user details:', error)
			})
	}, [formValues, updateUserDetails, user])



	const handleGenreSelect = (genre) => {
		setSelectedPreferences((prevPreferences) => {
			if (prevPreferences.includes(genre)) {
				return prevPreferences.filter((g) => g !== genre)
			} else {
				return [...prevPreferences, genre]
			}
		})
	}



	const handleSavePreferences = useCallback(() => {

		if (!user) {
			console.log('No user found') // Debugging log
			setActiveDropdown(false)
			return
		}

		const currentPreferences = user.preferences || [] 

		const preferencesChanged =
			JSON.stringify(selectedPreferences) !==
			JSON.stringify(currentPreferences)

		if (!preferencesChanged) {
			setActiveDropdown(false)
			return
		}

		updateUserPreferences(selectedPreferences)
			.then(() => {
				setActiveDropdown(false)
			})
			.catch((error) => {
				console.error('Error saving preferences:', error)
			})
	}, [selectedPreferences, updateUserPreferences, user])



	const handleToggleDropdown = (dropdownName) => {
		if (activeDropdown === dropdownName) {
			setActiveDropdown(false)
		} else {
			setActiveDropdown(dropdownName)
		}
	}



	const toggleMessage = (messageId) => {
		markAsRead(messageId)
		setOpenMessage(openMessage === messageId ? null : messageId)
	}



	const renderCarousel = (books, title, loading) => {
		if (loading) {
			return <CarouselContainer>Loading...</CarouselContainer>
		}

		return (
			<CarouselContainer>
				<Carousel books={books} title={title} />
			</CarouselContainer>
		)
	}



	const renderMessages = () => {
		if (isMessagesLoading) {
			return <MessagingContainer><Feedback>Loading messages...</Feedback></MessagingContainer>
		}

		if (isError) {
			return <MessagingContainer><Feedback>Error loading messages. Please try again later.</Feedback></MessagingContainer>
		}

		if (!messages || messages.length === 0) {
			return <MessagingContainer><Feedback>No messages to display.</Feedback></MessagingContainer>
		}
		
		return (
			<MessagingContainer>
				<h2>Messages</h2>
				{messages?.map((message, i) => (
					<div key={message.id}>
						{i === 0 && <hr />}
						<Message
							message={message}
							isOpen={openMessage === message.id}
							onToggle={() => toggleMessage(message.id)}
						/>
						{messages.length > 1 ? (
							<hr />
						) : (
							''
						)}
					</div>
				))}
			</MessagingContainer>
		)
	}
	
	const unreadMessagesCount = messages?.filter(message => !message.isRead).length || 0

	
	
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
				
				<DashboardHeader>
					<h1>{activePage}</h1>
				</DashboardHeader>

				<DashboardControls>
					{renderActiveControls()}
				</DashboardControls>

				<DashboardContent>

					<PageContainer>
						{renderActivePage()}
					</PageContainer>
					
				</DashboardContent>
				<Footer handlePageChange={handlePageChange} activePage={activePage} />
			</DashboardContainer>
		</>
	)
}