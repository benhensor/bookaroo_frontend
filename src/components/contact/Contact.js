import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useUser } from '../../context/UserContext'
import { useMessages } from '../../context/MessagesContext'
import { useDashboard } from '../../context/DashboardContext'
import { formatDate } from '../../utils/formatDate'
import ExchangePreview from '../books/ExchangePreview'
import ActionButton from '../buttons/ActionButton'
import {
	ContactHeader,
	CloseButton,
	Layout,
	ContactFormContainer,
	ContactForm,
	FormHeader,
	FormField,
	MessageArea,
} from '../../assets/styles/ContactStyles'

export default function Contact({ book, replyMessage }) {
	const { user } = useAuth()
	const { getUserById } = useUser()
	const { sendMessage } = useMessages()
	const { closeModal } = useDashboard()
	const messageData = replyMessage
	const [recipient, setRecipient] = useState(null)
	const [message, setMessage] = useState('')

	useEffect(() => {
		const fetchBookOwner = async () => {
			try {
				const owner = await getUserById(book.user_id)
				setRecipient(owner)
			} catch (error) {
				console.error('Error fetching book owner:', error)
			}
		}

		if (book?.user_id) {
			fetchBookOwner()
		}
	}, [book, getUserById])

	useEffect(() => {
		if (messageData?.created_at && messageData.sender?.username) {
			const { dayName, dayNumber, monthName, year, daySuffix } =
				formatDate(messageData.created_at)

			setMessage(
				`On ${dayName} ${dayNumber}${daySuffix} ${monthName} ${year} ${messageData.sender.username} wrote:\n\n${messageData.message}\n`
			)
		}
	}, [messageData])

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (!book) {
			console.error('Book or book owner is not set')
			return
		}

		// Determine the recipient of the message
		const recipient_id =
			messageData?.sender_id && messageData.sender_id !== user.id
				? messageData.sender_id
				: book.user_id
		const subjectLine = `Regarding: ${book.title} by ${book.author}`

		if (!recipient_id) {
			console.error('Recipient ID not found')
			return
		}

		const newMessageData = {
			sender_id: user.id,
			recipient_id: recipient_id,
			book_id: book.id,
			message: `${subjectLine}\n\n${message}`,
			is_read: false,
		}
		try {
			await sendMessage(newMessageData)
			closeModal()
		} catch (error) {
			console.error('Error sending message:', error)
		}
	}

	return (
		<section>
			<ContactHeader>
				<CloseButton onClick={() => closeModal()}>Close</CloseButton>
				<h1>Contact</h1>
			</ContactHeader>

			<div>
				<Layout>
					<ExchangePreview book={book} bookOwner={recipient} />
					<ContactFormContainer onSubmit={handleSubmit}>
						<FormHeader>New Message</FormHeader>
						<ContactForm>
							<FormField>
								<label>To:</label>
								<input
									type="text"
									value={recipient?.username || ''}
									readOnly
								/>
							</FormField>
							<FormField>
								<input
									type="text"
									value={
										`${book?.title} by ${book?.author}` ||
										''
									}
									readOnly
								/>
							</FormField>
							<MessageArea
								value={message || ''}
								onChange={(e) => setMessage(e.target.value)}
								placeholder="Hi! I'm interested in your book..."
							/>
							<ActionButton text="Send" onClick={handleSubmit} />
						</ContactForm>
					</ContactFormContainer>
				</Layout>
			</div>
		</section>
	)
}
