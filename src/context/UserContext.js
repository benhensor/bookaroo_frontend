import React, { createContext, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { useAuth } from './AuthContext'
import { useBooks } from './BooksContext'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
	const { user } = useAuth()
	const { refetchBooks } = useBooks()
	const queryClient = useQueryClient()

	// create a listing
	const createListing = async (listingData) => {
		const token = sessionStorage.getItem('authToken')
		try {
			await axios.post(
				`${process.env.REACT_APP_API_URL}/api/books/list`,
				listingData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			return { success: true, message: 'Book listed successfully!' }
		} catch (error) {
			console.error('Error submitting book listing:', error)
			return {
				success: false,
				message:
					'An error occurred while submitting your listing. Please try again.',
			}
		}
	}

	// delete a listing
	const deleteListing = async (bookId) => {
		const token = sessionStorage.getItem('authToken')
		try {
			await axios.delete(
				`${process.env.REACT_APP_API_URL}/api/books/delete/${bookId}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
					params: { bookId },
				}
			)
			await refetchBooks() // Refetch the books data after
			return { success: true, message: 'Book deleted successfully!' }
		} catch (error) {
			console.error('Error deleting book listing:', error)
			return {
				success: false,
				message:
					'An error occurred while deleting the book. Please try again.',
			}
		}
	}

	// Fetch liked books based on the IDs in the user's `likedBooks` array
	const fetchLikedBooks = async () => {
		if (!user || !user.likedBooks || user.likedBooks.length === 0) {
			return []
		}
		const token = sessionStorage.getItem('authToken')
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_API_URL}/api/books/all`,
				{
					headers: { Authorization: `Bearer ${token}` },
					params: { ids: user.likedBooks.join(',') }, // Assuming API accepts a comma-separated list of book IDs
				}
			)

			return response.data
		} catch (error) {
			console.error('Error fetching liked books:', error)
			return []
		}
	}

	const {
		data: likedBooks,
		isLoading: likedBooksLoading,
		isError: likedBooksError,
		refetch: refetchLikedBooks,
	} = useQuery(['likedBooks', user?.id], fetchLikedBooks, {
		enabled: !!user, // Ensures the query only runs if a user is logged in
		onSuccess: (data) => {
			// console.log('Liked books:', data);
		},
		onError: (error) => {
			console.error('Error fetching liked books:', error)
		},
	})

	// Mutation to like a book (add to likedBooks array)
	const likeMutation = useMutation(
		async (bookId) => {
			const token = sessionStorage.getItem('authToken')
			await axios.put(
				`${process.env.REACT_APP_API_URL}/api/users/like`,
				{ bookId },
				{ headers: { Authorization: `Bearer ${token}` } }
			)
		},
		{
			onSuccess: () => {
				// console.log('Book liked successfully', likedBooks);
				queryClient.invalidateQueries(['likedBooks', user?.id]) // Refetch liked books after a successful like
				queryClient.invalidateQueries('currentUser') // Refetch user data to update likedBooks array
			},
		}
	)

	const unlikeMutation = useMutation(
		async (bookId) => {
			const token = sessionStorage.getItem('authToken')
			await axios.put(
				`${process.env.REACT_APP_API_URL}/api/users/unlike`,
				{ bookId },
				{ headers: { Authorization: `Bearer ${token}` } }
			)
		},
		{
			onSuccess: () => {
				// console.log('Book unliked successfully', likedBooks);
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
				createListing,
				deleteListing,
				likeBook,
				unlikeBook,
			}}
		>
			{children}
		</UserContext.Provider>
	)
}

export const useUser = () => React.useContext(UserContext)
