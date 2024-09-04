import React from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { registerSchema } from '../../schemas/index'
import SubmitButton from '../buttons/ActionButton'
import LinkButton from '../buttons/LinkButton'
import { Content } from '../../assets/styles/GlobalStyles'
import { P, InputGroup, Error } from '../../assets/styles/RegisterLoginStyles'

const Register = () => {
	const navigate = useNavigate()
	const { registerUser } = useAuth()

	const handleRegisterUser = async () => {
		// console.log('registering:', values)
		registerUser(values)
		navigate('/login')
	}

	const { values, handleSubmit, handleBlur, handleChange, touched, errors } =
		useFormik({
			initialValues: {
				email: '',
				username: '',
				postcode: '',
				password: '',
				confirmPassword: '',
			},
			validationSchema: registerSchema,
			onSubmit: handleRegisterUser,
		})

	// console.log(errors)

	return (
		<section>
			<Content>
				<h1>Register</h1>
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
						<label htmlFor="username">Username</label>
						<input
							id="username"
							type="text"
							value={values.username || ''}
							onChange={handleChange}
							onBlur={handleBlur}
							placeholder="Choose a username"
							className={
								touched.username
									? errors.username
										? 'error'
										: 'valid'
									: ''
							}
						/>
						{errors.username && touched.username && (
							<Error className="error">{errors.username}</Error>
						)}
					</InputGroup>
					<InputGroup>
						<label htmlFor="postcode">Location</label>
						<input
							id="postcode"
							type="text"
							value={values.postcode || ''}
							onChange={handleChange}
							onBlur={handleBlur}
							placeholder="Enter your post code"
							className={
								touched.postcode
									? errors.postcode
										? 'error'
										: 'valid'
									: ''
							}
						/>
						{errors.postcode && touched.postcode && (
							<Error className="error">{errors.postcode}</Error>
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
					<InputGroup>
						<label htmlFor="password">Confirm Password</label>
						<input
							id="confirmPassword"
							type="password"
							value={values.confirmPassword}
							onChange={handleChange}
							onBlur={handleBlur}
							placeholder="Confirm Password"
							className={
								touched.confirmPassword
									? errors.confirmPassword
										? 'error'
										: 'valid'
									: ''
							}
						/>
						{errors.confirmPassword && touched.confirmPassword && (
							<Error className="error">
								{errors.confirmPassword}
							</Error>
						)}
					</InputGroup>
					<SubmitButton text="Submit" />
				</form>
				<P>
					Already have an account? &nbsp; <LinkButton to="/login" text="Sign In" />
				</P>
			</Content>
		</section>
	)
}

export default Register
