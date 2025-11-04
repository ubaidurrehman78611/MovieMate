import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import MovieList from './MovieList';

const Home = () => {
	const searchMovie = useRef();
	const [movieList, setMovieList] = useState([]);
	const [loading, setLoading] = useState(false);
	const fetchMovies = async (query) => {
		setLoading(true);
		const url = `https://api.themoviedb.org/3/search/movie?query=${query}`;
		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization:
					'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NmFjYWMxN2JiYzY0MDZkYTI3OTUzZGI2NGE1ZDhmYSIsIm5iZiI6MTc2MjE5NDUwOC45MzcsInN1YiI6IjY5MDhmNDRjYzhhOTQ0ZjI4MGY5MzcxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bUgjVGaa06sa-vMxhQrSE19922uoryG4U5w2kjyy9Sk',
			},
		};

		try {
			const res = await fetch(url, options);
			const data = await res.json();
			setMovieList(data.results);
			console.log(data.results);
		} catch (error) {
			console.error('Error fetching movies:', error);
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchMovies('Avengers');
	}, []);
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!searchMovie.current.value) {
			alert('Search Field is empty');
		}
		const movieName = searchMovie.current.value;
		fetchMovies(movieName);
	};
	if (loading) {
		return (
			<div className='min-h-screen bg-black flex items-center justify-center'>
				<div className='text-center'>
					<div className='animate-pulse text-purple-500 text-2xl font-bold'>Loading...</div>
				</div>
			</div>
		);
	}
	return (
		<div className='min-h-screen bg-black text-white'>
			
			<div className=''>
				<div className='max-w-7xl mx-auto px-4'>
					
					<form onSubmit={handleSubmit} className='flex items-center justify-center   gap-3 '>
						<Input
							type='text'
							placeholder='Search for movies...'
							ref={searchMovie}
							className='bg-gray-900/50 max-w-xl border-gray-800 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500 h-12 text-lg'
						/>
						<Button
							type='submit'
							className='bg-purple-600 hover:bg-purple-700 text-white px-8 h-12 font-semibold'>
							Search
						</Button>
					</form>
				</div>
			</div>

			
			<div className='max-w-7xl mx-auto px-4 py-8'>
				<MovieList
					key={movieList.id}
					movieList={movieList}
				/>
			</div>
		</div>
	);
};

export default Home;
