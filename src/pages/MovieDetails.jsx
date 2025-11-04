import React from 'react';
import { useParams } from 'react-router-dom';
import { useState , useEffect } from 'react';
import Recommendation from './Recommendation';
const MovieDetails = () => {
	const [movie, setMovie] = useState(null);
	const { id } = useParams();
	const fetchMovie = async () => {
		const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NmFjYWMxN2JiYzY0MDZkYTI3OTUzZGI2NGE1ZDhmYSIsIm5iZiI6MTc2MjE5NDUwOC45MzcsInN1YiI6IjY5MDhmNDRjYzhhOTQ0ZjI4MGY5MzcxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bUgjVGaa06sa-vMxhQrSE19922uoryG4U5w2kjyy9Sk'
			}
		};
		try {
			const res = await fetch(url, options);
			const data = await res.json();
			setMovie(data);
			console.log(data);
		} catch (error) {
			console.error('Error fetching movie:', error);
		}
	}
	useEffect(() => {
		fetchMovie();
	}, [id]);

	if (!movie) {
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
		
			{movie.backdrop_path && (
				<div className='relative h-[60vh] overflow-hidden'>
					<img 
						src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} 
						alt={movie.title}
						className='w-full h-full object-cover'
					/>
					<div className='absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30'></div>
				</div>
			)}

		
			<div className='max-w-7xl mx-auto px-4 -mt-40 relative z-10'>
				<div className='flex flex-col md:flex-row gap-8'>
					
					<div className='flex-shrink-0'>
						<img 
							src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
							alt={movie.title}
							className='w-64 rounded-lg shadow-2xl shadow-purple-900/50'
						/>
					</div>

					
					<div className='flex-1'>
						<h1 className='text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'>
							{movie.title}
						</h1>

						
						<div className='flex flex-wrap items-center gap-4 mb-6 text-gray-300'>
							<div className='flex items-center gap-2'>
								<span className='text-yellow-400 text-xl'>★</span>
								<span className='text-2xl font-bold text-white'>{movie.vote_average?.toFixed(1)}</span>
								<span className='text-gray-400'>/ 10</span>
							</div>
							<span className='text-gray-500'>|</span>
							<span>{movie.release_date}</span>
							<span className='text-gray-500'>|</span>
							<span className='px-3 py-1 bg-purple-900/50 rounded-full text-sm border border-purple-700'>
								{movie.status}
							</span>
							<span className='text-gray-500'>|</span>
							<span className='text-sm'>
								<span className='text-gray-400'>Popularity:</span> {Math.round(movie.popularity)}
							</span>
						</div>

					
						<div className='flex flex-wrap gap-2 mb-6'>
							{movie.genres?.map((genre) => (
								<span 
									key={genre.id}
									className='px-4 py-2 bg-gray-900 rounded-full text-sm border border-gray-800 hover:border-purple-500 transition-colors'
								>
									{genre.name}
								</span>
							))}
						</div>

					
						<div className='mb-6'>
							<h2 className='text-2xl font-semibold mb-3 text-purple-400'>Overview</h2>
							<p className='text-gray-300 text-lg leading-relaxed'>{movie.overview}</p>
						</div>

						
						{movie.runtime && (
							<div className='text-gray-400'>
								<span className='font-semibold text-white'>Runtime:</span> {movie.runtime} minutes
							</div>
						)}
					</div>
				</div>
			</div>

			
			<div className='h-20'>	
			</div>
			<div><Recommendation movieId={movie.id}></Recommendation></div>

		</div>
	);
};

export default MovieDetails;
