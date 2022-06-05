import { Routes, Route } from 'react-router-dom';

import Layout from './Layout';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<HomeScreen />} />
				<Route path="product/:id" element={<ProductScreen />} />
			</Route>
		</Routes>
	);
}

export default App;
