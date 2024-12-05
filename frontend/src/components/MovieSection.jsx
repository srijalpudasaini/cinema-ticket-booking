import React from 'react'
import MovieCard from './MovieCard'

const MovieSection = ({ title }) => {
    return (
        <>
            <section className='movies-section mt-8'>
                <div className="container">
                    <h2 className='text-2xl mb-3'>{title}</h2>
                    <div className="flex flex-wrap justify-center gap-8 max-sm:gap-2">
                        <MovieCard />
                        <MovieCard />
                        <MovieCard />
                        <MovieCard />
                        <MovieCard />
                        <MovieCard />
                        <MovieCard />
                        <MovieCard />
                    </div>
                </div>
            </section>
        </>
    )
}

export default MovieSection