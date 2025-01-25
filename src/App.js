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
import { DashboardProvider } from './context/DashboardContext'
import Header from './components/header/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Footer from './components/footer/Footer'
import ProtectedRoute from './components/protectedRoute/ProtectedRoute'

const queryClient = new QueryClient()

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<BooksProvider>
					<UserProvider>
						<MessagesProvider>
							<DashboardProvider>
								<Router>
									<Header />
									<main>
										<Routes>
											{/* PUBLIC ROUTES */}
											<Route path="*" element={<Home />}/>
											<Route path="/app/register" element={<Register />} />
											<Route path="/app/login" element={<Login />} />

											{/* PROTECTED ROUTE */}
											<Route path="/app/dashboard" element={
												<ProtectedRoute>
													<Dashboard />
												</ProtectedRoute>
											} />
										</Routes>
									</main>
									<Footer />
								</Router>
							</DashboardProvider>
						</MessagesProvider>
					</UserProvider>
				</BooksProvider>
			</AuthProvider>
		</QueryClientProvider>
	)
}

export default App