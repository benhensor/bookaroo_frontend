import React, { createContext, useContext, useCallback } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useAuth } from './AuthContext'
import axios from 'axios'

const MessagesContext = createContext()

export const MessagesProvider = ({ children }) => {
	const queryClient = useQueryClient()
	const { user } = useAuth()

	const fetchMessages = async () => {
		const token = sessionStorage.getItem('authToken')
		if (!token) {
			throw new Error('User not authenticated')
		}
		// console.log(token)
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/api/messages/inbox`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)
		return data
	}

	const {
		data: messages,
		isLoading: isMessagesLoading,
		isError,
	} = useQuery(
		['messages', user?.id],
		async () => {
			const token = sessionStorage.getItem('authToken')
			if (!token) throw new Error('User not authenticated')
			return fetchMessages()
		},
		{
			enabled: !!user?.id, // Only run the query if the user is defined
			refetchOnWindowFocus: false,
			refetchOnMount: true,
			staleTime: Infinity, // This prevents automatic refetches
		}
	)

  const getAllMessages = async () => {
    const token = sessionStorage.getItem('authToken')
    if (!token) throw new Error('User not authenticated')
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/messages/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return data
      
    } catch (error) {
      console.error('Error fetching all messages:', error)
      throw new Error('Internal server error')
    }
  }

  const { data: messagesAll } = useQuery(
    'messages',
    getAllMessages,
    {
      enabled: !!user?.id,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      staleTime: Infinity,
    }
  )


  const getMessageById = () => {}

	const deleteMessage = useMutation(
		async (messageId) => {
			const token = sessionStorage.getItem('authToken')
			await axios.delete(
				`${process.env.REACT_APP_API_URL}/api/messages/delete/${messageId}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
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
			const token = sessionStorage.getItem('authToken')
			await axios.put(
				`${process.env.REACT_APP_API_URL}/api/messages/mark/${messageId}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
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
			const token = sessionStorage.getItem('authToken')
			await axios.put(
				`${process.env.REACT_APP_API_URL}/api/messages/unread/${messageId}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
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
			const token = sessionStorage.getItem('authToken')
			await axios.post(
				`${process.env.REACT_APP_API_URL}/api/messages/send`,
				messageData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
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
