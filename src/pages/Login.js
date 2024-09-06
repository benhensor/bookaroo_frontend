import React from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { loginSchema } from '../schemas/index'
import {
	Container,
	Content,
	P,
	InputGroup,
	Error,
	Button,
	StyledLink
} from '../assets/styles/RegisterLoginStyles'

const Login = () => {
	const navigate = useNavigate()
	const { login } = useAuth()

	const handleLogin = async (values) => {
		try {
			await login(values)
			navigate('/dashboard')
		} catch (error) {
			console.error('Login failed:', error)
		}
	}

	const { values, handleSubmit, handleBlur, handleChange, touched, errors } =
		useFormik({
			initialValues: {
				email: '',
				password: '',
			},
			validationSchema: loginSchema,
			onSubmit: handleLogin,
		})

	return (
		<Container>
			<Content>
				<h1>Login</h1>
				<form onSubmit={handleSubmit} method="post" autoComplete="off">
					<input
						autoComplete="off"
						name="hidden"
						type="text"
						style={{ display: 'none' }}
					/>
					<InputGroup>
						<label htmlFor="email">Email</label>
						<input
							id="email"
							type="email"
							value={values.email || ''}
							onChange={handleChange}
							onBlur={handleBlur}
							placeholder="Email"
							className={
								touched.email
									? errors.email
										? 'error'
										: 'valid'
									: ''
							}
						/>
						{errors.email && touched.email && (
							<Error className="error">{errors.email}</Error>
						)}
					</InputGroup>
					<InputGroup>
						<label htmlFor="password">Password</label>
						<input
							id="password"
							type="password"
							value={values.password || ''}
							onChange={handleChange}
							onBlur={handleBlur}
							placeholder="Password"
							className={
								touched.password
									? errors.password
										? 'error'
										: 'valid'
									: ''
							}
						/>
						{errors.password && touched.password && (
							<Error className="error">{errors.password}</Error>
						)}
					</InputGroup>
					<Button
						type='submit'
					>
						Login
					</Button>
				</form>
				<P>
					Don't have an account? &nbsp;
					<StyledLink to="/register">
						Register
					</StyledLink>
				</P>
			</Content>
		</Container>
	)
}

export default Login
