import React, { useEffect, useState } from 'react'
import MovieCard from './MovieCard'
import axios from 'axios';

const MovieSection = ({ title, status }) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        try {
            axios.get(`http://localhost:8000/api/movies`, {
                params: { status },
            }).then((res)=>{
                setMovies(res.data.movies);
            });
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    },[])
    return (
        <>
            <section className='movies-section mt-8'>
                <div className="container">
                    <h2 className='text-2xl mb-3'>{title}</h2>
                    <div className="flex flex-wrap justify-center gap-8 max-sm:gap-2">
                        {movies.map((movie,index)=>(
                            <MovieCard key={index} movie={movie}/>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default MovieSection