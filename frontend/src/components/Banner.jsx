import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay, faStar, faTicket } from '@fortawesome/free-solid-svg-icons'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import { EffectCoverflow } from 'swiper/modules'
import axios from 'axios'
import { Link } from 'react-router'


const Banner = () => {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        try {
            axios.get(`http://localhost:8000/api/movies`, {
                params: { status: 'ongoing' },
            }).then((res)=>{
                setMovies(res.data.movies);
            });
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    },[])
    return (
        <>
            <section className='my-4'>
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 200,
                        modifier: 2.5
                    }}
                    initialSlide={1}
                    slideToClickedSlide={true}
                    modules={[EffectCoverflow]}
                >
                    {
                        movies.map((movie, index) => (
                            <SwiperSlide className='!w-[80vw] max-sm:!w-screen' key={index}>
                                <div className="container">
                                    <div className="banner-movie overlay h-[35vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] rounded-xl flex justify-between flex-col bg-[url('cover.jpg')]">
                                        <img src={`http://localhost:8000/uploads/movies/cover/${movie.cover}`} alt="" className="h-full w-full object-cover object-center absolute rounded-xl -z-10" />
                                        <div className="banner-details p-5">
                                            {/* <div className="rating">
                                                <FontAwesomeIcon icon={faStar} className='text-main' />
                                                <FontAwesomeIcon icon={faStar} className='text-main' />
                                                <FontAwesomeIcon icon={faStar} className='text-main' />
                                                <FontAwesomeIcon icon={faStar} className='text-main' />
                                                <FontAwesomeIcon icon={faStar} className='text-main' />
                                            </div> */}
                                            <h2 className='text-4xl my-2 font-semibold'>{movie.name}</h2>
                                            <h4 className='text-xl'>{movie.subtitle}</h4>
                                            <p className="my-2 text-main">Released on: {movie.release_date}</p>
                                            <p className="my-2">Genre: <span className="text-main">{movie.genres?.map((g) => g.name).join(", ")}</span></p>
                                        </div>
                                        <div className="banner-buttons p-5">
                                            <a href={movie.trailer} className="border border-gray-500 text-xs py-2 w-32 text-center inline-block rounded-full bg-secondary me-3" target='_blank'><FontAwesomeIcon icon={faCirclePlay} className='me-2' />Watch Trailer</a>
                                            <Link to={`/booking/${movie.slug}`} className="border border-gray-500 text-xs py-2 w-32 text-center inline-block rounded-full bg-main text-black"><FontAwesomeIcon icon={faTicket} className='me-2' />Book Ticket</Link>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    }

                </Swiper>
            </section>
        </>
    )
}

export default Banner