import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../actions/productActions';

import Loader from '../components/Loader';
import Message from '../components/Message';
import Ratings from '../components/Ratings';

import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';

function ProductScreen() {
	const [qty, setQty] = useState(1);
	const navigate = useNavigate();
	const { id } = useParams();

	const dispatch = useDispatch();
	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;

	useEffect(() => {
		dispatch(listProductDetails(id));
	}, [dispatch, id]);

	const handleAddToCart = () => {
		navigate(`/cart/${id}?qty=${qty}`);
	};

	let content;
	if (loading) content = <Loader />;
	else if (!loading && error) content = <Message variant={'danger'}>{error}</Message>;
	else
		content = (
			<Row>
				<Col md={6}>
					<Image
						src={`http://localhost:3500${product.product_image}`}
						alt={product.product_name}
						fluid
					/>
				</Col>
				<Col md={3}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h3>{product.product_name}</h3>
						</ListGroup.Item>
						<ListGroup.Item>
							{/* <Ratings value={product.rating} text={`${product.numReviews} Reviews`} /> */}
						</ListGroup.Item>
						<ListGroup.Item>Price: ${product.product_price}</ListGroup.Item>
						<ListGroup.Item>Description: ${product.product_description}</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={3}>
					<Card>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<Row>
									<Col>Price:</Col>
									<Col>
										<strong>{product.product_price}</strong>
									</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Status:</Col>
									<Col>
										<strong>
											{product.product_count_in_stock > 0 ? 'In Stock' : 'Out Of Stock'}
										</strong>
									</Col>
								</Row>
							</ListGroup.Item>
							{product.product_count_in_stock > 0 && (
								<ListGroup.Item>
									<Row>
										<Col>Quantity:</Col>
										<Col>
											<Form.Control
												as="select"
												value={qty}
												onChange={(e) => setQty(e.target.value)}
											>
												{[...Array(product.product_count_in_stock).keys()].map((x) => (
													<option key={x + 1} value={x + 1}>
														{x + 1}
													</option>
												))}
											</Form.Control>
										</Col>
									</Row>
								</ListGroup.Item>
							)}
							<ListGroup.Item>
								<Button
									onClick={handleAddToCart}
									className="btn-block"
									type="button"
									disabled={product.product_count_in_stock === 0}
								>
									Add To Cart
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		);

	return (
		<>
			<Link className="btn btn-light my-3" to="/">
				Go back
			</Link>
			{content}
		</>
	);
}

export default ProductScreen;
