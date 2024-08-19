import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Button from '../buttons/Button'
import { Content } from '../../assets/styles/GlobalStyles'
import { P, InputGroup } from '../../assets/styles/RegisterStyles'

const Register = () => {
  const navigate = useNavigate()
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
    phone: '',
		addressLine1: '',
		addressLine2: '',
		city: '',
		postcode: '',
	})

	const {
		username,
		email,
		password,
    phone,
		addressLine1,
		addressLine2,
		city,
		postcode,
	} = formData

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value })

	const onSubmit = async (e) => {
		e.preventDefault()
		try {
			const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, formData, {
				headers: {
					'Content-Type': 'application/json',
				},
			})
			console.log(res.data)
      navigate('/login')
		} catch (error) {
			console.error(error.response.data)
		}
	}
 
	return (
		<section>
      <Content>
				<h1>Register</h1>
				<form onSubmit={onSubmit} method="post" autoComplete="false">
								<input autoComplete="false" name="hidden" type="text" style={{display:' none'}}></input>
								<InputGroup>
									<label htmlFor="username">Username</label>
									<input
										type="text"
										name="username"
										value={username}
										placeholder="Username"
										onChange={onChange}
										required
									/>
								</InputGroup>
								<InputGroup>
									<label htmlFor="email">Email</label>
									<input
										type="email"
										name="email"
										value={email}
										placeholder="Email"
										onChange={onChange}
										required
									/>
								</InputGroup>
								<InputGroup>
									<label htmlFor="password">Password</label>
									<input
										type="password"
										name="password"
										value={password}
										placeholder="Password"
										onChange={onChange}
										required
									/>
								</InputGroup>
								<InputGroup>
									<label htmlFor="phone">Phone</label>
									<input
										type="text"
										name="phone"
										value={phone}
										placeholder="Phone"
										onChange={onChange}
										required
									/>
								</InputGroup>
								<InputGroup>
									<label htmlFor="addressLine1">Address Line 1</label>
									<input
										type="text"
										name="addressLine1"
										value={addressLine1}
										placeholder="Address Line 1"
										onChange={onChange}
										required
									/>
								</InputGroup>
								<InputGroup>
									<label htmlFor="addressLine2">Address Line 2</label>
									<input
										type="text"
										name="addressLine2"
										value={addressLine2}
										placeholder="Address Line 2"
										onChange={onChange}
									/>
								</InputGroup>
								<InputGroup>
									<label htmlFor="city">City</label>
									<input
										type="text"
										name="city"
										value={city}
										placeholder="City"
										onChange={onChange}
										required
									/>
								</InputGroup>
								<InputGroup>
									<label htmlFor="postcode">Postcode</label>
									<input
										type="text"
										name="postcode"
										value={postcode}
										placeholder="Postcode"
										onChange={onChange}
										required
									/>
								</InputGroup>
								<Button type="action" text="Submit" />
							</form>
				<P>Already have an account? &nbsp;<Button type="word" to="/login" text="Sign In" /></P>
							
			</Content>
    </section>
	)
}

export default Register