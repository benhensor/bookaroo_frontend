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
import LinkButton from '../components/buttons/LinkButton'
import DashboardButton from '../components/buttons/DashboardButton'
import {
	Container,
	DashboardHeader,
	Details,
	MessagingContainer,
	Feedback,
	Controls,
	Dropdown,
	Header,
	CarouselContainer,
} from '../assets/styles/DashboardStyles'



export default function Dashboard() {
	const { user, isAuthenticated, isLoading } = useAuth()
	const { likedBooks, likedBooksLoading, updateUserPreferences, updateUserDetails } = useUser()
	const { usersBooks, recommendations, loading } = useBooks()
	const { messages, isMessagesLoading, isError } = useMessages()
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
		if (likedBooks) {
			// console.log(`${user.username} logged in`, user, isAuthenticated)
			console.log(`liked books in dashboard:`, likedBooks)
		}
	}, [likedBooks])

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
				
			</MessagingContainer>
		)
	}
	
	const unreadMessagesCount = messages?.filter(message => !message.isRead).length || 0

	// useEffect(() => {
	// 	console.log('Dashboard Render:');
	// 	console.log('User:', user);
	// 	console.log('IsAuthenticated:', isAuthenticated);
	// 	console.log('IsLoading:', isLoading);
	// }, [user, isAuthenticated, isLoading]);
	
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
		<section>
			<Container>
				<DashboardHeader>
					<h1>Dashboard</h1>
					<CollapsibleItem
						onClick={() => handleToggleDropdown('userDetails')}
						isActive={activeDropdown === 'userDetails'}
						text={`Welcome ${user.username}!`}
					>
						<Dropdown
							ref={userDetailsRef}
							$isClicked={activeDropdown === 'userDetails'}
							$position="absolute"
							$top="100%"
							$left="0"
							$transform="none"
							$width="fit-content"
							$padding="var(--sm)"
							$boxShadow="0 0 1rem rgba(0, 0, 0, 0.2)"
							$border="1px solid var(--ltGreen)"
						>
							<Header>
								<h3>Update your details...</h3>
								<DashboardButton
									text="Done"
									onClick={handleToggleDropdown}
								/>
							</Header>
							<form>
								<label htmlFor='username'>Username</label>
								<input
									type="text"
									name="username"
									value={formValues.username}
									onChange={handleInputChange}
									required
								/>
								<label htmlFor='email'>Email</label>
								<input
									type="email"
									name="email"
									value={formValues.email}
									onChange={handleInputChange}
									required
								/>
								<label htmlFor='postcode'>Location</label>
								<input
									type="text"
									name="postCode"
									value={formValues.postcode}
									onChange={handleInputChange}
									required
								/>
								<DashboardButton
									type="action"
									text="Submit"
									onClick={handleSaveUserDetails}
								>
									Save
								</DashboardButton>
							</form>
						</Dropdown>
					</CollapsibleItem>
				</DashboardHeader>

				<Details>
					<h2>Controls</h2>
					<Controls>
						{/* Browse available books */}
						<LinkButton
							to="/browse"
							text="Browse"
						/>

						{/* List your books */}
						<LinkButton
							to="/list"
							text="New Listing"
						/>

						{/* Set reading preferences */}
						<CollapsibleItem
							onClick={() => handleToggleDropdown('preferences')}
							isActive={activeDropdown === 'preferences'}
							text={<p>Reading Preferences</p>}
						>
							<Dropdown
								ref={preferencesRef}
								$isClicked={activeDropdown === 'preferences'}
								$position="absolute"
								$top="40%"
								$left="0"
								$transform="none"
								$width="fit-content"
								$padding="var(--sm)"
								$boxShadow="0 0 1rem rgba(0, 0, 0, 0.2)"
								$border="1px solid var(--ltGreen)"
							>
								<Header>
									<h3>Preferences</h3>
									<DashboardButton
										type="word"
										text="Done"
										onClick={handleSavePreferences}
									/>
								</Header>
								{categories.map((genre) => (
									<Genre
										key={genre}
										name={genre}
										isSelected={selectedPreferences.includes(
											genre
										)}
										onSelect={handleGenreSelect}
									/>
								))}
							</Dropdown>
						</CollapsibleItem>

						{/* View liked books */}
						<CollapsibleItem
							onClick={() => handleToggleDropdown('liked')}
							isActive={activeDropdown === 'liked'}
							text={<p>Your liked books</p>}
						/>

						{/* View messages */}
						<CollapsibleItem
							onClick={() => handleToggleDropdown('messages')}
							isActive={activeDropdown === 'messages'}
							text={
								<p>
									You have no new messages
								</p>
							}
						/>
					</Controls>
				</Details>

				<Dropdown
					ref={messagesRef}
					$isClicked={activeDropdown === 'messages'}
					$position="normal"
					$top="0"
					$left="0"
					$transform="none"
					$width="100%"
					$padding="0"
					$boxShadow="none"
					$border="none"
				>
					{renderMessages()}
				</Dropdown>
			</Container>

			<Dropdown
				ref={likedRef}
				$isClicked={activeDropdown === 'liked'}
				$position="normal"
				$top="0"
				$left="0"
				$transform="none"
				$width="100%"
				$padding="0"
				$boxShadow="none"
				$border="none"
			>
				{renderCarousel(likedBooks, 'Liked Books', likedBooksLoading)}
			</Dropdown>
			{renderCarousel(usersBooks, 'Your Listings', loading)}
			{renderCarousel(recommendations, 'Recommended for You', loading)}
		</section>
	)
}