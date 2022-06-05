import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import axios from '../axios';

import Ratings from '../components/Ratings';

import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';

function ProductScreen() {
	const [product, setProduct] = useState({});

	const { id } = useParams();

	useEffect(() => {
		const getProduct = async () => {
			const res = await axios.get(`/api/products/${id}`);
			setProduct(res.data);
		};
		getProduct();
	}, [id]);

	return (
		<>
			<Link className="btn btn-light my-3" to="/">
				Go back
			</Link>
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
							<ListGroup.Item>
								<Button
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
		</>
	);
}

export default ProductScreen;
