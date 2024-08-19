import React, { createContext, useState, useCallback, useMemo } from 'react'
import { useAuth } from './AuthContext'
import axios from 'axios'
import { useQuery } from 'react-query'

const BooksContext = createContext()

export const BooksProvider = ({ children }) => {
	const { user, isAuthenticated, searchUsers } = useAuth()
	const [book, setBook] = useState(null)
	const [bookOwner, setBookOwner] = useState(null)

	// Fetch books and user details
	const fetchBooks = async () => {
		const token = sessionStorage.getItem('authToken')
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/api/books/all`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)

		// Fetch user details for each book in parallel
		const booksWithUserDetails = await Promise.all(
			data.map(async (book) => {
				const userDetail = await searchUsers(book.userId)
				return { ...book, user: userDetail }
			})
		)

		return booksWithUserDetails.sort(() => Math.random() - 0.5)
	}

	// Use `useQuery` to manage the books fetching
	const {
		data: books = [],
		isLoading,
		error,
		refetch,
	} = useQuery('books', fetchBooks, {
		enabled: isAuthenticated, // Only run the query when the user is authenticated
		retry: 3, // Retry failed requests up to 3 times
		staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
		cacheTime: 1000 * 60 * 10, // Cache data for 10 minutes
	})

	// Derived state for userBooks and recommendations using useMemo
	const userBooks = useMemo(
		() => books.filter((book) => book.userId === user?.id),
		[books, user?.id]
	)

	const recommendations = useMemo(
		() =>
			user?.preferences && user.preferences.length > 0
				? books.filter(
						(book) =>
							book.userId !== user?.id &&
							book.category.some((category) =>
								user.preferences.includes(category)
							)
				  )
				: [],
		[books, user?.id, user?.preferences]
	)


	const getBookById = useCallback(
		(id) => books.find((book) => book.id === id),
		[books]
	)
	

	// Function to search for books locally
	const searchBooks = useCallback(
		(query) => {
			if (!query.trim()) return []

			const lowercaseQuery = query.toLowerCase()
			return books.filter(
				(book) =>
					book.title.toLowerCase().includes(lowercaseQuery) ||
					book.author.toLowerCase().includes(lowercaseQuery) ||
					book.category.some((cat) =>
						cat.toLowerCase().includes(lowercaseQuery)
					)
			)
		},
		[books]
	)

	return (
		<BooksContext.Provider
			value={{
				book,
				books,
				bookOwner,
				recommendations,
				userBooks,
				setBook,
				setBookOwner,
				getBookById,
				searchBooks,
				refetchBooks: refetch, // Use `refetch` to manually refetch books
				loading: isLoading,
				error,
			}}
		>
			{children}
		</BooksContext.Provider>
	)
}

export const useBooks = () => React.useContext(BooksContext)
