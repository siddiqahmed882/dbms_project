import { Routes, Route } from 'react-router-dom';

import Layout from './Layout';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<HomeScreen />} />
				<Route path="login" element={<LoginScreen />} />
				<Route path="register" element={<RegisterScreen />} />
				<Route path="profile" element={<ProfileScreen />} />
				<Route path="product/:id" element={<ProductScreen />} />
				<Route path="cart">
					<Route index element={<CartScreen />} />
					<Route path=":id" element={<CartScreen />} />
				</Route>
				<Route path="shipping" element={<ShippingScreen />} />
				<Route path="placeorder" element={<PlaceOrderScreen />} />
			</Route>
		</Routes>
	);
}

export default App;
