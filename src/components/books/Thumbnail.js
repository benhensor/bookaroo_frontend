import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useBooks } from '../../context/BooksContext'
import { useMessages } from '../../context/MessagesContext'
import { useDashboard } from '../../context/DashboardContext'
import { calcDistance } from '../../utils/calculateDistance'
import Heart from '../../icons/Heart'
import ThumbnailButton from '../buttons/ThumbnailButton'
import {
	BookContainer,
	BookCoverContainer,
	BookCover,
	ContactedSash,
	Controls,
	ButtonContainer,
	BookDetails,
} from '../../assets/styles/ThumbnailStyles'

export default function Thumbnail({ book }) {
	const { user } = useAuth()
	const { deleteListing } = useBooks()
	const { messagesAll } = useMessages()
	const { openModal } = useDashboard()
	const [isHovered, setIsHovered] = useState(false)
	const [distance, setDistance] = useState(null)
	const [hasContacted, setHasContacted] = useState(false)

	useEffect(() => {
		if (book) {	
			const userLat = user?.latitude
			const userLon = user?.longitude
			const listingLat = book.book_latitude
			const listingLon = book.book_longitude
			setDistance(calcDistance(userLat, userLon, listingLat, listingLon))
		}
	}, [book, user])

	// check if user has contacted the book owner
	useEffect(() => {
		if (messagesAll && book) {
			const contacted = messagesAll.some(
				(message) =>
					message.sender_id === user.id && message.book_id === book.id
			)
			setHasContacted(contacted)
		} else {
			setHasContacted(false)
		}
	}, [messagesAll, book, user])

	const handleDeleteClick = (e) => {
		e.stopPropagation()
		deleteListing(book.id)
	}

	const handleContactClick = (e) => {
		e.stopPropagation()
		openModal({ book: book, type: 'contact', replyMessage: null })
	}

	const handleBookClick = () => {
		if (book) {
			openModal({ book: book, type: 'book', replyMessage: null })
		} else {
			return
		}
	}

	return (
		<>
			<BookContainer
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				onClick={handleBookClick}
			>
				<BookCoverContainer>
					<BookCover>
						<img src={book.cover_img} alt={book.title} />
						{user.id !== book.user_id && (
							<Heart
								bookId={book.id}
								onClick={(e) => e.stopPropagation()}
							/>
						)}
						{hasContacted && (
							<ContactedSash>Message Sent!</ContactedSash>
						)}
					</BookCover>
					{user.id === book.user_id && (
						<Controls $isHovered={isHovered}>
							<ThumbnailButton
								text="Delete"
								onClick={handleDeleteClick}
								width="150px"
							/>
						</Controls>
					)}
					{user.id !== book.user_id && (
						<Controls $isHovered={isHovered}>
							<ButtonContainer>
								<ThumbnailButton
									text={
										hasContacted ? 'Follow up?' : 'Contact'
									}
									onClick={handleContactClick}
								/>
							</ButtonContainer>
						</Controls>
					)}
				</BookCoverContainer>
				<BookDetails id="book-details">
					<h3>{book.title}</h3>
					<p>{book.author}</p>
					{user.id !== book.user_id && (
						<p>
							<span>{distance}</span>&nbsp;miles away
						</p>
					)}
				</BookDetails>
			</BookContainer>
		</>
	)
}
