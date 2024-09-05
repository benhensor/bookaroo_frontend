import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useUser } from '../../context/UserContext'
import axios from 'axios'
import ActionButton from '../buttons/ActionButton'
import LinkButton from '../buttons/LinkButton'
import Button from '../buttons/Button'
import { useWindowWidth } from '../../utils/useWindowWidth'
import { PageHeader } from '../../assets/styles/GlobalStyles'
import {
	BookDetailHeader,
	Row,
	Category,
	BookDetailsContainer,
	BookPreview,
	BookCover,
	BookInfoContainer,
	Title,
	Subtitle,
	BookInfo,
	OwnersNotes,
	ButtonContainer,
	BookDescription,
} from '../../assets/styles/BookStyles'



export default function BookDetail() {
	const navigate = useNavigate()
	const location = useLocation()
	const { user } = useAuth()
	const { getUserById, deleteListing } = useUser()
	const [book, setBook] = useState(location.state?.book || null)
	const [bookOwner, setBookOwner] = useState(null)
	const [bookDescription, setBookDescription] = useState(null)
	const windowSize = useWindowWidth()

	// Redirect to a safe location if book state is not available
	useEffect(() => {
		if (!book) {
				navigate(-1); // or any other fallback route
		}
}, [book, navigate]);

	// Fetch book owner data when component mounts or when the book changes
	useEffect(() => {
		const fetchBookOwner = async () => {
			try {
				const owner = await getUserById(book.userId)
				setBookOwner(owner) // Set the book owner in state
			} catch (error) {
				console.error('Error fetching book owner:', error)
			}
		}

		if (book?.userId) {
			fetchBookOwner()
		}
	}, [book, getUserById])


	useEffect(() => {
		if (book?.isbn) {
			const fetchDescription = async () => {
				try {
					const { data } = await axios.get(
						`https://www.googleapis.com/books/v1/volumes?q=isbn:${book.isbn}`
					)
					const description = data.items?.[0]?.volumeInfo?.description || null
					setBookDescription(description)
				} catch (error) {
					console.error('Error fetching book description:', error)
				}
			}
			fetchDescription()
		}
	}, [book])

	// useEffect(() => {
	// 	console.log('book:', book, 'bookOwner:', bookOwner)
	// }, [book, bookOwner])


	const handleBackClick = () => {
		setBook(null)	
	}

	const handleContactClick = () => navigate('/contact')



	const handleDeleteClick = () => {
		deleteListing(book.id)
		navigate('/dashboard')
	}



	if (!book) return null



	return (
		<section>
			<BookDetailHeader style={{ margin: 'var(--lg) 0' }}>
				<LinkButton text="Back" onClick={handleBackClick} />
			</BookDetailHeader>
			<Row>
				<Category>
					This item can be found in {book.category.join(' | ')}
				</Category>
			</Row>
			<Row>
				<BookDetailsContainer>
					<BookPreview>
						<BookCover src={book.coverImg} alt={book.title} />
					</BookPreview>
					<BookInfoContainer>
						<div>
							<Title>{book.title}</Title>
							<Subtitle><span>{book.author}</span> (author)</Subtitle>
							<BookInfo>
								<p>{book.isbn}</p>
								<p>Published: {new Date(book.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
								<p>{book.publisher}</p>
							</BookInfo>
						</div>
						{user.id !== book.userId ? (
							bookOwner && (
								<OwnersNotes>
									<h3>{bookOwner.username}'s Notes</h3>
									<p>This copy is in <span>{book.condition}</span> condition.</p>
									<blockquote>"{book.notes}"</blockquote>
									<ButtonContainer>
										<ActionButton text={`Contact ${bookOwner.username}`} onClick={handleContactClick} />
									</ButtonContainer>
								</OwnersNotes>
							)
						) : (
							<OwnersNotes>
								<h3>Your Notes</h3>
								<p>This copy is in <span>{book.condition}</span> condition.</p>
								<blockquote>"{book.notes}"</blockquote>
								<ButtonContainer>
									<ActionButton text="Delete this listing" onClick={handleDeleteClick} />
								</ButtonContainer>
							</OwnersNotes>
						)}
					</BookInfoContainer>
				</BookDetailsContainer>
			</Row>
			<Row>
				<BookDescription>
					<h3>Blurb</h3>
					<p>{bookDescription || 'No description available.'}</p>
				</BookDescription>
			</Row>
			{windowSize <= 450 && (
				<Row>
					<Button type="word" text="Return" onClick={handleBackClick} />
				</Row>
			)}
		</section>
	)
}