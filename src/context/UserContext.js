import React, { createContext, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { useAuth } from './AuthContext'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
	const { user, setUser } = useAuth()
	const queryClient = useQueryClient()

	// User context handles user preferences, liked books, listed books and recommendations
	const updateUserDetails = async (updatedUser) => {
		try {
			const response = await axios.put(
				`${process.env.REACT_APP_API_URL}/api/users/update`,
				updatedUser,
				{
					withCredentials: true,
				}
			)
			setUser(response.data)
			queryClient.invalidateQueries('currentUser')
		} catch (error) {
			console.error('Full error:', error)
			console.error('Response data:', error.response?.data)
			throw error
		}
	}

	// Update the users preferences
	const updateUserPreferences = async (preferences) => {
		try {
			const response = await axios.put(
				`${process.env.REACT_APP_API_URL}/api/users/preferences`,
				{ preferences },
				{
					withCredentials: true,
				}
			)
			setUser((prevUser) => ({
				...prevUser,
				preferences: response.data.preferences,
			}))
			queryClient.invalidateQueries('currentUser') // Refetch user data to update preferences
			return {
				success: true,
				message: 'Preferences updated successfully!',
			}
		} catch (error) {
			console.error('Error updating user preferences:', error)
			return {
				success: false,
				message:
					'An error occurred while updating your preferences. Please try again.',
			}
		}
	}

	// Fetch a user by their ID
	const getUserById = async (user_id) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_API_URL}/api/users/${user_id}`,
				{
					withCredentials: true,
					params: { user_id },
				}
			)
			return response.data // Ensure the data is being returned
		} catch (error) {
			console.error('Error searching for users:', error)
			return null // Return null or handle the error gracefully
		}
	}

	const likeMutation = useMutation(
		async (book_id) => {
			const response = await axios.put(
				`${process.env.REACT_APP_API_URL}/api/users/like`,
				{ book_id },
				{ withCredentials: true }
			)
			return response.data
		},
		{
			onSuccess: (data) => {
				// Trigger a refetch of liked books
				refetchLikedBooks()

				// Update the user's liked_books array in the cache
				queryClient.setQueryData('currentUser', (oldUser) => {
					if (!oldUser) return oldUser
					return {
						...oldUser,
						liked_books: data.likedBooks,
					}
				})
			},
			onError: (error) => {
				console.error('Error liking book:', error)
			},
		}
	)

	const unlikeMutation = useMutation(
		async (book_id) => {
			const response = await axios.put(
				`${process.env.REACT_APP_API_URL}/api/users/unlike`,
				{ book_id },
				{ withCredentials: true }
			)
			return response.data
		},
		{
			onSuccess: (data) => {
				// Trigger a refetch of liked books
				refetchLikedBooks()

				// Update the user's liked_books array in the cache
				queryClient.setQueryData('currentUser', (oldUser) => {
					if (!oldUser) return oldUser
					return {
						...oldUser,
						liked_books: data.likedBooks,
					}
				})
			},
			onError: (error) => {
				console.error('Error unliking book:', error)
			},
		}
	)

	// Update the fetchLikedBooks function to handle the PHP backend response
	const fetchLikedBooks = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_API_URL}/api/users/liked`,
				{
					withCredentials: true,
				}
			)
			return response.data || [] // PHP backend returns array of book objects directly
		} catch (error) {
			console.error('Error fetching liked books:', error)
			return []
		}
	}

	// Update the useQuery hook to use proper options
	const {
		data: likedBooks = [],
		isLoading: likedBooksLoading,
		isError: likedBooksError,
		refetch: refetchLikedBooks,
	} = useQuery(['likedBooks', user?.id], fetchLikedBooks, {
		enabled: !!user,
		staleTime: 0, // Always fetch fresh data
		onError: (error) => {
			console.error('Error fetching liked books:', error)
		},
	})

	const likeBook = async (book_id) => {
		try {
			await likeMutation.mutateAsync(book_id)
		} catch (error) {
			console.error('Error liking book:', error)
		}
	}

	const unlikeBook = async (book_id) => {
		try {
			await unlikeMutation.mutateAsync(book_id)
		} catch (error) {
			console.error('Error unliking book:', error)
		}
	}

	useEffect(() => {
		if (user) {
			refetchLikedBooks()
		}
	}, [user, refetchLikedBooks])

	return (
		<UserContext.Provider
			value={{
				likedBooks,
				likedBooksLoading,
				likedBooksError,
				updateUserDetails,
				getUserById,
				updateUserPreferences,
				likeBook,
				unlikeBook,
			}}
		>
			{children}
		</UserContext.Provider>
	)
}

export const useUser = () => React.useContext(UserContext)
