import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useMessages } from '../context/MessagesContext'
import { useBooks } from '../context/BooksContext'
import { formatDate } from '../utils/formatDate'
import { PageHeader, Content } from '../assets/styles/GlobalStyles'
import ExchangePreview from '../components/books/ExchangePreview'
import Button from '../components/buttons/Button'
import {
	Layout,
	ContactFormContainer,
	ContactForm,
	FormHeader,
	FormField,
	MessageArea,
} from '../assets/styles/ContactStyles'

export default function Contact() {
	const navigate = useNavigate()
	const location = useLocation()
	const { user } = useAuth()
	const { book, bookOwner, setBook, setBookOwner } = useBooks()
	const { sendMessage } = useMessages()
	const [message, setMessage] = useState('')
	const messageData = useMemo(() => location.state?.message || {}, [location.state?.message])



	useEffect(() => {
		if (messageData?.createdAt && messageData.sender?.username) {
				const {
						dayName,
						dayNumber,
						monthName,
						year,
						daySuffix,
				} = formatDate(messageData.createdAt)

				setMessage(
						`On ${dayName} ${dayNumber}${daySuffix} ${monthName} ${year} ${
								messageData.sender.username
						} wrote:\n\n${messageData.message}\n`
				)
		}
	}, [messageData])



	const handleSubmit = async (e) => {
		e.preventDefault()
		if (!book || !bookOwner) {
			console.error('Book or book owner is not set');
			return;
		}
	
		// Determine the recipient of the message
		const recipientId = messageData?.senderId && messageData.senderId !== user.id ? messageData.senderId : book.userId
		const subjectLine = `Regarding: ${book.title} by ${book.author}`

		if (!recipientId) {
			console.error('Recipient ID not found')
			return
		}

		const newMessageData = {
			senderId: user.id,
			recipientId: recipientId,
			bookId: book.id,
			message: `${subjectLine}\n\n${message}`,
			isRead: false,
		}
		try {
			await sendMessage(newMessageData)
			setBook(null)
			setBookOwner(null)
			navigate('/dashboard')
		} catch (error) {
			console.error('Error sending message:', error)
		}
		
	}



	return (
		<section>
			<PageHeader>
				<h1>Contact</h1>
				<Button
					type="word"
					text="Return"
					to="/dashboard"
				/>
			</PageHeader>

			<Content>
				<Layout>
					<ExchangePreview book={book} bookOwner={bookOwner} />
					<ContactFormContainer onSubmit={handleSubmit}>
						<FormHeader>New Message</FormHeader>
						<ContactForm>
							<FormField>
								<label>To:</label>
								<input
									type="text"
									value={bookOwner?.username}
									readOnly
								/>
							</FormField>
							<FormField>
								<input
									type="text"
									value={`${book?.title} by ${book?.author}`}
									readOnly
								/>
							</FormField>
							<MessageArea
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								placeholder="Hi! I'm interested in your book..."
							/>
							<Button
								type="action"
								text="Send"
								onClick={handleSubmit}
							/>
						</ContactForm>
					</ContactFormContainer>
				</Layout>
			</Content>
		</section>
	)
}