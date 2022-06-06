import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Message from '../components/Message';
import Loader from '../components/Loader';

import Product from '../components/Product';

import { Row, Col } from 'react-bootstrap';

function HomeScreen() {
	const dispatch = useDispatch();

	const productList = useSelector((state) => state.productList);
	const { loading, error, products } = productList;

	useEffect(() => {
		dispatch(listProducts());
	}, [dispatch]);

	let content;
	if (loading) {
		content = <Loader />;
	} else if (!loading && error) {
		content = <Message variant={'danger'}>{error}</Message>;
	} else {
		content = (
			<Row>
				{products.map((product) => (
					<Col key={product.product_id} sm={12} md={6} lg={4} xl={3}>
						<Product product={product} />
					</Col>
				))}
			</Row>
		);
	}

	return (
		<>
			<h1>Latest Products</h1>
			{content}
		</>
	);
}

export default HomeScreen;
