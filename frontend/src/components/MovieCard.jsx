import { faClock, faStar, faTicket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router'

const MovieCard = () => {
    return (
        <>
            <article className="movie-card h-96 max-sm:w-48 w-56">
                <Link to='booking'>
                    <div className="movie-thumbnail relative rounded-lg overlay">
                        <img src="thumbnail.jpeg" alt="" className='h-full object-cover w-full rounded-lg relative -z-10' />
                        <div className="card-rating absolute top-2 right-2 bg-white/30 backdrop-blur-sm px-1 rounded-sm z-[2]">
                            <FontAwesomeIcon icon={faStar} className='text-main text-xs' />
                            <FontAwesomeIcon icon={faStar} className='text-main text-xs' />
                            <FontAwesomeIcon icon={faStar} className='text-main text-xs' />
                            <FontAwesomeIcon icon={faStar} className='text-main text-xs' />
                            <FontAwesomeIcon icon={faStar} className='text-main text-xs' />
                        </div>
                        <div className="absolute left-2 bottom-2 bg-white/30 backdrop-blur-sm py-1 px-2 rounded-sm z-[2] text-xs">
                            <FontAwesomeIcon icon={faClock} className='text-main me-2' />
                            1hr:49m
                        </div>
                    </div>
                </Link>
                <div className="movie-details mt-1">
                    <h3 className='text-sm mb-1'>Doctor Strange</h3>
                    <Link to="booking" className='bg-main text-black py-1 px-2 text-xs rounded-sm'>
                        <FontAwesomeIcon icon={faTicket} className='me-2' />
                        Book Now
                    </Link>
                </div>
            </article>
        </>
    )
}

export default MovieCard