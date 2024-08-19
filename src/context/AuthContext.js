import React, { createContext, useState, useMemo, useCallback, useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import axios from 'axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [isAuthenticated, setIsAuthenticated] = useState(
		!!sessionStorage.getItem('authToken')
	)
	const queryClient = useQueryClient()

	const { isLoading } = useQuery(
		'currentUser',
		async () => {
			const token = sessionStorage.getItem('authToken')
			if (!token) throw new Error('No token found')
			const { data } = await axios.get(
				`${process.env.REACT_APP_API_URL}/api/users/current`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			return data
		},
		{
			onSuccess: (data) => {
				setUser(data)
				setIsAuthenticated(true)
			},
			onError: () => {
				sessionStorage.removeItem('authToken')
				setUser(null)
				setIsAuthenticated(false)
			},
			enabled: !!sessionStorage.getItem('authToken'), // only run query if token exists
		}
	)

	useEffect(() => {
		if (user) {
			// Invalidate the messages query when the user changes
			queryClient.invalidateQueries('messages');
		}
	}, [user, queryClient]);

	// Wrap login and logout in useCallback to prevent unnecessary re-creations
	const login = useCallback(
		async (credentials) => {
			try {
				const response = await axios.post(
					`${process.env.REACT_APP_API_URL}/api/auth/login`,
					credentials,
					{
						withCredentials: true,
						headers: {
							'Content-Type': 'application/json',
						}
					}
				)
				const { token, user } = response.data

				sessionStorage.setItem('authToken', token)
				setUser(user)
				setIsAuthenticated(true)
				queryClient.invalidateQueries('currentUser') // refetch the user data
				// console.log('Logged in successfully'); // Debugging log
			} catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      throw error;
    }
  },
  [queryClient]
);

	const logout = useCallback(() => {
		sessionStorage.removeItem('authToken')
		setUser(null)
		setIsAuthenticated(false)
		queryClient.clear()
	}, [queryClient])

	const updateUserDetails = async (updatedUser) => {
		const token = sessionStorage.getItem('authToken')
		if (!token) return

		try {
			const res = await axios.put(
				`${process.env.REACT_APP_API_URL}/api/users/update`,
				updatedUser,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			setUser(res.data)
		} catch (error) {
			console.error('Error updating user data:', error)
		}
	}

	const updateUserPreferences = async (preferences) => {
		const token = sessionStorage.getItem('authToken')
		if (!token) return

		try {
			await axios.put(
				`${process.env.REACT_APP_API_URL}/api/users/preferences`,
				{ preferences },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
					withCredentials: true,
				}
			)

			setUser((prevUser) => ({
				...prevUser,
				preferences: preferences,
			}))
		} catch (error) {
			console.error('Error updating preferences:', error)
			throw error
		}
	}

	const searchUsers = async (userId) => {
		const token = sessionStorage.getItem('authToken')
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_API_URL}/api/users/search`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
					params: { userId },
				}
			)
			return response.data // Ensure the data is being returned
		} catch (error) {
			console.error('Error searching for users:', error)
			return null // Return null or handle the error gracefully
		}
	}

	const contextValue = useMemo(
		() => ({
			user,
			isAuthenticated,
			isLoading, // React Query's loading state
			login,
			logout,
			updateUserDetails,
			updateUserPreferences,
			searchUsers,
		}),
		[user, isAuthenticated, isLoading, login, logout] // Now these functions are stable
	)

	return (
		<AuthContext.Provider value={contextValue}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => React.useContext(AuthContext)
