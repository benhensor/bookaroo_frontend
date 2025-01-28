import React from 'react'
import { useBooks } from '../../context/BooksContext'
import { useMessages } from '../../context/MessagesContext'
import { useDashboard } from '../../context/DashboardContext'
import CollapsibleItem from '../dashboard/CollapsibleItem'
import MessageButton from '../buttons/MessageButton'
import Trash from '../../icons/Trash'
import {
	MessageContainer,
	StyledMessage,
	MessageContent,
	MessageBody,
	MessageControls,
} from '../../assets/styles/MessageStyles'

export default function Message({ message, isOpen, onToggle }) {
	const { getBookById } = useBooks()
	const { markAsUnread, deleteMessage } = useMessages()
	const { openModal } = useDashboard()

	const formatDate = (dateString) => {
		const date = new Date(dateString)
		return date
			.toLocaleDateString('en-GB', {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
			})
			.split('/')
			.reverse()
			.join('-')
	}

	const handleReplyClick = () => {
		const book = getBookById(message.book_id)
		openModal({ book: book, type: 'contact', replyMessage: message })
	}

	const handleMarkUnread = () => {
		markAsUnread(message.id)
		onToggle()
	}

	return (
		<MessageContainer>
			<StyledMessage $isActive={isOpen}>
				<CollapsibleItem
					message={true}
					onClick={onToggle}
					isActive={isOpen}
					text={
						<p>
							<span>{message.sender_username}</span>{' - '}
							{formatDate(message.created_at)}
						</p>
					}
					isRead={message.is_read}
				/>
			</StyledMessage>
			{isOpen && (
				<MessageContent>
					<MessageBody>
						<p>{message.message}</p>
					</MessageBody>
					<MessageControls>
						<div>
							<MessageButton
								text="Reply"
								onClick={handleReplyClick}
							/>
							<MessageButton
								text="Mark as unread"
								onClick={handleMarkUnread}
							/>
						</div>
						<Trash
							type="message"
							text="Delete"
							onClick={() => deleteMessage(message.id)}
						/>
					</MessageControls>
				</MessageContent>
			)}
		</MessageContainer>
	)
}
