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
			const res = await axios.put(
				`${process.env.REACT_APP_API_URL}/api/users/update`,
				updatedUser,
				{
					withCredentials: true,
				}
			)
			setUser(res)
			queryClient.invalidateQueries('currentUser') // Refetch user data to update user details
		} catch (error) {
			console.error('Error updating user data:', error)
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
	const getUserById = async (userId) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_API_URL}/api/users/${userId}`,
				{
					withCredentials: true,
					params: { userId },
				}
			)
			return response.data // Ensure the data is being returned
		} catch (error) {
			console.error('Error searching for users:', error)
			return null // Return null or handle the error gracefully
		}
	}

	// Fetch liked books based on the IDs in the user's `likedBooks` array
	const fetchLikedBooks = async (userId) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_API_URL}/api/users/liked`,
				{
					withCredentials: true,
					params: { userId },
				}
			)
			return response.data
		} catch (error) {
			console.error('Error fetching liked books:', error)
			return []
		}
	}

	// Query to fetch liked books
	const {
		data: likedBooks,
		isLoading: likedBooksLoading,
		isError: likedBooksError,
		refetch: refetchLikedBooks,
	} = useQuery(['likedBooks', user?.id], fetchLikedBooks, {
		enabled: !!user, // Ensures the query only runs if a user is logged in
		onSuccess: (data) => {
		},
		onError: (error) => {
			console.error('Error fetching liked books:', error)
		},
	})

	// Mutation to like a book (add to likedBooks array)
	const likeMutation = useMutation(
    async (bookId) => {
        await axios.put(
            `${process.env.REACT_APP_API_URL}/api/users/like`,
            { bookId },
            { withCredentials: true }
        );
    },
    {
        onSuccess: () => {
				queryClient.invalidateQueries(['likedBooks', user?.id]) // Refetch liked books after a successful like
				queryClient.invalidateQueries('currentUser') // Refetch user data to update likedBooks array
			},
		}
	)

	// Mutation to unlike a book (remove from likedBooks array)
	const unlikeMutation = useMutation(
    async (bookId) => {
        await axios.put(
            `${process.env.REACT_APP_API_URL}/api/users/unlike`,
            { bookId },
            { withCredentials: true }
        );
    },
    {
        onSuccess: () => {
				queryClient.invalidateQueries(['likedBooks', user?.id]) // Refetch liked books after a successful unlike
				queryClient.invalidateQueries('currentUser') // Refetch user data to update likedBooks array
			},
		}
	)

	const likeBook = (bookId) => likeMutation.mutate(bookId)
	const unlikeBook = (bookId) => unlikeMutation.mutate(bookId)

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
