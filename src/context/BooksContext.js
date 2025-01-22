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
	const [loading, setLoading] = useState(true)
	const [allBooks, setAllBooks] = useState([])
	const [searchResults, setSearchResults] = useState([])
	const [searchError, setSearchError] = useState(null)

	const getAllBooks = useCallback(async () => {
		setLoading(true)
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
		} finally {
			setLoading(false)
		}
	}, [])

	useEffect(() => {
		if (isAuthenticated && user?.id) {
			getAllBooks()
		}
	}, [isAuthenticated, user, getAllBooks])

	const usersBooks = useMemo(
		() => allBooks.filter((book) => book.user_id === user?.id),
		[allBooks, user?.id]
	)

	const recommendations = useMemo(
    () =>
        user?.preferences && user.preferences.length > 0
            ? allBooks.filter((book) => {
                  // Parse JSON string to array
                  const categories = Array.isArray(book.category) 
                      ? book.category 
                      : JSON.parse(book.category);
                  
                  return book.user_id !== user?.id &&
                         categories.some(category => 
                             user.preferences.includes(category)
                         );
              })
            : [],
    [allBooks, user?.id, user?.preferences]
	);

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
        return allBooks.filter(book => {
            const categories = Array.isArray(book.category) 
                ? book.category 
                : JSON.parse(book.category);
            
            return book.title.toLowerCase().includes(lowercaseQuery) ||
                   book.author.toLowerCase().includes(lowercaseQuery) ||
                   categories.some(cat => 
                       cat.toLowerCase().includes(lowercaseQuery)
                   );
        })
    },
    [allBooks]
	);

	const createListing = async (listingData) => {
    try {
        // Ensure category is in the correct format
        const formattedData = {
            ...listingData,
            category: Array.isArray(listingData.category) 
                ? listingData.category 
                : [listingData.category]
        };

        console.log('Sending listing data:', formattedData);

        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/books/newlisting`,
            formattedData,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.data.success) {
            await getAllBooks();
            return { success: true, message: 'Book listed successfully!' };
        } else {
            console.error('Server response:', response.data);
            return {
                success: false,
                message: response.data.details || response.data.error || 'Unknown error occurred'
            };
        }
    } catch (error) {
        console.error('Error submitting book listing:', error.response?.data || error);
        return {
            success: false,
            message: error.response?.data?.details || 
                    error.response?.data?.error ||
                    'An error occurred while submitting your listing. Please try again.'
        };
    }
};

	const deleteListing = async (bookId) => {
		try {
			await axios.delete(
				`${process.env.REACT_APP_API_URL}/api/books/${bookId}`,
				{
					withCredentials: true,
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
				loading, 
				error: null, 
			}}
		>
			{children}
		</BooksContext.Provider>
	)
}

export const useBooks = () => React.useContext(BooksContext)
