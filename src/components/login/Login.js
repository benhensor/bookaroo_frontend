import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Button from '../buttons/Button'
import { Content } from '../../assets/styles/GlobalStyles'
import { P } from '../../assets/styles/LoginStyles'

const Login = () => {
	const navigate = useNavigate()
	const { login } = useAuth()
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})

	const { email, password } = formData

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value })

	const onSubmit = async (e) => {
		e.preventDefault()
		try {
			await login({
				email,
				password,
			})
			console.log('Logged in successfully')
			navigate('/dashboard')
		} catch (error) {
			console.error('Error during login:', error.message);
		} 
	}

	return (
		<section>
			<Content>
				<h1>Login</h1>
				<form onSubmit={onSubmit}>
					<input
						type="email"
						name="email"
						value={email}
						onChange={onChange}
						placeholder="Email"
						required
					/>
					<input
						type="password"
						name="password"
						value={password}
						onChange={onChange}
						placeholder="Password"
						required
					/>
					<Button type="action" text="Login" />
				</form>
				<P>Don't have an account? &nbsp;<Button type="word" to="/register" text="Register" /></P>
				
			</Content>
		</section>
	)
}

export default Login