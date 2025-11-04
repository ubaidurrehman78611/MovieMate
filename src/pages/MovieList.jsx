import React from 'react';
import MovieCard from './MovieCard';
const MovieList = ({ movieList }) => {
	return (
		<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
			{movieList.map((items, index) => (
				<MovieCard key={items.id || index} movie={items} />
			))}
		</div>
	);
};

export default MovieList;
