import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useUser } from '../../context/UserContext'
import { useBooks } from '../../context/BooksContext'
import { useMessages } from '../../context/MessagesContext'
import { useDashboard } from '../../context/DashboardContext'
import { useFormik } from 'formik'
import { registerSchema } from '../../schemas/index'
import { categories } from '../../utils/categories'
import { useQueryClient } from 'react-query'
import Genre from '../dashboard/Genre'
import Message from '../message/Message'
import Carousel from '../carousel/Carousel'
import Arrow from '../../icons/Arrow'
import Check from '../../icons/Check'
import {
	Form,
	InputGroup,
	CheckContainer,
	Label,
	Input,
} from '../../assets/styles/GlobalStyles'
import {
	ProfileContainer,
	ProfileHeader,
	ProfileMenuItem,
	ProfileMenuItemHeading,
	ProfileMenuItemContent,
	MenuContentPanel,
	MessagingContainer,
	DropdownHeader,
	Feedback,
	CarouselContainer,
	SubmitButton,
	SignoutButton,
} from '../../assets/styles/ProfileStyles'

export default function Profile() {
	const navigate = useNavigate()
	const { user, logout } = useAuth()
	const {
		likedBooks,
		likedBooksLoading,
		updateUserPreferences,
		updateUserDetails,
	} = useUser()
	const { usersBooks, recommendations, loading } = useBooks()
	const {
		messages,
		isMessagesLoading,
		isError,
		markAsRead,
		refreshMessages,
	} = useMessages()
	const { activePage, handlePageChange } = useDashboard()
	const queryClient = useQueryClient()

	const [activeMenuItem, setActiveMenuItem] = useState([
		false,
		false,
		false,
		false,
	])

	const [selectedPreferences, setSelectedPreferences] = useState([])
	const [openMessage, setOpenMessage] = useState(null)

	const { values, handleSubmit, handleBlur, handleChange, touched, errors, setValues } =
		useFormik({
			initialValues: {
				email: user?.email || '',
				username: user?.username || '',
				postcode: user?.postcode || '',
			},
			validationSchema: registerSchema,
			onSubmit: () => {
				console.log('Form submitted', values)
				handleSaveUserDetails()
			},
		})

	useEffect(() => {
		const refreshUser = async () => {
			await queryClient.invalidateQueries('currentUser')
		}

		if (user) {
			refreshUser()
		}
	}, [user, queryClient])

	useEffect(() => {
		if (user) {
			refreshMessages()
		}
	}, [user, refreshMessages])

	useEffect(() => {
		if (user) {
			setSelectedPreferences(user.preferences || [])
			setValues({
				username: user.username || '',
				email: user.email || '',
				postcode: user.postcode || '',
			})
		}
	}, [user, setValues])

	const toggleMenuItem = (index) => {
		setActiveMenuItem((prev) => {
			const updatedVisibilities = [...prev]
			for (let i = 0; i < updatedVisibilities.length; i++) {
				if (i !== index) {
					updatedVisibilities[i] = false
				}
			}
			updatedVisibilities[index] = !updatedVisibilities[index]
			return updatedVisibilities
		})
	}

	const handleSaveUserDetails = useCallback(() => {
		if (!user) return

		if (errors.email || errors.username || errors.postcode) {
			console.log('Form has validation errors')
			return
		}
		console.log('Form is valid', values)
		updateUserDetails(values)
			.then(() => {
				console.log('User details updated successfully')
			})
			.catch((error) => {
				console.error('Error updating user details:', error)
			})
	}, [values, errors, user, updateUserDetails])

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
			return
		}

		const currentPreferences = user.preferences || []

		const preferencesChanged =
			JSON.stringify(selectedPreferences) !==
			JSON.stringify(currentPreferences)

		if (!preferencesChanged) {
			return
		}

		updateUserPreferences(selectedPreferences)
			// .then(() => {
			// 	console.log('Preferences saved') // Debugging log
			// })
			// .catch((error) => {
			// 	console.error('Error saving preferences:', error)
			// })
		toggleMenuItem(1)
	}, [selectedPreferences, updateUserPreferences, user])

	const toggleMessage = (messageId) => {
		markAsRead(messageId)
		setOpenMessage(openMessage === messageId ? null : messageId)
	}

	const handleLogout = () => {
		queryClient.removeQueries('messages')
		logout()
		navigate('/')
	}

	const renderCarousel = (books, title, loading) => {
		if (loading) {
			return <CarouselContainer>Loading...</CarouselContainer>
		}

		return (
			<CarouselContainer>
				<Carousel books={books} title={title} activePage={activePage} />
			</CarouselContainer>
		)
	}

	const renderMessages = () => {
		if (isMessagesLoading) {
			return (
				<MessagingContainer>
					<Feedback>Loading messages...</Feedback>
				</MessagingContainer>
			)
		}

		if (isError) {
			return (
				<MessagingContainer>
					<Feedback>
						Error loading messages. Please try again later.
					</Feedback>
				</MessagingContainer>
			)
		}

		if (!messages || messages.length === 0) {
			return (
				<MessagingContainer>
					<Feedback>No messages to display.</Feedback>
				</MessagingContainer>
			)
		}

		return (
			<MessagingContainer>
				<DropdownHeader>
					<h2>Messages</h2>
					<SubmitButton
						onClick={() => handlePageChange('Messages')}
					>
						View All
					</SubmitButton>
				</DropdownHeader>
				{messages?.map((message, i) => (
					<div key={message.id}>
						{i === 0 && <hr />}
						<Message
							message={message}
							isOpen={openMessage === message.id}
							onToggle={() => toggleMessage(message.id)}
						/>
						{messages.length > 1 ? <hr /> : ''}
					</div>
				))}
			</MessagingContainer>
		)
	}

	const unreadMessagesCount =
		messages?.filter((message) => !message.is_read).length || 0

	return (
		<ProfileContainer>
			<ProfileHeader>
				<h1>{activePage}</h1>
				<h2>Welcome {user.username}!</h2>
				<h3>What would you like to do?</h3>
			</ProfileHeader>

			<ProfileMenuItem $isVisible={activeMenuItem[0]}>
				<ProfileMenuItemHeading
					onClick={() => toggleMenuItem(0)}
					$isVisible={activeMenuItem[0]}
				>
					<h4>Update your details...</h4>
					<Arrow isActive={activeMenuItem[0]} />
				</ProfileMenuItemHeading>
				<ProfileMenuItemContent $isVisible={activeMenuItem[0]}>
					<MenuContentPanel>
						<Form
							onSubmit={handleSubmit}
							method='post'
							autoComplete='off'
						>
							<input
								autoComplete="off"
								name="hidden"
								type="text"
								style={{ display: 'none' }}
							/>
							<InputGroup>
								<Label htmlFor="username">Username</Label>
								<Input
									type="text"
									name="username"
									value={values.username || ''}
									onChange={handleChange}
									onBlur={handleBlur}
									className={
										touched.password
											? errors.password
												? 'error'
												: 'valid'
											: ''
									}
								/>
								<CheckContainer>
									<Check isActive={touched.username && !errors.username} />
								</CheckContainer>
							</InputGroup>
							<InputGroup>
								<Label htmlFor="email">Email</Label>
								<Input
									type="email"
									name="email"
									value={values.email || ''}
									onChange={handleChange}
									onBlur={handleBlur}
									className={
										touched.password
											? errors.password
												? 'error'
												: 'valid'
											: ''
									}
								/>
								<CheckContainer>
									<Check isActive={touched.email && !errors.email} />
								</CheckContainer>
							</InputGroup>
							<InputGroup>
								<Label htmlFor="postcode">Location</Label>
								<Input
									type="text"
									name="postcode"
									value={values.postcode || ''}
									onChange={handleChange}
									onBlur={handleBlur}
									className={
										touched.password
											? errors.password
												? 'error'
												: 'valid'
											: ''
									}
								/>
								<CheckContainer>
									<Check isActive={touched.postcode && !errors.postcode} />
								</CheckContainer>
							</InputGroup>
							<SubmitButton type="submit">Update details</SubmitButton>
						</Form>
					</MenuContentPanel>
				</ProfileMenuItemContent>
			</ProfileMenuItem>

			<ProfileMenuItem $isVisible={activeMenuItem[1]}>
				<ProfileMenuItemHeading
					onClick={() => toggleMenuItem(1)}
					$isVisible={activeMenuItem[1]}
				>
					<h4>Reading Preferences</h4>
					<Arrow isActive={activeMenuItem[1]} />
				</ProfileMenuItemHeading>
				<ProfileMenuItemContent $isVisible={activeMenuItem[1]}>
					<MenuContentPanel>
						{categories.map((genre) => (
							<Genre
								key={genre}
								name={genre}
								isSelected={selectedPreferences.includes(genre)}
								onSelect={handleGenreSelect}
							/>
						))}
						<SubmitButton type='button' onClick={handleSavePreferences}>
							Save Preferences
						</SubmitButton>
					</MenuContentPanel>
				</ProfileMenuItemContent>
			</ProfileMenuItem>

			<ProfileMenuItem $isVisible={activeMenuItem[2]}>
				<ProfileMenuItemHeading
					onClick={() => toggleMenuItem(2)}
					$isVisible={activeMenuItem[2]}
				>
					<h4>
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
					</h4>
					<Arrow isActive={activeMenuItem[2]} />
				</ProfileMenuItemHeading>
				<ProfileMenuItemContent $isVisible={activeMenuItem[2]}>
					{renderMessages()}
				</ProfileMenuItemContent>
			</ProfileMenuItem>

			<ProfileMenuItem $isVisible={activeMenuItem[3]}>
				<ProfileMenuItemHeading
					onClick={() => toggleMenuItem(3)}
					$isVisible={activeMenuItem[3]}
				>
					<h4>Listings</h4>
					<Arrow isActive={activeMenuItem[3]} />
				</ProfileMenuItemHeading>
				<ProfileMenuItemContent $isVisible={activeMenuItem[3]}>
					{renderCarousel(usersBooks, 'Your Listings', loading)}
				</ProfileMenuItemContent>
			</ProfileMenuItem>

			<ProfileMenuItem $isVisible={activeMenuItem[4]}>
				<ProfileMenuItemHeading
					onClick={() => toggleMenuItem(4)}
					$isVisible={activeMenuItem[4]}
				>
					<h4>Liked Books</h4>
					<Arrow isActive={activeMenuItem[4]} />
				</ProfileMenuItemHeading>
				<ProfileMenuItemContent $isVisible={activeMenuItem[4]}>
					{renderCarousel(
						likedBooks,
						'',
						likedBooksLoading
					)}
				</ProfileMenuItemContent>
			</ProfileMenuItem>

			<ProfileMenuItem $isVisible={activeMenuItem[5]}>
				<ProfileMenuItemHeading
					onClick={() => toggleMenuItem(5)}
					$isVisible={activeMenuItem[5]}
				>
					<h4>Recommended for You</h4>
					<Arrow isActive={activeMenuItem[5]} />
				</ProfileMenuItemHeading>
				<ProfileMenuItemContent $isVisible={activeMenuItem[5]}>
					{renderCarousel(
						recommendations,
						'',
						loading
					)}
				</ProfileMenuItemContent>
			</ProfileMenuItem>

			<ProfileMenuItem $isVisible={activeMenuItem[6]}>
				<ProfileMenuItemHeading
					onClick={() => toggleMenuItem(6)}
					$isVisible={activeMenuItem[6]}
				>
					<h4>Sign Out</h4>
					<Arrow isActive={activeMenuItem[6]} />
				</ProfileMenuItemHeading>
				<ProfileMenuItemContent $isVisible={activeMenuItem[6]}>
					<MenuContentPanel $signOut={true}>
						<SignoutButton onClick={handleLogout}>
							Sign Out
						</SignoutButton>
					</MenuContentPanel>
				</ProfileMenuItemContent>
			</ProfileMenuItem>
		</ProfileContainer>
	)
}
