import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay, faStar, faTicket } from '@fortawesome/free-solid-svg-icons'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import { EffectCoverflow } from 'swiper/modules'


const Banner = () => {
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
                    <SwiperSlide className='!w-[80vw]'>
                        <div className="container">
                            <div className="banner-movie h-[70vh] rounded-xl relative flex justify-between flex-col">
                                <img src="cover.jpeg" alt="" className="h-full w-full object-cover absolute rounded-xl -z-10" />
                                <div className="banner-details p-5">
                                    <div className="rating">
                                        <FontAwesomeIcon icon={faStar} className='text-main' />
                                        <FontAwesomeIcon icon={faStar} className='text-main' />
                                        <FontAwesomeIcon icon={faStar} className='text-main' />
                                        <FontAwesomeIcon icon={faStar} className='text-main' />
                                        <FontAwesomeIcon icon={faStar} className='text-main' />
                                    </div>
                                    <h2 className='text-4xl my-2 font-semibold'>Doctor Strange</h2>
                                    <h4 className='text-xl'>In the Multiverse of Madness</h4>
                                    <p className="my-2 text-main">Released on: 2024-12-05</p>
                                    <p className="my-2">Genre: <span className="text-main">Action, Sci-fi</span></p>
                                </div>
                                <div className="banner-buttons p-5">
                                    <a href="" className="border border-gray-500 text-xs py-2 w-32 text-center inline-block rounded-full bg-secondary me-3"><FontAwesomeIcon icon={faCirclePlay} className='me-2' />Watch Trailer</a>
                                    <a href="" className="border border-gray-500 text-xs py-2 w-32 text-center inline-block rounded-full bg-main text-black"><FontAwesomeIcon icon={faTicket} className='me-2' />Book Ticket</a>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className='!w-[80vw]'>
                        <div className="container">
                            <div className="banner-movie h-[70vh] rounded-xl relative flex justify-between flex-col">
                                <img src="cover.jpeg" alt="" className="h-full w-full object-cover absolute rounded-xl -z-10" />
                                <div className="banner-details p-5">
                                    <div className="rating">
                                        <FontAwesomeIcon icon={faStar} className='text-main' />
                                        <FontAwesomeIcon icon={faStar} className='text-main' />
                                        <FontAwesomeIcon icon={faStar} className='text-main' />
                                        <FontAwesomeIcon icon={faStar} className='text-main' />
                                        <FontAwesomeIcon icon={faStar} className='text-main' />
                                    </div>
                                    <h2 className='text-4xl my-2 font-semibold'>Doctor Strange</h2>
                                    <h4 className='text-xl'>In the Multiverse of Madness</h4>
                                    <p className="my-2 text-main">Released on: 2024-12-05</p>
                                    <p className="my-2">Genre: <span className="text-main">Action, Sci-fi</span></p>
                                </div>
                                <div className="banner-buttons p-5">
                                    <a href="" className="border border-gray-500 text-xs py-2 w-32 text-center inline-block rounded-full bg-secondary me-3"><FontAwesomeIcon icon={faCirclePlay} className='me-2' />Watch Trailer</a>
                                    <a href="" className="border border-gray-500 text-xs py-2 w-32 text-center inline-block rounded-full bg-main text-black"><FontAwesomeIcon icon={faTicket} className='me-2' />Book Ticket</a>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className='!w-[80vw]'>
                        <div className="container">
                            <div className="banner-movie h-[70vh] rounded-xl relative flex justify-between flex-col">
                                <img src="cover.jpeg" alt="" className="h-full w-full object-cover absolute rounded-xl -z-10" />
                                <div className="banner-details p-5">
                                    <div className="rating">
                                        <FontAwesomeIcon icon={faStar} className='text-main' />
                                        <FontAwesomeIcon icon={faStar} className='text-main' />
                                        <FontAwesomeIcon icon={faStar} className='text-main' />
                                        <FontAwesomeIcon icon={faStar} className='text-main' />
                                        <FontAwesomeIcon icon={faStar} className='text-main' />
                                    </div>
                                    <h2 className='text-4xl my-2 font-semibold'>Doctor Strange</h2>
                                    <h4 className='text-xl'>In the Multiverse of Madness</h4>
                                    <p className="my-2 text-main">Released on: 2024-12-05</p>
                                    <p className="my-2">Genre: <span className="text-main">Action, Sci-fi</span></p>
                                </div>
                                <div className="banner-buttons p-5">
                                    <a href="" className="border border-gray-500 text-xs py-2 w-32 text-center inline-block rounded-full bg-secondary me-3"><FontAwesomeIcon icon={faCirclePlay} className='me-2' />Watch Trailer</a>
                                    <a href="" className="border border-gray-500 text-xs py-2 w-32 text-center inline-block rounded-full bg-main text-black"><FontAwesomeIcon icon={faTicket} className='me-2' />Book Ticket</a>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </section>
        </>
    )
}

export default Banner