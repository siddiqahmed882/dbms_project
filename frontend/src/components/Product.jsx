import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Ratings from './Ratings';

function Product({ product }) {
	return (
		<Card className="my-3 p-3 rounded">
			<Link to={`/product/${product.product_id}`}>
				<Card.Img src={`http://localhost:3500${product.product_image}`} variant="top" />
			</Link>
			<Card.Body>
				<Link to={`/product/${product.product_id}`}>
					<Card.Title as="div">
						<strong>{product.product_name}</strong>
					</Card.Title>
				</Link>
				<Card.Text as="div">
					{/* <Ratings value={product.rating} text={`${product.numReviews} Reviews`} /> */}
				</Card.Text>
				<Card.Text as="h4">${product.product_price}</Card.Text>
			</Card.Body>
		</Card>
	);
}

export default Product;
