import React, { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useBooks } from '../../context/BooksContext'
import axios from 'axios'
import ActionButton from '../buttons/ActionButton'
import { categories } from '../../utils/categories'
import { Spacer } from '../../assets/styles/GlobalStyles'
import {
	ListingsContainer,
	ListingsHeader,
	Block,
	Form,
	ErrorMessage,
	SuccessMessage,
	ListOfListings,
} from '../../assets/styles/ListingStyles'

export default function Listings() {
	const { user } = useAuth()
	const { usersBooks, loading, createListing, deleteListing } = useBooks()
	const [searchTerm, setSearchTerm] = useState('')
	const [bookResults, setBookResults] = useState([])
	const [isbn, setIsbn] = useState('')
	const [message, setMessage] = useState('')
	const [error, setError] = useState('')

	const [bookData, setBookData] = useState({
		isbn: '',
		cover_img: '',
		title: '',
		author: '',
		published_date: '',
		publisher: '',
		category: '',
		book_condition: '',
		notes: '',
		user_id: user?.id || '',
	})

	const handleReset = useCallback(() => {
		setSearchTerm('')
		setBookResults([])
		setIsbn('')
		setMessage('')
		setError('')
		setBookData({
			isbn: '',
			cover_img: '',
			title: '',
			author: '',
			published_date: '',
			publisher: '',
			category: '',
			book_condition: '',
			notes: '',
			user_id: user?.id || '',
		})
	}, [user])

	// Reset state on component mount
	useEffect(() => {
		handleReset()
	}, [user, handleReset])

	const handleSearch = async (e) => {
		e.preventDefault()
		try {
			const safeSearchTerm = encodeURIComponent(searchTerm.trim())
			const response = await axios.get(
				`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
					safeSearchTerm
				)}&country=UK`
			)
			setBookResults(response.data.items || [])
			if (!response.data.items || response.data.items.length === 0) {
				setError('No books found. Please try a different search term.')
			} else {
				setError('')
			}
		} catch (error) {
			console.error('Error fetching books:', error)
			setError(
				'An error occurred while searching for books. Please try again later.'
			)
		}
	}

	const ensureHttps = (url) => {
		if (url && url.startsWith('http:')) {
			return url.replace('http:', 'https:')
		}
		return url || ''
	}

	const handleSelectBook = async (e) => {
		const bookId = e.target.value
		const book = bookResults.find((book) => book.id === bookId)

		if (book) {
			try {
				const detailsResponse = await axios.get(book.selfLink)

				const detailedBook = detailsResponse.data
				const isbnValue =
					detailedBook.volumeInfo.industryIdentifiers?.find(
						(id) => id.type === 'ISBN_13'
					)?.identifier || ''
				console.log('Detailed book info:', detailedBook)
				setIsbn(isbnValue)
				setBookData({
					isbn: isbnValue || '',
					cover_img: ensureHttps(
						detailedBook.volumeInfo.imageLinks.extraLarge ||
							detailedBook.volumeInfo.imageLinks.large ||
							detailedBook.volumeInfo.imageLinks.medium ||
							detailedBook.volumeInfo.imageLinks.small ||
							detailedBook.volumeInfo.imageLinks.thumbnail ||
							''
					),
					title: detailedBook.volumeInfo.title || '',
					author: detailedBook.volumeInfo.authors?.join(', ') || '',
					published_date: detailedBook.volumeInfo.publishedDate || '',
					publisher: detailedBook.volumeInfo.publisher || '',
					category: bookData.category || '',
					book_condition: '',
					notes: '',
					user_id: user?.id || '',
				})
				setError('') 
			} catch (error) {
				console.error('Error fetching detailed book info:', error)
				setError('An error occurred while retrieving book details.')
			}
		}
	}

	const handleInputChange = (e) => {
		const { name, value } = e.target

		setBookData((prevData) => ({
			...prevData,
			[name]: name === 'category' ? [value] : value, 
		}))
	}

	// Modified Form submit handler in Listings.js
	const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', bookData);

    if (!bookData.title || !bookData.condition || !bookData.category) {
        setError('Please fill in all required fields.');
        return;
    }

    try {
        const response = await createListing(bookData);
        console.log('Create listing response:', response);

        if (response.success) {
            setMessage('Book listed successfully!');
            handleReset();
        } else {
            setError(response.message || 'An error occurred. Please try again.');
        }
    } catch (error) {
        console.error('Submit error:', error);
        setError('Failed to create the listing, please try again later.');
    }
};

	const listOfListings = (books, title, loading) => {
		return (
			<ListOfListings>
				<h2>{title}</h2>
				{loading ? (
					<p>Loading...</p>
				) : books.length > 0 ? (
					<ul>
						{books.map((book) => (
							<li key={book.id}>
								<img src={book.cover_img} alt={book.title} />
								<div className='outer'>
									<div className='inner'>
										<p>{book.title}</p>
										<span>{book.author}</span>
									</div>
									<button
										onClick={() => {
											deleteListing(book.id)
										}}
										aria-label={`Delete listing of ${book.title}`}
									>
										Delete
									</button>
								</div>
							</li>
						))}
					</ul>
				) : (
					<p>No books found.</p>
				)}
			</ListOfListings>
		)
		
	}

	return (
		<ListingsContainer>
			<Spacer />
			<ListingsHeader>
				<h1>List a Book</h1>
			</ListingsHeader>
			<Block>
				<Form onSubmit={handleSearch}>
					<label>
						Search for a Book:
						<input
							type="text"
							value={searchTerm}
							placeholder="Search by title, author, or ISBN"
							onChange={(e) => setSearchTerm(e.target.value)}
							aria-label="Search for a book by title, author, or ISBN"
						/>
						<ActionButton text="Search" />
					</label>
					{error && <ErrorMessage role='alert'>{error}</ErrorMessage>}
					{message && <SuccessMessage role='alert'>{message}</SuccessMessage>}
				</Form>
			</Block>

			{bookResults.length > 0 && (
				<Block>
					<Form onSubmit={handleSubmit}>
						<label>
							Select a Book:
							<select
								onChange={handleSelectBook}
								value={
									bookData.title
										? bookResults.find(
												(book) =>
													book.volumeInfo.title ===
													bookData.title
										  )?.id
										: ''
								}
								aria-label='Select a book'
							>
								<option value="">Select a Book</option>
								{bookResults.map((book) => (
									<option key={book.id} value={book.id}>
										{book.volumeInfo.title} -{' '}
										{book.volumeInfo.authors
											? book.volumeInfo.authors.join(', ')
											: 'Unknown Author'}
									</option>
								))}
							</select>
						</label>
						{bookData.title && (
							<>
								<h2>Selected Book</h2>
								{isbn && (
									<>
										<img
											src={bookData.cover_img}
											alt={bookData.title}
										/>
									</>
								)}
								<p>{bookData.title}</p>
								<p>
									<span>
										{bookData.author || 'Unknown Author'}
									</span>
								</p>
								<label>
									Category:
									<select
										name="category"
										value={bookData.category[0] || ''}
										onChange={handleInputChange}
										aria-label='Select category'
									>
										<option value="">Select Category</option>
										{categories.map((category) => (
											<option key={category} value={category}>
												{category}
											</option>
										))}
									</select>
								</label>
								<label>
									Condition:
									<select
										name="condition"
										value={bookData.book_condition}
										onChange={handleInputChange}
										required
										aria-label='Select condition'
									>
										<option value="none" defaultValue>
											Select Condition
										</option>
										<option value="As New">As New</option>
										<option value="Good">Good</option>
										<option value="Fair">Fair</option>
										<option value="Poor">Poor</option>
									</select>
								</label>
								<label>
									Notes:
									<textarea
										name="notes"
										value={bookData.notes}
										onChange={handleInputChange}
										placeholder="Any additional information about the book?"
										required
										aria-label='Enter any additional notes'
									/>
								</label>
								<ActionButton text="Submit" />
							</>
						)}
					</Form>
				</Block>
			)}
			{listOfListings(usersBooks, 'Your Listings', loading)}
		</ListingsContainer>
	)
}
