import React from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { loginSchema } from '../schemas/index'
import Check from '../icons/Check'
import { Spacer } from '../assets/styles/GlobalStyles'
import {
	Container,
	Content,
	P,
	Form,
	InputGroup,
	CheckContainer,
	Label,
	Input,
	Error,
	RegisterButton,
	StyledLink,
	Instruction,
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
			<Spacer />
			<Content>
				<h1>Login</h1>
				<Instruction>
					A number of fake accounts have been created for demonstration purposes. If you would prefer to use one of these instead of creating your own, please use the following credentials:
				</Instruction>
				<p>
					<strong>paige123@geemail.com</strong>
				</p>
				<p>
					<strong>Test123!</strong>
				</p>
				<Form onSubmit={handleSubmit} method='post' autoComplete='off'>
					<input
						autoComplete='off'
						name='hidden'
						type='text'
						style={{ display: 'none' }}
					/>
					<InputGroup>
						<Label htmlFor='email'>Email</Label>
						<Input
							id='email'
							type='email'
							value={values.email || ''}
							onChange={handleChange}
							onBlur={handleBlur}
							placeholder='Email'
							autoComplete='email'
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
							<Error className='error'>{errors.email}</Error>
						)}
					</InputGroup>
					<InputGroup>
						<Label htmlFor='password'>Password</Label>
						<Input
							id='password'
							type='password'
							value={values.password || ''}
							onChange={handleChange}
							onBlur={handleBlur}
							placeholder='Password'
							autoComplete='current-password'
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
							<Check isActive={touched.password && !errors.password} />
						</CheckContainer>
						{errors.password && touched.password && (
							<Error className='error'>{errors.password}</Error>
						)}
					</InputGroup>
					<RegisterButton
						type='submit'
					>
						Login
					</RegisterButton>
				</Form>
				<P>
					Don't have an account? &nbsp;
					<StyledLink to='/register'>
						Register
					</StyledLink>
				</P>
			</Content>
		</Container>
	)
}

export default Login
