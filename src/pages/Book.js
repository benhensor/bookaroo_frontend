import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useBooks } from '../context/BooksContext'
import { useUser } from '../context/UserContext'
import axios from 'axios'
import Button from '../components/buttons/Button'
import { useWindowWidth } from '../utils/useWindowWidth'
import { PageHeader } from '../assets/styles/GlobalStyles'
import {
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
} from '../assets/styles/BookStyles'



export default function Book() {
	const navigate = useNavigate()
	const { user } = useAuth()
	const { deleteListing } = useUser()
	const { book, bookOwner } = useBooks()
	const [bookDescription, setBookDescription] = useState(null)
	const windowSize = useWindowWidth()


	useEffect(() => {
		console.log('Book:', book, 'Book Owner:', bookOwner)
	}, [book, bookOwner])

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



	const handleBackClick = () => navigate(-1)

	const handleContactClick = () => navigate('/contact')



	const handleDeleteClick = () => {
		deleteListing(book.id)
		navigate('/dashboard')
	}



	if (!book || !bookOwner) return null



	return (
		<section>
			<PageHeader style={{ margin: 'var(--lg) 0' }}>
				<Button type="word" text="Back" onClick={handleBackClick} />
			</PageHeader>
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
							<OwnersNotes>
								<h3>{bookOwner.username}'s Notes</h3>
								<p>This copy is in <span>{book.condition}</span> condition.</p>
								<blockquote>"{book.notes}"</blockquote>
								<ButtonContainer>
									<Button type="action" text={`Contact ${bookOwner.username}`} onClick={handleDeleteClick} />
								</ButtonContainer>
							</OwnersNotes>
						) : (
							<OwnersNotes>
							<h3>Your Notes</h3>
							<p>This copy is in <span>{book.condition}</span> condition.</p>
							<blockquote>"{book.notes}"</blockquote>
							<ButtonContainer>
								<Button type="delete" text="Delete this listing" onClick={handleContactClick} />
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