import React from 'react'
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AuthProvider } from './context/AuthContext'
import { UserProvider } from './context/UserContext'
import { BooksProvider } from './context/BooksContext'
import { MessagesProvider } from './context/MessagesContext'
import Header from './components/header/Header'
import Home from './pages/Home'
import Login from './components/login/Login'
import Register from './components/register/Register'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/protectedRoute/ProtectedRoute'

const queryClient = new QueryClient()

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<BooksProvider>
					<UserProvider>
						<MessagesProvider>
							<Router>
								<Header />
								<main>
									<Routes>
										{/* PUBLIC ROUTES */}
										<Route path="*" element={<Home />}/>
										<Route path="/register" element={<Register />} />
										<Route path="/login" element={<Login />} />

										{/* PROTECTED ROUTE */}
										<Route path="/dashboard" element={
											<ProtectedRoute>
												<Dashboard />
											</ProtectedRoute>
										} />
									</Routes>
								</main>
							</Router>
						</MessagesProvider>
					</UserProvider>
				</BooksProvider>
			</AuthProvider>
		</QueryClientProvider>
	)
}

export default App