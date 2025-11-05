import { Button } from '@/components/ui/button';
import { BrowserRouter, Routes, Route, Router, Link } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
function App() {
	return (
		<BrowserRouter>
		
			
			<Routes>
				<Route
					path='/'
					element={<Home />}>
					{' '}
				</Route>
				<Route
					path='/movie/:id'
					element={<MovieDetails></MovieDetails>}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
