import React from 'react';
import { Link } from 'react-router-dom';


const MovieCard = ({movie}) => {
	return (
		<Link to={`/movie/${movie.id}`} className='group cursor-pointer'>
			<div className='relative overflow-hidden rounded-lg transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-purple-500/20'>
				{/* Poster Image */}
				<div className='relative aspect-[2/3] bg-gray-900'>
					{movie.poster_path ? (
						<img 
							src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
							alt={movie.title}
							className='w-full h-full object-cover'
						/>
					) : (
						<div className='w-full h-full flex items-center justify-center text-gray-600'>
							No Image
						</div>
					)}
					
					{/* Overlay on Hover */}
					<div className='absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
						<div className='absolute bottom-0 left-0 right-0 p-4'>
							<div className='flex items-center gap-2 mb-2'>
								<div className='flex items-center gap-1'>
									<span className='text-yellow-400'>★</span>
									<span className='text-white font-semibold'>{movie.vote_average?.toFixed(1)}</span>
								</div>
								<span className='text-gray-400 text-sm'>
									{movie.release_date?.substring(0, 4)}
								</span>
							</div>
							<p className='text-white text-sm line-clamp-3'>{movie.overview}</p>
						</div>
					</div>
				</div>
				
				{/* Title */}
				<div className='mt-3'>
					<h3 className='text-white font-semibold text-sm line-clamp-2 group-hover:text-purple-400 transition-colors'>
						{movie.title}
					</h3>
				</div>
			</div>
		</Link>
	);
};

export default MovieCard;
