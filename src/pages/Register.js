import React from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { registerSchema } from '../schemas/index'
import Check from '../icons/Check'
import {
	Form,
	InputGroup,
	CheckContainer,
	Label,
	Input,
} from '../assets/styles/GlobalStyles'
import {
	Container,
	Content,
	P,
	Error,
	RegisterButton,
	StyledLink,
	Instruction,
} from '../assets/styles/RegisterLoginStyles'

const Register = () => {
	const navigate = useNavigate()
	const { registerUser } = useAuth()

	const handleRegisterUser = async () => {
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

	return (
		<Container>
			<Content>
				<h1>Register</h1>
				<Instruction>
					Feel free to register with a fake email address and username however, please use a valid UK postcode as this will be used to indicate your location relative to other users.
				</Instruction>
				<Form onSubmit={handleSubmit} method="post" autoComplete="off">
					<input
						autoComplete="off"
						name="hidden"
						type="text"
						style={{ display: 'none' }}
					/>
					<InputGroup>
						<Label htmlFor="email">Email</Label>
						<Input
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
							style={{ paddingLeft: 'var(--sm)' }}
						/>
						<CheckContainer>
							<Check isActive={touched.email && !errors.email} />
						</CheckContainer>
						{errors.email && touched.email && (
							<Error className="error">{errors.email}</Error>
						)}
					</InputGroup>
					<InputGroup>
						<Label htmlFor="username">Username</Label>
						<Input
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
							style={{ paddingLeft: 'var(--sm)' }}
						/>
						<CheckContainer>
							<Check
								isActive={touched.username && !errors.username}
							/>
						</CheckContainer>
						{errors.username && touched.username && (
							<Error className="error">{errors.username}</Error>
						)}
					</InputGroup>
					<InputGroup>
						<Label htmlFor="postcode">Location</Label>
						<Input
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
							style={{ paddingLeft: 'var(--sm)' }}
						/>
						<CheckContainer>
							<Check
								isActive={touched.postcode && !errors.postcode}
							/>
						</CheckContainer>
						{errors.postcode && touched.postcode && (
							<Error className="error">{errors.postcode}</Error>
						)}
					</InputGroup>
					<InputGroup>
						<Label htmlFor="password">Password</Label>
						<Input
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
							style={{ paddingLeft: 'var(--sm)' }}
						/>
						<CheckContainer>
							<Check
								isActive={touched.password && !errors.password}
							/>
						</CheckContainer>
						{errors.password && touched.password && (
							<Error className="error">{errors.password}</Error>
						)}
					</InputGroup>
					<InputGroup>
						<Label htmlFor="password">Confirm Password</Label>
						<Input
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
							style={{ paddingLeft: 'var(--sm)' }}
						/>
						<CheckContainer>
							<Check
								isActive={
									touched.confirmPassword &&
									!errors.confirmPassword
								}
							/>
						</CheckContainer>
						{errors.confirmPassword && touched.confirmPassword && (
							<Error className="error">
								{errors.confirmPassword}
							</Error>
						)}
					</InputGroup>
					<RegisterButton type="submit">Register</RegisterButton>
				</Form>
				<P>
					Already have an account? &nbsp;{' '}
					<StyledLink to="/login">Sign In</StyledLink>
				</P>
			</Content>
		</Container>
	)
}

export default Register
