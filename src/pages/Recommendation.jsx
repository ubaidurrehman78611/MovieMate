import React from 'react'
import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
const Recommendation = ({movieId, limit = 5}) => {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const fetchRecommendations = async () => {
        setLoading(true);
        const url = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=en-US&page=1`;
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
            const limitedResults = (data.results || []).slice(0, limit);
            setRecommendations(limitedResults);
            console.log("RECOMMENDATIONS", limitedResults);
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        }
        setLoading(false);
    }
    
    useEffect(() => {
        fetchRecommendations();
    }, [movieId]);
    
    if (loading) {
        return (
            <div className='max-w-7xl mx-auto px-4 py-8'>
                <div className='animate-pulse text-purple-500 text-center text-lg'>
                    Loading recommendations...
                </div>
            </div>
        )
    }
    
    if (!recommendations || recommendations.length === 0) {
        return (
            <div className='max-w-7xl mx-auto px-4 py-8'>
                <div className='text-gray-500 text-center text-lg'>
                    No recommendations available
                </div>
            </div>
        )
    }
    
    return (
        <div className='bg-gradient-to-b from-black to-gray-900/50 py-12'>
            <div className='max-w-7xl mx-auto px-4'>
                <div className='mb-8'>
                    <h2 className='text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'>
                        Recommended for You
                    </h2>
                    <p className='text-gray-400'>More movies you might enjoy</p>
                </div>
                
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
                    {recommendations.map((recommendation) => (
                        <MovieCard key={recommendation.id} movie={recommendation} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Recommendation