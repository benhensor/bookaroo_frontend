import React, { createContext, useContext, useCallback } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useAuth } from './AuthContext'
import axios from 'axios'

const MessagesContext = createContext()

export const MessagesProvider = ({ children }) => {
	const queryClient = useQueryClient()
	const { user, isAuthenticated } = useAuth()

	// Fetch messages for the current user
	const fetchMessages = async () => {
			if (user && isAuthenticated) {
			const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/messages/inbox`, { withCredentials: true })
			return data
		}
	}

	const {
		data: messages,
		isLoading: isMessagesLoading,
		isError,
	} = useQuery(
		['messages', user?.id],
		fetchMessages,
		{
			enabled: !!user?.id && isAuthenticated, // Only run the query if the user is defined and authenticated
			refetchOnWindowFocus: false,
			refetchOnMount: true,
			staleTime: Infinity, // This prevents automatic refetches
		}
	)

	// Fetch all messages
  const getAllMessages = async () => {
    if (!isAuthenticated || !user) {
      throw new Error('User not authenticated')
    }
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/messages/all`,
        {
          withCredentials: true
        }
      )
      return data
      
    } catch (error) {
      console.error('Error fetching all messages:', error)
      throw new Error('Internal server error')
    }
  }

  const { data: messagesAll } = useQuery(
    ['allMessages', user?.id],
    getAllMessages,
    {
      enabled: !!user?.id && isAuthenticated,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      staleTime: Infinity,
    }
  )

	// Fetch a single message by its ID
	const deleteMessage = useMutation(
		async (message_id) => {
			await axios.delete(
				`${process.env.REACT_APP_API_URL}/api/messages/${message_id}`,
				{
					withCredentials: true,
				}
			)
		},
		{
			onMutate: async (message_id) => {
				await queryClient.cancelQueries('messages')
				const previousMessages = queryClient.getQueryData('messages')

				queryClient.setQueryData('messages', (old) => {
					if (!old) return []
					return old.filter((message) => message.id !== message_id)
				})

				return { previousMessages }
			},
			onError: (err, message_id, context) => {
				queryClient.setQueryData(
					'messages',
					context.previousMessages || []
				)
			},
			onSettled: () => {
				queryClient.invalidateQueries('messages')
			},
		}
	)

	// Mutation to mark a message as read
	const markAsRead = useMutation(
		async (message_id) => {
			await axios.put(
				`${process.env.REACT_APP_API_URL}/api/messages/read/${message_id}`,
				{},
				{
					withCredentials: true,
				}
			)
		},
		{
			onMutate: async (message_id) => {
				await queryClient.cancelQueries('messages')
				const previousMessages = queryClient.getQueryData('messages')

				queryClient.setQueryData('messages', (old) => {
					if (!old) return []
					return old.map((message) =>
						message.id === message_id
							? { ...message, is_read: true }
							: message
					)
				})

				return { previousMessages }
			},
			onError: (err, message_id, context) => {
				queryClient.setQueryData(
					'messages',
					context.previousMessages || []
				)
			},
			onSettled: () => {
				queryClient.invalidateQueries('messages')
			},
		}
	)

	// Mutation to mark a message as unread
	const markAsUnread = useMutation(
		async (message_id) => {
			await axios.put(
				`${process.env.REACT_APP_API_URL}/api/messages/unread/${message_id}`,
				{},
				{
					withCredentials: true,
				}
			)
		},
		{
			onMutate: async (message_id) => {
				await queryClient.cancelQueries('messages')
				const previousMessages = queryClient.getQueryData('messages')

				if (!previousMessages) return { previousMessages: [] }

				queryClient.setQueryData('messages', (old = []) => {
					if (!old) return []
					return old.map((message) =>
						message.id === message_id
							? { ...message, is_read: false }
							: message
					)
				})

				return { previousMessages }
			},
			onError: (err, message_id, context) => {
				queryClient.setQueryData(
					'messages',
					context.previousMessages || []
				)
			},
			onSettled: () => {
				queryClient.invalidateQueries('messages')
			},
		}
	)

	// Mutation to send a new message
	const sendMessage = useMutation(
		async (messageData) => {
			try {
				const response = await axios.post(
					`${process.env.REACT_APP_API_URL}/api/messages/send`,
					messageData,
					{
						withCredentials: true,
					}
				)
				return response.data
			} catch (error) {
				console.error('Send message error:', error.response?.data || error.message)
				throw error
			}
		}
	)

	// Function to manually refresh messages
	const refreshMessages = useCallback(() => {
		queryClient.invalidateQueries('messages')
	}, [queryClient])

	return (
		<MessagesContext.Provider
			value={{
				messages,
        messagesAll,
				isMessagesLoading,
				isError,
        getAllMessages,
				deleteMessage: deleteMessage.mutate,
				markAsRead: markAsRead.mutate,
				markAsUnread: markAsUnread.mutate,
				sendMessage: sendMessage.mutate,
				refreshMessages,
			}}
		>
			{children}
		</MessagesContext.Provider>
	)
}

export const useMessages = () => useContext(MessagesContext)
