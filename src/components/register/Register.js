import React from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { registerSchema } from '../../schemas/index'
import SubmitButton from '../buttons/SubmitButton'
import LinkButton from '../buttons/LinkButton'
import { Content } from '../../assets/styles/GlobalStyles'
import { P, InputGroup } from '../../assets/styles/RegisterStyles'

const Register = () => {
	const navigate = useNavigate()

	const registerUser = async (values) => {
		// console.log('registering:', values)
		try {
			const { email, username, postcode, password } = values
			await axios.post(
				`${process.env.REACT_APP_API_URL}/api/auth/register`,
				{ email, username, postcode, password },
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
			// console.log(res.data)
			navigate('/login')
		} catch (error) {
			console.error(error.response.data)
		}
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
			onSubmit: registerUser,
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
							value={values.email}
							onChange={handleChange}
							onBlur={handleBlur}
							placeholder={
								errors.email && touched.email
									? errors.email
									: 'Email'
							}
							className={
								touched.email
									? errors.email
										? 'error'
										: 'valid'
									: ''
							}
						/>
					</InputGroup>
					<InputGroup>
						<label htmlFor="username">Username</label>
						<input
							id="username"
							type="text"
							value={values.username}
							onChange={handleChange}
							onBlur={handleBlur}
							placeholder={
								errors.username && touched.username
									? errors.username
									: 'Choose a username'
							}
							className={
								touched.username
									? errors.username
										? 'error'
										: 'valid'
									: ''
							}
						/>
					</InputGroup>
					<InputGroup>
						<label htmlFor="postcode">Location</label>
						<input
							id="postcode"
							type="text"
							value={values.postcode}
							onChange={handleChange}
							onBlur={handleBlur}
							placeholder={
								errors.postcode && touched.postcode
									? errors.postcode
									: 'Enter your post code'
							}
							className={
								touched.postcode
									? errors.postcode
										? 'error'
										: 'valid'
									: ''
							}
						/>
					</InputGroup>
					<InputGroup>
						<label htmlFor="password">Password</label>
						<input
							id="password"
							type="password"
							value={values.password}
							onChange={handleChange}
							onBlur={handleBlur}
							placeholder={
								errors.password && touched.password
									? errors.password
									: 'Password'
							}
							className={
								touched.password
									? errors.password
										? 'error'
										: 'valid'
									: ''
							}
						/>
					</InputGroup>
					<InputGroup>
						<label htmlFor="password">Confirm Password</label>
						<input
							id="confirmPassword"
							type="password"
							value={values.confirmPassword}
							onChange={handleChange}
							onBlur={handleBlur}
							placeholder={
								errors.confirmPassword &&
								touched.confirmPassword
									? errors.confirmPassword
									: 'Confirm Password'
							}
							className={
								touched.confirmPassword
									? errors.confirmPassword
										? 'error'
										: 'valid'
									: ''
							}
						/>
					</InputGroup>
					<SubmitButton text="Submit" />
				</form>
				<P>
					Already have an account? &nbsp;
					<LinkButton to="/login" text="Sign In" />
				</P>
			</Content>
		</section>
	)
}

export default Register
