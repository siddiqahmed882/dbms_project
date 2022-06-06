import { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userActions';
import axios from '../axios';

import { Form, Button, Row, Col } from 'react-bootstrap';

import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

const RegisterScreen = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [tel, setTel] = useState('');
	const [address, setAddress] = useState('');
	const [message, setMessage] = useState(null);

	const imageRef = useRef(null);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	const userRegister = useSelector((state) => state.userRegister);
	const { loading, error, userInfo } = userRegister;

	const redirect = searchParams.get('redirect');

	useEffect(() => {
		if (userInfo) {
			navigate(redirect ? '/' + redirect.replaceAll('"', '') : '/', { replace: true });
		}
	}, [navigate, userInfo, redirect]);

	const submitHandler = async (e) => {
		e.preventDefault();

		const sanitizeInput = {
			name: name.trim(),
			email: email.trim(),
			tel: tel.trim().replaceAll(' ', '').replaceAll('-', '').replaceAll('/', ''),
			address: address.trim(),
		};

		// check all fields are filled
		if (
			!sanitizeInput.name ||
			!sanitizeInput.email ||
			!password ||
			!confirmPassword ||
			!sanitizeInput.tel ||
			!sanitizeInput.address
		) {
			setMessage('Please fill all the fields');
			return;
		}

		// password should be atleast 6 characters
		if (password.length < 6) {
			setMessage('Password should be atleast 6 characters');
			return;
		}

		// password and confirm password should be same
		if (password !== confirmPassword) {
			setMessage('Passwords do not match');
			return;
		}

		// check tel is valid
		if (!/^[0-9]{11}$/.test(sanitizeInput.tel)) {
			setMessage('Please enter a valid phone number');
			return;
		}

		const imageFile = imageRef.current.files[0];
		const formData = new FormData();
		formData.append('image', imageFile);

		const { data } = await axios.post('/api/uploadImage', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		dispatch(register({ ...sanitizeInput, password, avatar: data.image.src }));
	};

	return (
		<FormContainer>
			<h1>Sign Up</h1>
			{message && <Message variant="danger">{message}</Message>}
			{error && <Message variant="danger">{error}</Message>}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId="name">
					<Form.Label>Name</Form.Label>
					<Form.Control
						type="name"
						placeholder="Enter name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId="email">
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Enter password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId="confirmPassword">
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Confirm password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId="tel">
					<Form.Label>Contact No.</Form.Label>
					<Form.Control
						type="tel"
						placeholder="Enter contact no."
						value={tel}
						onChange={(e) => setTel(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId="address">
					<Form.Label>Shipping Address</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter shipping address"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId="image">
					<Form.Label>Avatar</Form.Label>
					<Form.Control
						type="file"
						placeholder="Please select an avatar"
						accept="image/*"
						ref={imageRef}
					></Form.Control>
				</Form.Group>

				<Button type="submit" variant="primary">
					Register
				</Button>
			</Form>

			<Row className="py-3">
				<Col>
					Have an Account?{' '}
					<Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default RegisterScreen;
