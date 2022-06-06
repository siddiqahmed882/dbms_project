import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckOutSteps';
import { saveShippingAddress } from '../actions/cartActions';

const ShippingScreen = ({ history }) => {
	const navigate = useNavigate();
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	const [address, setAddress] = useState(shippingAddress?.address);

	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(saveShippingAddress({ address }));
		navigate('/placeorder');
	};

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 />
			<h1>Shipping</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group controlId="address">
					<Form.Label>Address</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter address"
						value={address}
						required
						onChange={(e) => setAddress(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Button type="submit" variant="primary">
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default ShippingScreen;
