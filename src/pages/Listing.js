import React, { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../context/AuthContext'
import { useUser } from '../context/UserContext'
import axios from 'axios'
import Button from '../components/buttons/Button'
import { PageHeader } from '../assets/styles/GlobalStyles'
import { Block, ErrorMessage, SuccessMessage } from '../assets/styles/ListingStyles'


export default function Listing() {
	const { user } = useAuth()
	const { createListing } = useUser()
	const [searchTerm, setSearchTerm] = useState('')
	const [bookResults, setBookResults] = useState([])
	const [isbn, setIsbn] = useState('')
	const [message, setMessage] = useState('')
	const [error, setError] = useState('')

	const [bookData, setBookData] = useState({
		isbn: '',
		coverImg: '',
		title: '',
		author: '',
		publishedDate: '',
		publisher: '',
		category: '',
		condition: '',
		notes: '',
		userId: user?.id || '',
	})

	const handleReset = useCallback(() => {
		setSearchTerm('')
		setBookResults([])
		setIsbn('')
		setMessage('')
		setError('')
		setBookData({
			isbn: '',
			coverImg: '',
			title: '',
			author: '',
			publishedDate: '',
			publisher: '',
			category: '',
			condition: '',
			notes: '',
			userId: user?.id || '',
		})
	}, [user])

	const genres = [
		'Mystery',
		'Comedy',
		'Romance',
		'Science Fiction',
		'Fantasy',
		'Thriller/Suspense',
		'Historical Fiction',
		'Young Adult',
		'Horror',
		'Fiction',
		'Non-Fiction',
		'Biography & Autobiography',
		'History',
		'Politics',
	]

	// Reset state on component mount
	useEffect(() => {
		handleReset()
	}, [user, handleReset])

	const handleSearch = async (e) => {
		e.preventDefault()
		try {
			const response = await axios.get(
				`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
					searchTerm
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
		if (url.startsWith('http:')) {
			return url.replace('http:', 'https:')
		}
		return url
	}

	const handleSelectBook = async (e) => {
		const bookId = e.target.value
		const book = bookResults.find((book) => book.id === bookId)

		if (book) {
			try {
				// Fetch detailed book information using the selfLink
				const detailsResponse = await axios.get(book.selfLink)

				const detailedBook = detailsResponse.data
				const isbnValue =
					detailedBook.volumeInfo.industryIdentifiers?.find(
						(id) => id.type === 'ISBN_13'
					)?.identifier || ''

				setIsbn(isbnValue)
				setBookData({
					isbn: isbnValue || '',
					coverImg: ensureHttps(
						detailedBook.volumeInfo.imageLinks.extraLarge ||
							detailedBook.volumeInfo.imageLinks.large ||
							detailedBook.volumeInfo.imageLinks.medium ||
							detailedBook.volumeInfo.imageLinks.small ||
							detailedBook.volumeInfo.imageLinks.thumbnail ||
							''
					),
					title: detailedBook.volumeInfo.title || '',
					author: detailedBook.volumeInfo.authors?.join(', ') || '',
					publishedDate: detailedBook.volumeInfo.publishedDate || '',
					publisher: detailedBook.volumeInfo.publisher || '',
					category: bookData.category || '',
					condition: '',
					notes: '',
					userId: user?.id || '',
				})
				setError('') // Clear any previous errors
			} catch (error) {
				console.error('Error fetching detailed book info:', error)
				setError('An error occurred while retrieving book details.')
			}
		}
	}

	const handleInputChange = (e) => {
    const { name, value } = e.target;

    setBookData((prevData) => ({
        ...prevData,
        [name]: name === 'category' ? [value] : value, // Store as an array with one element
    }));
	};

	const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bookData.title || !bookData.condition || !bookData.category.length) {
      setError('Please fill in all required fields.');
      return;
    }

    const response = await createListing(bookData);

    if (response.success) {
      setMessage('Book listed successfully!');
      handleReset();
    } else {
      setError(response.message || 'An error occurred. Please try again.');
    }
  };

	return (
		<section>
			<PageHeader>
				<h1>List a book...</h1>
				<Button type="word" to="/dashboard" text="Return" />
			</PageHeader>

			<Block>
				<form onSubmit={handleSearch}>
					<label>
						Search Book:
						<input
							type="text"
							value={searchTerm}
							placeholder="Search by title, author, or ISBN"
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
						<Button type="action" text="Search" />
					</label>
					{error && <ErrorMessage>{error}</ErrorMessage>}
					{message && <SuccessMessage>{message}</SuccessMessage>}
				</form>
			</Block>

			{bookResults.length > 0 && (
				<Block>
					<form onSubmit={handleSubmit}>
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
										{/* {console.log('Selected book:', bookData.coverImg)} */}
										<img
											src={bookData.coverImg}
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
													Genre:
													<select
														name="category"
														value={bookData.category[0] || ''}
														onChange={handleInputChange}
													>
														<option value="">Select Genre</option>
														{genres.map((genre) => (
															<option key={genre} value={genre}>
																{genre}
															</option>
														))}
													</select>
												</label>
								<label>
									Condition:
									<select
										name="condition"
										value={bookData.condition}
										onChange={handleInputChange}
										required
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
									/>
								</label>
								<Button type="action" text="Submit" />
							</>
						)}
					</form>
				</Block>
			)}
		</section>
	)
}