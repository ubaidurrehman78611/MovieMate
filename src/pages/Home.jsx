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
		const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
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
			<div>
				<h1>Loading...</h1>
			</div>
		);
	}
	return (
		<div>
			<div className='flex w-full max-w-sm items-center gap-2'>
				<form onSubmit={handleSubmit}>
					<Input
						type='text'
						placeholder='Search Movie'
						ref={searchMovie}
					/>
					<Button
						type='submit'
						variant='outline'>
						Search
					</Button>
				</form>
			</div>
			<div>
				<MovieList
					key={movieList.id}
					movieList={movieList}></MovieList>
			</div>
		</div>
	);
};

export default Home;
