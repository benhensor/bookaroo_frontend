import React, { useState } from 'react'
import { useMessages } from '../../context/MessagesContext'
import Message from '../message/Message'
import { Spacer } from '../../assets/styles/GlobalStyles'
import {
  MessagesContainer,
  MessagesHeader,
  MessagingContainer,
  Feedback,
} from '../../assets/styles/MessagesStyles'

export default function Messages() {

  const { messages, isMessagesLoading, isError, markAsRead } = useMessages()
  const [openMessage, setOpenMessage] = useState(null)


  const toggleMessage = (messageId) => {
		markAsRead(messageId)
		setOpenMessage(openMessage === messageId ? null : messageId)
	}


  const renderMessages = () => {
		if (isMessagesLoading) {
			return <MessagingContainer><Feedback>Loading messages...</Feedback></MessagingContainer>
		}

		if (isError) {
			return <MessagingContainer><Feedback>Error loading messages. Please try again later.</Feedback></MessagingContainer>
		}

		if (!messages || messages.length === 0) {
			return <MessagingContainer><Feedback>No messages to display.</Feedback></MessagingContainer>
		}
		
		return (
			<MessagingContainer>
				{messages?.map((message, i) => (
					<div key={message.id}>
						{i === 0 && <hr />}
						<Message
							message={message}
							isOpen={openMessage === message.id}
							onToggle={() => toggleMessage(message.id)}
						/>
						{messages.length > 1 ? (
							<hr />
						) : (
							''
						)}
					</div>
				))}
			</MessagingContainer>
		)
	}
	
	const unreadMessagesCount = messages?.filter(message => !message.is_read).length || 0



  return (
    <MessagesContainer>
			<Spacer />
      <MessagesHeader>
        <h1>Messages</h1>
        <h4>{isMessagesLoading ? (
								'Loading messages...'
							) : isError ? (
								'Error loading messages'
							) : (
								<>
									You have&nbsp;
									{unreadMessagesCount === 0 ? (
										'no'
										) : (
										<span>{unreadMessagesCount}</span>
									)}
									&nbsp;unread&nbsp;
									{unreadMessagesCount === 1
										? 'message'
										: 'messages'}
								</>
							)}
						</h4>
      </MessagesHeader>
      {renderMessages()}
    </MessagesContainer>
  )
}
