import React, {
	createContext,
	useState,
	useEffect,
	useMemo,
	useCallback,
} from 'react'
import { useQueryClient } from 'react-query'
import axios from 'axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const queryClient = useQueryClient()

	useEffect(() => {
		const checkAuthStatus = async () => {
			setIsLoading(true)
			try {
				const { data } = await axios.get(
					`${process.env.REACT_APP_API_URL}/api/auth/current`,
					{
						withCredentials: true,
					}
				)
				setUser(data)
				setIsAuthenticated(true)
			} catch (error) {
				console.error('Not authenticated', error)
				setUser(null)
				setIsAuthenticated(false)
			} finally {
				setIsLoading(false)
			}
		}

		checkAuthStatus()
	}, [])

	const registerUser = async (values) => {
		// console.log('registering:', values)
		try {
			const { email, username, postcode, password } = values
			const response = await axios.post(
				`${process.env.REACT_APP_API_URL}/api/auth/register`,
				{ email, username, postcode, password }
			)
			console.log(`${response.username} has been registered`)
		} catch (error) {
			console.error(error.response.data)
		}
	}

	const login = useCallback(
		async (credentials) => {
			setIsLoading(true)
			try {
				const { data } = await axios.post(
					`${process.env.REACT_APP_API_URL}/api/auth/login`,
					credentials,
					{
						withCredentials: true, // Include cookies with the request
						headers: {
							'Content-Type': 'application/json',
						},
					}
				)
				setUser(data.user) // Set the user data directly from the login response
				setIsAuthenticated(true)
				queryClient.invalidateQueries('currentUser') // Invalidate any stale queries related to the user
			} catch (error) {
				console.error(
					'Login error:',
					error.response ? error.response.data : error.message
				)
				setUser(null)
				setIsAuthenticated(false)
				throw error
			} finally {
				setIsLoading(false)
			}
		},
		[queryClient]
	)

	const logout = useCallback(
		async (credentials) => {
			console.log('Logging out...')
			try {
				const response = await axios.post(
					`${process.env.REACT_APP_API_URL}/api/auth/logout`,
					credentials,
					{
						withCredentials: true, // Include cookies with the request
						headers: {
							'Content-Type': 'application/json',
						},
					}
				)
				if (response.status === 200) {
					console.log('Logout successful')
					setUser(null)
					setIsAuthenticated(false)
					queryClient.clear() // Clear the cache after logging out
				} else {
					console.error('Logout failed:', response)
				}
			} catch (error) {
				console.error('Logout error:', error)
			}
		},
		[queryClient]
	)

	const contextValue = useMemo(
		() => ({
			user,
			isAuthenticated,
			isLoading, // React Query's loading state
			registerUser,
			login,
			logout,
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
