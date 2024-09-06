import React, {
	createContext,
	useState,
	useEffect,
	useCallback,
	useMemo,
} from 'react'
import { useAuth } from './AuthContext'
import axios from 'axios'

const BooksContext = createContext()

export const BooksProvider = ({ children }) => {
	const { user, isAuthenticated } = useAuth()
	const [allBooks, setAllBooks] = useState([])
	const [searchResults, setSearchResults] = useState([])
	const [searchError, setSearchError] = useState(null)

	const getAllBooks = useCallback(async () => {
		try {
			const { data } = await axios.get(
				`${process.env.REACT_APP_API_URL}/api/books/allbooks`,
				{
					withCredentials: true,
				}
			)
			if (Array.isArray(data)) {
				setAllBooks(data)
			} else {
				console.error('Unexpected books format:', data)
				setAllBooks([])
			}
		} catch (error) {
			console.error('Error fetching books:', error)
			setAllBooks([])
		}
	}, [])

	useEffect(() => {
		if (isAuthenticated) {
			getAllBooks()
		}
	}, [isAuthenticated, getAllBooks])

	const usersBooks = useMemo(
		() => allBooks.filter((book) => book.userId === user?.id),
		[allBooks, user?.id]
	)

	const recommendations = useMemo(
		() =>
			user?.preferences && user.preferences.length > 0
				? allBooks.filter(
						(book) =>
							book.userId !== user?.id &&
							book.category.some((category) =>
								user.preferences.includes(category)
							)
				  )
				: [],
		[allBooks, user?.id, user?.preferences]
	)

	const getBookById = useCallback(
		(id) => {
			const book = allBooks.find((book) => book.id === id)
			return book
		},
		[allBooks]
	)

	const searchBooks = useCallback(
		(query) => {
			if (!query.trim()) return []

			const lowercaseQuery = query.toLowerCase()
			return allBooks.filter(
				(book) =>
					book.title.toLowerCase().includes(lowercaseQuery) ||
					book.author.toLowerCase().includes(lowercaseQuery) ||
					book.category.some((cat) =>
						cat.toLowerCase().includes(lowercaseQuery)
					)
			)
		},
		[allBooks]
	)

	const createListing = async (listingData) => {
		try {
			await axios.post(
				`${process.env.REACT_APP_API_URL}/api/books/newlisting`,
				listingData,
				{
					withCredentials: true,
				}
			)
			await getAllBooks()
			return { success: true, message: 'Book listed successfully!' }
		} catch (error) {
			console.error('Error submitting book listing:', error)
			return {
				success: false,
				message:
					error.response?.data?.message ||
					'An error occurred while submitting your listing. Please try again.',
			}
		}
	}

	const deleteListing = async (bookId) => {
		try {
			await axios.delete(
				`${process.env.REACT_APP_API_URL}/api/books/delete/${bookId}`,
				{
					withCredentials: true,
					params: { bookId },
				}
			)
			await getAllBooks()
			return { success: true, message: 'Book deleted successfully!' }
		} catch (error) {
			console.error('Error deleting book listing:', error)
			return {
				success: false,
				message:
					error.response?.data?.message ||
					'An error occurred while deleting the book. Please try again.',
			}
		}
	}

	return (
		<BooksContext.Provider
			value={{
				allBooks,
				searchResults,
				searchError,
				recommendations,
				usersBooks,
				getBookById,
				searchBooks,
				setSearchResults,
				setSearchError,
				createListing,
				deleteListing,
				refetchBooks: getAllBooks, 
				loading: !allBooks.length && isAuthenticated, 
				error: null, 
			}}
		>
			{children}
		</BooksContext.Provider>
	)
}

export const useBooks = () => React.useContext(BooksContext)
