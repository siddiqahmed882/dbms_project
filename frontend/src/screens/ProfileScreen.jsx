import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { listMyOrders, resetOrderDetails } from '../actions/orderActions';

import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

import { Table, Form, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Message from '../components/Message';
import Loader from '../components/Loader';

const ProfileScreen = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [tel, setTel] = useState('');
	const [address, setAddress] = useState('');
	const [message, setMessage] = useState(null);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
	const { success } = userUpdateProfile;

	const orderListMy = useSelector((state) => state.orderListMy);
	const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

	useEffect(() => {
		if (!userInfo) {
			navigate('/login');
		} else {
			if (!user || !user.name || success) {
				dispatch({ type: USER_UPDATE_PROFILE_RESET });
				dispatch(getUserDetails());
				dispatch(listMyOrders());
			} else {
				setName(user.name);
				setEmail(user.email);
				setAddress(user.address);
				setTel(user.tel);
			}
		}
	}, [dispatch, navigate, userInfo, user, success]);

	const submitHandler = (e) => {
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
		dispatch(updateUserProfile({ ...sanitizeInput, password }));
	};

	return (
		<Row>
			<Col md={3}>
				<h2>User Profile</h2>
				{message && <Message variant="danger">{message}</Message>}
				{}
				{success && <Message variant="success">Profile Updated</Message>}
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant="danger">{error}</Message>
				) : (
					// display users avatar
					<>
						<img
							src={`http://localhost:3500${user.avatar}`}
							alt="user avatar"
							style={{
								width: '150px',
								aspectRatio: '1/1',
								borderRadius: '50%',
								display: 'block',
								margin: '1rem auto',
								objectFit: 'cover',
							}}
						/>
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
									disabled
								></Form.Control>
							</Form.Group>

							<Form.Group controlId="password">
								<Form.Label>Password</Form.Label>
								<Form.Control
									type="password"
									placeholder="Enter password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									autoComplete="false"
								></Form.Control>
							</Form.Group>

							<Form.Group controlId="confirmPassword">
								<Form.Label>Confirm Password</Form.Label>
								<Form.Control
									type="password"
									placeholder="Confirm password"
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
									autoComplete="false"
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

							<Button type="submit" variant="primary">
								Update
							</Button>
						</Form>
					</>
				)}
			</Col>
			<Col md={9}>
				<h2>My Orders</h2>
				{loadingOrders ? (
					<Loader />
				) : errorOrders ? (
					<Message variant="danger">{errorOrders}</Message>
				) : (
					<Table striped bordered hover responsive className="table-sm">
						<thead>
							<tr>
								<th>ID</th>
								<th>DATE</th>
								<th>TOTAL</th>
								<th>DELIVERED</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order) => (
								<tr key={order._id}>
									<td>{order.orderId}</td>
									<td>{order.createdAt.substring(0, 10)}</td>
									<td>{`Rs. ${order.totalPrice}`}</td>
									<td>
										{order.isDelivered ? (
											<span style={{ color: 'green' }}>{'DELIVERED'}</span>
										) : (
											<span style={{ color: 'red' }}>{'PENDING'}</span>
										)}
									</td>
									<td>
										<LinkContainer to={`/order/${order.orderId}`}>
											<Button className="btn-sm" variant="light">
												Details
											</Button>
										</LinkContainer>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				)}
			</Col>
		</Row>
	);
};

export default ProfileScreen;
