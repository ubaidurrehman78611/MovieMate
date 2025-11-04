import React from 'react';

const MovieList = ({ movieList }) => {
	return (
		<div>
			{movieList.map((items, index) => (
				<div key={index}>
					<h1>{items.id}</h1>
				</div>
			))}
		</div>
	);
};

export default MovieList;
