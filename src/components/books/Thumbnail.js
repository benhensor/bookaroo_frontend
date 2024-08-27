import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useUser } from '../../context/UserContext'
import { useMessages } from '../../context/MessagesContext'
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
	const navigate = useNavigate()
	const { user } = useAuth()
	const { deleteListing } = useUser()
	const { messagesAll } = useMessages()
	const [isHovered, setIsHovered] = useState(false)
	const [distance, setDistance] = useState(null)
	const [hasContacted, setHasContacted] = useState(false)

	useEffect(() => {
		if (book) {
			const userLat = user?.latitude
			const userLon = user?.longitude
			const listingLat = book.bookLatitude
			const listingLon = book.bookLongitude
			setDistance(calcDistance(userLat, userLon, listingLat, listingLon))
		}
	}, [book, user])



	// check if user has contacted the book owner
	useEffect(() => {
		if (messagesAll && book) {
			const contacted = messagesAll.some(
				(message) =>
					message.senderId === user.id && message.bookId === book.id
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
		if (book) {
			navigate(`/contact`, { state: { book } })
		} else {
			console.error('Book is not properly defined')
		}
	}



	const handleBookClick = () => {
		if (book) {
			navigate(`/book`, { state: { book } })
		} else {
			console.error('Book is not properly defined')
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
						<img src={book.coverImg} alt={book.title} />
						{user.id !== book.userId && (
							<Heart
								bookId={book.id}
								onClick={(e) => e.stopPropagation()}
							/>
						)}
						{hasContacted && <ContactedSash>Message Sent!</ContactedSash>}
					</BookCover>
					{user.id === book.userId && (
						<Controls $isHovered={isHovered}>
							<ThumbnailButton
								text="Delete"
								onClick={handleDeleteClick}
								width="150px"
							/>
						</Controls>
					)}
					{user.id !== book.userId && (
						<Controls $isHovered={isHovered}>
							<ButtonContainer>
								<ThumbnailButton
									text={hasContacted ? 'Follow up?' : 'Contact'}
									onClick={handleContactClick}
								/>
							</ButtonContainer>
						</Controls>
					)}
				</BookCoverContainer>
				<BookDetails id="book-details">
					<h3>{book.title}</h3>
					<p>{book.author}</p>
					{user.id !== book.userId && (
						<p>
							<span>{distance}</span>&nbsp;miles away
						</p>
					)}
				</BookDetails>
			</BookContainer>
		</>
	)
}