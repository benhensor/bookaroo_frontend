import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const ProtectedRoute = ({ children }) => {
	const { isLoading, isAuthenticated } = useAuth()

	if (isLoading) {
		return <div>Loading...</div> 
	}

	if (!isAuthenticated) {
		return <Navigate to="/login" replace />
	}

	return children
}

export default ProtectedRoute
