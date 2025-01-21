import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useUser } from '../../context/UserContext'
import { useDashboard } from '../../context/DashboardContext'
import axios from 'axios'
import {
	BookDetailContainer,
	Row,
	CloseButton,
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
	ActionButton,
} from '../../assets/styles/BookDetailStyles'

export default function BookDetail({ book }) {
	const { user } = useAuth()
	const { getUserById, deleteListing } = useUser()
	const { openModal, closeModal } = useDashboard()
	const [bookOwner, setBookOwner] = useState(null)
	const [bookDescription, setBookDescription] = useState(null)

	useEffect(() => {
		const fetchBookOwner = async () => {
			try {
				const owner = await getUserById(book.user_id)
				setBookOwner(owner)
			} catch (error) {
				console.error('Error fetching book owner:', error)
			}
		}

		if (book?.user_id) {
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
					const description =
						data.items?.[0]?.volumeInfo?.description || null
					setBookDescription(description)
				} catch (error) {
					console.error('Error fetching book description:', error)
				}
			}
			fetchDescription()
		}
	}, [book])

	const handleDeleteClick = () => {
		deleteListing(book.id)
	}

	if (!book) return null

	return (
		<BookDetailContainer>
			<Row>
				<CloseButton onClick={() => closeModal()}>Close</CloseButton>
			</Row>
			<Row>
				<Category>
					This item can be found in {book.category.join(' | ')}
				</Category>
			</Row>
			<Row>
				<BookDetailsContainer>
					<BookPreview>
						<BookCover src={book.cover_img} alt={book.title} />
					</BookPreview>
					<BookInfoContainer>
						<div>
							<Title>{book.title}</Title>
							<Subtitle>
								<span>{book.author}</span> (author)
							</Subtitle>
							<BookInfo>
								<p>{book.isbn}</p>
								<p>
									Published:{' '}
									{new Date(
										book.published_date
									).toLocaleDateString('en-US', {
										year: 'numeric',
										month: 'long',
										day: 'numeric',
									})}
								</p>
								<p>{book.publisher}</p>
							</BookInfo>
						</div>
						{user.id !== book.user_id ? (
							bookOwner && (
								<OwnersNotes>
									<h3>{bookOwner.username}'s Notes</h3>
									<p>
										This copy is in{' '}
										<span>{book.condition}</span> condition.
									</p>
									<blockquote>"{book.notes}"</blockquote>
									<ButtonContainer>
										<ActionButton
											onClick={() =>
												openModal({
													book: book,
													type: 'contact',
												})
											}
										>
											Contact {bookOwner.username}
										</ActionButton>
									</ButtonContainer>
								</OwnersNotes>
							)
						) : (
							<OwnersNotes>
								<h3>Your Notes</h3>
								<p>
									This copy is in{' '}
									<span>{book.condition}</span> condition.
								</p>
								<blockquote>"{book.notes}"</blockquote>
								<ButtonContainer>
									<ActionButton
										$delete={true}
										onClick={handleDeleteClick}
									>
										Delete this listing
									</ActionButton>
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
		</BookDetailContainer>
	)
}
