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
import Listing from './pages/Listing'
import Contact from './pages/Contact'
import Browse from './pages/Browse'
import Book from './pages/Book'
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
											<Route path="/register" element={<Register />} />
											<Route path="/login" element={<Login />} />
											<Route path="/dashboard" element={
												<ProtectedRoute>
													<Dashboard />
												</ProtectedRoute>
											} />
											<Route path="/list" element={
												<ProtectedRoute>
													<Listing />
												</ProtectedRoute>
											} />
											<Route path="/contact" element={
												<ProtectedRoute>
													<Contact />
												</ProtectedRoute>
											} />
											<Route path="/browse" element={
												<ProtectedRoute>
													<Browse />
												</ProtectedRoute>
											} />
											<Route path="/book" element={
												<ProtectedRoute>
													<Book />
												</ProtectedRoute>
											} />
											<Route path="*" element={<Home />}/>
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