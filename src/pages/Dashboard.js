import React, { useRef, useState, useEffect, useCallback } from 'react'
import { useAuth } from '../context/AuthContext'
import { useBooks } from '../context/BooksContext'
import { useUser } from '../context/UserContext'
import { useMessages } from '../context/MessagesContext'
import { categories } from '../utils/categories'
import CollapsibleItem from '../components/dashboard/CollapsibleItem'
import Genre from '../components/dashboard/Genre'
import Message from '../components/message/Message'
import Carousel from '../components/carousel/Carousel'
import Button from '../components/buttons/Button'
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
	const { user, isLoading, updateUserPreferences, updateUserDetails } =
		useAuth()
	const { userBooks, recommendations, loading } = useBooks()
	const { likedBooks, likedBooksLoading } = useUser()
	const { messages, isMessagesLoading, isError, markAsRead, refreshMessages } = useMessages()
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
				{messages.map((message, i) => (
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
	
	if (isLoading || isMessagesLoading) {
		return (
			<section>
				<div>Loading...</div>
			</section>
		)
	}

	if (!user)
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
								<Button
									type="word"
									text="Done"
									onClick={handleToggleDropdown}
								/>
							</Header>
							<form>
								<label>Username</label>
								<input
									type="text"
									name="username"
									value={formValues.username}
									onChange={handleInputChange}
									required
								/>
								<label>Email</label>
								<input
									type="email"
									name="email"
									value={formValues.email}
									onChange={handleInputChange}
									required
								/>
								<label>Phone</label>
								<input
									type="text"
									name="phone"
									value={formValues.phone}
									onChange={handleInputChange}
									required
								/>
								<label>Address Line 1</label>
								<input
									type="text"
									name="addressLine1"
									value={formValues.addressLine1}
									onChange={handleInputChange}
									required
								/>
								<label>Address Line 2</label>
								<input
									type="text"
									name="addressLine2"
									value={formValues.addressLine2}
									onChange={handleInputChange}
								/>
								<label>City</label>
								<input
									type="text"
									name="city"
									value={formValues.city}
									onChange={handleInputChange}
									required
								/>
								<label>Post Code</label>
								<input
									type="text"
									name="postCode"
									value={formValues.postcode}
									onChange={handleInputChange}
									required
								/>
								<Button
									type="action"
									text="Submit"
									onClick={handleSaveUserDetails}
								>
									Save
								</Button>
							</form>
						</Dropdown>
					</CollapsibleItem>
				</DashboardHeader>

				<Details>
					<h2>Controls</h2>
					<Controls>
						{/* Browse available books */}
						<Button
							type="dashboard"
							to="/browse"
							text="Browse available books"
						/>

						{/* List your books */}
						<Button
							type="dashboard"
							to="/list"
							text="Create a listing"
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
									<Button
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
									{isMessagesLoading ? (
										'Loading messages...'
									) : isError ? (
										'Error loading messages'
									) : (
										<>
											You have&nbsp;
											{unreadMessagesCount === 0 ? (
												'no'
												) : (
												<span>{unreadMessagesCount}</span>
											)}
											&nbsp;unread&nbsp;
											{unreadMessagesCount === 1
												? 'message'
												: 'messages'}
										</>
									)}
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
			{renderCarousel(userBooks, 'Your Listings', loading)}
			{renderCarousel(recommendations, 'Recommended for You', loading)}
		</section>
	)
}