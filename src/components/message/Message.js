import React from 'react'
import { useBooks } from '../../context/BooksContext'
import { useMessages } from '../../context/MessagesContext'
import CollapsibleItem from '../dashboard/CollapsibleItem'
import Button from '../buttons/Button'
import Trash from '../../icons/Trash'
import {
  MessageContainer,
  StyledMessage,
  MessageContent,
  MessageBody,
  MessageControls,
} from '../../assets/styles/MessageStyles'


export default function Message({ message, isOpen, onToggle }) {

  const { setBook, setBookOwner, getBookById } = useBooks()
	const { markAsUnread, deleteMessage } = useMessages()

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
    const book = getBookById(message.bookId)
    if (book) {
      setBook(book)
      setBookOwner(book.user[0]) // Assuming book.user is an array
      // Navigate to the reply form, e.g., using `navigate('/contact')`
    } else {
      console.error('Book not found')
    }
  }


  const handleMarkUnread = () => {
    markAsUnread(message.id)
    onToggle()
  }
  

	return (
		<MessageContainer>
			<StyledMessage
        $isActive={isOpen}
      >
        <CollapsibleItem
          message={true}
          onClick={onToggle}
          isActive={isOpen}
          text={
            <p>
              {formatDate(message.createdAt)} - From{' '}
              <span>{message.sender.username}</span>
            </p>
          }
          isRead={message.isRead}
        />
      </StyledMessage>
        {isOpen && (
          <MessageContent>
            <MessageBody>
              <p>{message.message}</p>
            </MessageBody>
            <MessageControls>
              <div>
                <Button type="message" text="Reply" onClick={handleReplyClick} to='/contact' state={{message}} />
                <Button type="message" text="Mark as unread" onClick={handleMarkUnread} />
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