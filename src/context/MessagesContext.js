import React, { createContext, useContext, useCallback } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useAuth } from './AuthContext'
import axios from 'axios'

const MessagesContext = createContext()

export const MessagesProvider = ({ children }) => {
	const queryClient = useQueryClient()
	const { user, isAuthenticated } = useAuth()

	const fetchMessages = async () => {
		// Check if the user is authenticated before making the API call
		// if (!isAuthenticated || !user) {
			// 	throw new Error('User not authenticated')
			// }
			// console.log('messages context:', user)
			if (user && isAuthenticated) {
			console.log('fetchMessages:', user, isAuthenticated)
			const { data } = await axios.get('https://bookaroo-backend.vercel.app/api/messages/inbox', { withCredentials: true })
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


  const getMessageById = () => {}

	const deleteMessage = useMutation(
		async (messageId) => {
			await axios.delete(
				`${process.env.REACT_APP_API_URL}/api/messages/delete/${messageId}`,
				{
					withCredentials: true,
				}
			)
		},
		{
			onMutate: async (messageId) => {
				await queryClient.cancelQueries('messages')
				const previousMessages = queryClient.getQueryData('messages')

				queryClient.setQueryData('messages', (old) => {
					if (!old) return []
					return old.filter((message) => message.id !== messageId)
				})

				return { previousMessages }
			},
			onError: (err, messageId, context) => {
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

	const markAsRead = useMutation(
		async (messageId) => {
			await axios.put(
				`${process.env.REACT_APP_API_URL}/api/messages/mark/${messageId}`,
				{},
				{
					withCredentials: true,
				}
			)
		},
		{
			onMutate: async (messageId) => {
				await queryClient.cancelQueries('messages')
				const previousMessages = queryClient.getQueryData('messages')

				queryClient.setQueryData('messages', (old) => {
					if (!old) return []
					return old.map((message) =>
						message.id === messageId
							? { ...message, isRead: true }
							: message
					)
				})

				return { previousMessages }
			},
			onError: (err, messageId, context) => {
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

	const markAsUnread = useMutation(
		async (messageId) => {
			await axios.put(
				`${process.env.REACT_APP_API_URL}/api/messages/unread/${messageId}`,
				{},
				{
					withCredentials: true,
				}
			)
		},
		{
			onMutate: async (messageId) => {
				await queryClient.cancelQueries('messages')
				const previousMessages = queryClient.getQueryData('messages')

				if (!previousMessages) return { previousMessages: [] }

				queryClient.setQueryData('messages', (old = []) => {
					if (!old) return []
					return old.map((message) =>
						message.id === messageId
							? { ...message, isRead: false }
							: message
					)
				})

				return { previousMessages }
			},
			onError: (err, messageId, context) => {
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

	const sendMessage = useMutation(
		async (messageData) => {
			await axios.post(
				`${process.env.REACT_APP_API_URL}/api/messages/send`,
				messageData,
				{
					withCredentials: true,
				}
			)
		},
		{
			onSettled: () => {
				queryClient.invalidateQueries('messages')
			},
		}
	)

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
        getMessageById,
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
