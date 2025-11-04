import { Button } from '@/components/ui/button';
import { BrowserRouter, Routes, Route, Router, Link } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
function App() {
	return (
		<BrowserRouter>
		<div className=' bg-black text-white'>
			{/* Header Section */}
			<div className='bg-gradient-to-b from-purple-900/20 to-black pt-8 pb-3'>
				<div className='max-w-7xl mx-auto px-4'>
					<Link to={'/'}>
					<h1 className='text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'>
						MovieMate
					</h1></Link>
					
					<p className='text-gray-400 mb-8'>Discover your next favorite film</p>
				</div>
			</div>
		</div>
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
