import React, { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useUser } from '../../context/UserContext'
import { useBooks } from '../../context/BooksContext'
import { useMessages } from '../../context/MessagesContext'
import { useDashboard } from '../../context/DashboardContext'
import { categories } from '../../utils/categories'
import Genre from '../dashboard/Genre'
import Message from '../message/Message'
import Carousel from '../carousel/Carousel'
import LinkButton from '../buttons/LinkButton'
import DashboardButton from '../buttons/DashboardButton'
import Arrow from '../../icons/Arrow'
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
} from '../../assets/styles/ProfileStyles'



export default function Profile() {
	const { user, isAuthenticated, isLoading } = useAuth()
	const { likedBooks, likedBooksLoading, updateUserPreferences, updateUserDetails } = useUser()
	const { usersBooks, recommendations, loading } = useBooks()
	const { messages, isMessagesLoading, isError, markAsRead, refreshMessages } = useMessages()
	const { activePage, handlePageChange } = useDashboard()
	const [activeMenuItem, setActiveMenuItem] = useState([false, false, false, false])
	const [activeDropdown, setActiveDropdown] = useState(false)
	const [selectedPreferences, setSelectedPreferences] = useState([])
	const [openMessage, setOpenMessage] = useState(null)



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



	const toggleMenuItem = (index) => {
    setActiveMenuItem(prev => {
      const updatedVisibilities = [...prev];
			for (let i = 0; i < updatedVisibilities.length; i++) {
				if (i !== index) {
					updatedVisibilities[i] = false;
				}
			}
      updatedVisibilities[index] = !updatedVisibilities[index];
      return updatedVisibilities;
    });
  };




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
				<Carousel books={books} title={title} activePage={activePage}/>
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
				<DropdownHeader>
					<h2>Messages</h2>
					<LinkButton text="View All" onClick={() => handlePageChange('Messages')} />
				</DropdownHeader>
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


  return (
    <>
			<ProfileContainer>

				<ProfileHeader>
					<h1>{activePage}</h1>
					<h2>Welcome {user.username}!</h2>
					<h3>What would you like to do?</h3>
				</ProfileHeader>

				<ProfileMenuItem  $isVisible={activeMenuItem[0]}>
					<ProfileMenuItemHeading onClick={() => toggleMenuItem(0)} $isVisible={activeMenuItem[0]}>
						<h4>Update your details...</h4>
						<Arrow isActive={activeMenuItem[0]}/>
					</ProfileMenuItemHeading>
					<ProfileMenuItemContent $isVisible={activeMenuItem[0]}>
						<MenuContentPanel>
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
									/>
							</form>
						</MenuContentPanel>
					</ProfileMenuItemContent>
				</ProfileMenuItem>
				
				
				<ProfileMenuItem $isVisible={activeMenuItem[1]}>
					<ProfileMenuItemHeading onClick={() => toggleMenuItem(1)} $isVisible={activeMenuItem[1]}>
						<h4>Reading Preferences</h4>
						<Arrow isActive={activeMenuItem[1]}/>
					</ProfileMenuItemHeading>
					<ProfileMenuItemContent $isVisible={activeMenuItem[1]}>
						<MenuContentPanel>
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
							<DashboardButton
								text="Save"
								onClick={handleSavePreferences}
							/>
						</MenuContentPanel>
					</ProfileMenuItemContent>
				</ProfileMenuItem>
				
				
				
				<ProfileMenuItem $isVisible={activeMenuItem[2]}>
					<ProfileMenuItemHeading onClick={() => toggleMenuItem(2)} $isVisible={activeMenuItem[2]}>
						<h4>{isMessagesLoading ? (
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
						<Arrow isActive={activeMenuItem[2]}/>
					</ProfileMenuItemHeading>
					<ProfileMenuItemContent $isVisible={activeMenuItem[2]}>
						{renderMessages()}
					</ProfileMenuItemContent>
				</ProfileMenuItem>
				
				
				
				<ProfileMenuItem $isVisible={activeMenuItem[3]}>
					<ProfileMenuItemHeading onClick={() => toggleMenuItem(3)} $isVisible={activeMenuItem[3]}>
						<h4>Listings</h4>
						<Arrow isActive={activeMenuItem[3]}/>
					</ProfileMenuItemHeading>
					<ProfileMenuItemContent $isVisible={activeMenuItem[3]}>
						{renderCarousel(usersBooks, 'Your Listings', loading)}
					</ProfileMenuItemContent>
				</ProfileMenuItem>


				
				<ProfileMenuItem $isVisible={activeMenuItem[4]}>
					<ProfileMenuItemHeading onClick={() => toggleMenuItem(4)} $isVisible={activeMenuItem[4]}>
						<h4>Liked  Books</h4>
						<Arrow isActive={activeMenuItem[4]}/>
					</ProfileMenuItemHeading>
					<ProfileMenuItemContent $isVisible={activeMenuItem[4]}>
						{renderCarousel(likedBooks, 'Liked Books', likedBooksLoading)}
					</ProfileMenuItemContent>
				</ProfileMenuItem>


				
				<ProfileMenuItem $isVisible={activeMenuItem[5]}>
					<ProfileMenuItemHeading onClick={() => toggleMenuItem(5)} $isVisible={activeMenuItem[5]}>
						<h4>Recommended for You</h4>
						<Arrow isActive={activeMenuItem[5]}/>
					</ProfileMenuItemHeading>
					<ProfileMenuItemContent $isVisible={activeMenuItem[5]}>
						{renderCarousel(recommendations, 'Recommended for You', loading)}
					</ProfileMenuItemContent>
				</ProfileMenuItem>


			</ProfileContainer>
    </>
  )
}