import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../buttons/Button';
import { Content } from '../../assets/styles/GlobalStyles';
import { P, InputGroup } from '../../assets/styles/RegisterStyles';

const Register = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username cannot exceed 20 characters')
      .required('Username is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      )
      .required('Password is required'),
    location: Yup.string()
      .min(2, 'Location must be at least 2 characters')
      .max(50, 'Location cannot exceed 50 characters')
      .required('Location is required'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      location: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, values, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log(res.data);
        navigate('/login');
      } catch (error) {
        console.error(error.response.data);
      }
    },
  });

  return (
    <section>
      <Content>
        <h1>Register</h1>
        <form onSubmit={formik.handleSubmit} method="post" autoComplete="off">
          <input autoComplete="off" name="hidden" type="text" style={{ display: 'none' }} />
          <InputGroup>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Username"
              required
            />
            {formik.touched.username && formik.errors.username ? (
              <div style={{ color: 'red' }}>{formik.errors.username}</div>
            ) : null}
          </InputGroup>
          <InputGroup>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Password"
              required
            />
            {formik.touched.password && formik.errors.password ? (
              <div style={{ color: 'red' }}>{formik.errors.password}</div>
            ) : null}
          </InputGroup>
          <InputGroup>
            <label htmlFor="location">Location</label>
            <input
              type="text"
              name="location"
              value={formik.values.location}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Location"
              required
            />
            {formik.touched.location && formik.errors.location ? (
              <div style={{ color: 'red' }}>{formik.errors.location}</div>
            ) : null}
          </InputGroup>
          <Button type="action" text="Submit" />
        </form>
        <P>
          Already have an account? &nbsp;<Button type="word" to="/login" text="Sign In" />
        </P>
      </Content>
    </section>
  );
};

export default Register;
