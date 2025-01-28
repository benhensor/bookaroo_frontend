import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useUser } from '../../context/UserContext'
import { useBooks } from '../../context/BooksContext'
import { useDashboard } from '../../context/DashboardContext'
import { useFormik } from 'formik'
import { registerSchema } from '../../schemas/index'
import { categories } from '../../utils/categories'
import { useQueryClient } from 'react-query'
import Genre from '../dashboard/Genre'
import Carousel from '../carousel/Carousel'
import Arrow from '../../icons/Arrow'
import Check from '../../icons/Check'
import { Spacer } from '../../assets/styles/GlobalStyles'
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
	const { activePage } = useDashboard()
	const queryClient = useQueryClient()

	const [activeMenuItem, setActiveMenuItem] = useState([
		false,
		false,
		false,
		false,
	])

	const [selectedPreferences, setSelectedPreferences] = useState([])

	const { values, handleBlur, handleChange, touched, errors, setValues } =
		useFormik({
			initialValues: {
				email: user?.email || '',
				username: user?.username || '',
				postcode: user?.postcode || '',
			},
			validationSchema: registerSchema,
			onSubmit: async (formValues) => {
				console.log('Formik onSubmit never reaches here')
			},
		})

	const handleFormSubmit = async (e) => {
		e.preventDefault()

		if (!user) {
			console.log('No user found')
			return
		}

		if (errors.email || errors.username || errors.postcode) {
			console.log('Validation errors:', errors)
			return
		}

		try {
			await updateUserDetails(values)
			toggleMenuItem(0)
		} catch (error) {
			console.error('Update failed:', error)
		}
	}

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
			try {
				// Ensure preferences is an array
				let userPreferences = [];
				if (user.preferences) {
					userPreferences = Array.isArray(user.preferences)
					? user.preferences
					: JSON.parse(user.preferences)
				}
				setSelectedPreferences(Array.isArray(userPreferences) ? userPreferences : [])
			} catch (error) {
				console.error('Error setting user values:', error)
				setSelectedPreferences([])
			}

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

	const handleGenreSelect = (genre) => {
		setSelectedPreferences((prevPreferences) => {
			// Ensure prevPreferences is an array
			const currentPreferences = Array.isArray(prevPreferences)
				? prevPreferences
				: []

			if (currentPreferences.includes(genre)) {
				return currentPreferences.filter((g) => g !== genre)
			} else {
				return [...currentPreferences, genre]
			}
		})
	}

	const handleSavePreferences = useCallback(() => {
		if (!user) return

		const currentPreferences = Array.isArray(user.preferences)
			? user.preferences
			: []
		const newPreferences = Array.isArray(selectedPreferences)
			? selectedPreferences
			: []

			if (JSON.stringify(newPreferences.sort()) !== JSON.stringify(currentPreferences.sort())) {
        updateUserPreferences(newPreferences);
        toggleMenuItem(1);
    }
	}, [selectedPreferences, updateUserPreferences, user]);

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

	return (
		<ProfileContainer>
			<Spacer />
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
							onSubmit={handleFormSubmit}
							method="post"
						>
							<div style={{ display: 'none' }}>
								Form state:{' '}
								{JSON.stringify(
									{ values, touched, errors },
									null,
									2
								)}
							</div>
							<input
								autoComplete="off"
								name="hidden"
								type="text"
								style={{ display: 'none' }}
							/>
							<InputGroup>
								<Label htmlFor="profileUsername" >Username</Label>
								<Input
									id='profileUsername'
									type="text"
									name="username"
									value={values.username || ''}
									autoComplete='false'
									onChange={(e) => {
										console.log(
											'Username changed:',
											e.target.value
										)
										handleChange(e)
									}}
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
									<Check
										isActive={
											touched.username && !errors.username
										}
									/>
								</CheckContainer>
							</InputGroup>
							<InputGroup>
								<Label htmlFor="profileEmail">Email</Label>
								<Input
									id='profileEmail'
									type="email"
									name="email"
									value={values.email || ''}
									autoComplete='false'
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
									<Check
										isActive={
											touched.email && !errors.email
										}
									/>
								</CheckContainer>
							</InputGroup>
							<InputGroup>
								<Label htmlFor="profilePostcode">Location</Label>
								<Input
									id='profilePostcode'
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
									<Check
										isActive={
											touched.postcode && !errors.postcode
										}
									/>
								</CheckContainer>
							</InputGroup>
							<SubmitButton
								type="submit"
								onClick={(e) => {
									console.log('Submit button clicked')
								}}
							>
								Update details
							</SubmitButton>
						</Form>
					</MenuContentPanel>
				</ProfileMenuItemContent>
			</ProfileMenuItem>

			<ProfileMenuItem $isVisible={activeMenuItem[1]}>
				<ProfileMenuItemHeading
					onClick={() => toggleMenuItem(1)}
					$isVisible={activeMenuItem[1]}
				>
					<h4>{activeMenuItem[1] ? 'Save Preferences' : 'Reading Preferences'}</h4>
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
						<SubmitButton
							type="button"
							onClick={handleSavePreferences}
						>
							Save Preferences
						</SubmitButton>
					</MenuContentPanel>
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
					{renderCarousel(likedBooks, '', likedBooksLoading)}
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
					{renderCarousel(recommendations, '', loading)}
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
