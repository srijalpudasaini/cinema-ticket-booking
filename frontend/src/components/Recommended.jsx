import React, { useEffect, useState } from 'react'
import MovieCard from './MovieCard';
import axios from 'axios';
import Cookies from 'js-cookie';

const Recommended = () => {
  const [movies, setMovies] = useState([]);
  const token = Cookies.get('token');

    useEffect(() => {
        try {
            axios.get(`http://localhost:8000/api/movie/recommended`, {
                headers:{
                    'Authorization': `Bearer ${token}`
                }
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
                    <h2 className='text-2xl mb-3'>Recommended Movies</h2>
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

export default Recommended