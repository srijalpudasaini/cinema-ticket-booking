import { faCirclePlay, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Booking = () => {

    return (
        <>
            <div className="container">
                <div className="banner-booking rounded-xl h-[35vh] sm:h-[50vh] relative mt-8">
                    <img src="cover.jpeg" alt="" className='h-full w-full rounded-xl object-cover' />
                    <div className="absolute bottom-8 -translate-x-1/2 left-1/2">
                        <a href="" className="border border-gray-500 text-xs py-2 w-32 text-center inline-block rounded-full bg-secondary me-3"><FontAwesomeIcon icon={faCirclePlay} className='me-2' />Watch Trailer</a>
                    </div>
                </div>
            </div>
            <div className="movie-details my-8">
                <div className="container">
                    <div className="rating-movie">
                        <FontAwesomeIcon icon={faStar} className='text-main' />
                        <FontAwesomeIcon icon={faStar} className='text-main' />
                        <FontAwesomeIcon icon={faStar} className='text-main' />
                        <FontAwesomeIcon icon={faStar} className='text-main' />
                        <FontAwesomeIcon icon={faStar} className='text-main' />
                    </div>
                    <h2 className='text-2xl mb-4'>Doctor Strange : Multiverse of Madness</h2>
                    <table className='border-none max-sm:w-3/4 w-1/2 lg:w-1/4 text-sm'>
                        <tr>
                            <td className='text-main'>Release Date:</td>
                            <td>05 Dec 2024</td>
                        </tr>
                        <tr>
                            <td className='text-main'>Run Time:</td>
                            <td>2hr 09min</td>
                        </tr>
                        <tr>
                            <td className='text-main'>Director:</td>
                            <td>Srijal</td>
                        </tr>
                        <tr>
                            <td className='text-main'>Genre:</td>
                            <td>Action</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div className="booking-section">
                <div className="container">
                    <div className="flex max-lg:flex-col gap-2">
                        <div className="w-1/4 max-lg:w-full">
                            <div className="rounded-lg bg-[#1A1A1A] p-3">
                                Select Hall
                                <select name="" id="" className='w-full bg-[#151515] border border-gray-800 outline-none rounded-md p-1 mt-2'>
                                    <option value="">Hall 1</option>
                                    <option value="">Hall 2</option>
                                    <option value="">Hall 3</option>
                                </select>
                            </div>
                            <div className="rounded-lg bg-[#1A1A1A] p-3 mt-6">
                                Select Date
                                <div className="flex justify-between date-wrapper gap-2 mt-2 text-center text-[11px] w-full overflow-x-auto">
                                    <div className="date-card text-nowrap p-1 rounded-md cursor-pointer transition-all duration-300 hover:bg-[#F3DD67] bg-black hover:text-black">
                                        <p>Today</p>
                                        <p>05 Dec</p>
                                    </div>
                                    <div className="date-card text-nowrap p-1 rounded-md cursor-pointer transition-all duration-300 hover:bg-[#F3DD67] bg-black hover:text-black">
                                        <p>Tommorow</p>
                                        <p>05 Dec</p>
                                    </div>
                                    <div className="date-card text-nowrap p-1 rounded-md cursor-pointer transition-all duration-300 hover:bg-[#F3DD67] bg-black hover:text-black">
                                        <p>Sun</p>
                                        <p>05 Dec</p>
                                    </div>
                                    <div className="date-card text-nowrap p-1 rounded-md cursor-pointer transition-all duration-300 hover:bg-[#F3DD67] bg-black hover:text-black">
                                        <p>Sun</p>
                                        <p>05 Dec</p>
                                    </div>
                                    <div className="date-card text-nowrap p-1 rounded-md cursor-pointer transition-all duration-300 hover:bg-[#F3DD67] bg-black hover:text-black">
                                        <p>Sun</p>
                                        <p>05 Dec</p>
                                    </div>
                                    <div className="date-card text-nowrap p-1 rounded-md cursor-pointer transition-all duration-300 hover:bg-[#F3DD67] bg-black hover:text-black">
                                        <p>Sun</p>
                                        <p>05 Dec</p>
                                    </div>
                                    <div className="date-card text-nowrap p-1 rounded-md cursor-pointer transition-all duration-300 hover:bg-[#F3DD67] bg-black hover:text-black">
                                        <p>Mon</p>
                                        <p>05 Dec</p>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-lg bg-[#1A1A1A] p-3 mt-6">
                                Select Time
                                <div className="flex justify-between gap-2 mt-2 text-center text-[11px]">
                                    <div className="time-card p-1 rounded-sm cursor-pointer transition-all duration-300 hover:bg-[#F3DD67] bg-black hover:text-black">
                                        <p>10:00 PM</p>
                                    </div>
                                    <div className="time-card p-1 rounded-sm cursor-pointer transition-all duration-300 hover:bg-[#F3DD67] bg-black hover:text-black">
                                        <p>10:00 PM</p>
                                    </div>
                                    <div className="time-card p-1 rounded-sm cursor-pointer transition-all duration-300 hover:bg-[#F3DD67] bg-black hover:text-black">
                                        <p>10:00 PM</p>
                                    </div>
                                    <div className="time-card p-1 rounded-sm cursor-pointer transition-all duration-300 hover:bg-[#F3DD67] bg-black hover:text-black">
                                        <p>10:00 PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-1/2 max-lg:w-full">
                            <div className='rounded-lg bg-[#1A1A1A] p-3 relative'>
                                <img src="screen.png" className='w-1/2 absolute top-4 left-1/2 -translate-x-1/2' alt="" />
                                <div className="screen-text">
                                    <h3 className="text-xl text-center mt-6">Screen Side</h3>
                                </div>
                                <div className="seat-wrapper mt-12">
                                    <div className="">
                                            <div className="row flex justify-center gap-2 mb-2">
                                                <div className="seat bg-green-500 rounded-sm px-2">1</div>
                                                <div className="seat bg-green-500 rounded-sm px-2">1</div>
                                                <div className="seat bg-green-500 rounded-sm px-2">1</div>
                                                <div className="seat bg-green-500 rounded-sm px-2">1</div>
                                                <div className="seat bg-green-500 rounded-sm px-2">1</div>
                                                <div className="seat bg-green-500 rounded-sm px-2">1</div>
                                                <div>A</div>
                                            </div>
                                            <div className="row flex justify-center gap-2 mb-2">
                                                <div className="seat bg-green-500 rounded-sm px-2">1</div>
                                                <div className="seat bg-green-500 rounded-sm px-2">1</div>
                                                <div className="seat bg-green-500 rounded-sm px-2">1</div>
                                                <div className="seat bg-green-500 rounded-sm px-2">1</div>
                                                <div className="seat bg-green-500 rounded-sm px-2">1</div>
                                                <div className="seat bg-green-500 rounded-sm px-2">1</div>
                                                <div>A</div>
                                            </div>
                                            <div className="row flex justify-center gap-2 mb-2">
                                                <div className="seat bg-green-500 rounded-sm px-2">1</div>
                                                <div className="seat bg-green-500 rounded-sm px-2">1</div>
                                                <div className="seat bg-green-500 rounded-sm px-2">1</div>
                                                <div className="seat bg-green-500 rounded-sm px-2">1</div>
                                                <div className="seat bg-green-500 rounded-sm px-2">1</div>
                                                <div className="seat bg-green-500 rounded-sm px-2">1</div>
                                                <div>A</div>
                                            </div>
                                            <div className="row flex justify-center gap-2 mb-2">
                                                <div className="seat bg-green-500 rounded-sm px-2">1</div>
                                                <div className="seat bg-green-500 rounded-sm px-2">1</div>
                                                <div className="seat bg-green-500 rounded-sm px-2">1</div>
                                                <div className="seat bg-green-500 rounded-sm px-2">1</div>
                                                <div className="seat bg-green-500 rounded-sm px-2">1</div>
                                                <div className="seat bg-green-500 rounded-sm px-2">1</div>
                                                <div>A</div>
                                            </div>
                                            <div className="row flex justify-center gap-2 mb-2">
                                                <div className="seat bg-green-500 rounded-sm px-2">1</div>
                                                <div className="seat bg-green-500 rounded-sm px-2">1</div>
                                                <div className="seat bg-green-500 rounded-sm px-2">1</div>
                                                <div className="seat bg-green-500 rounded-sm px-2">1</div>
                                                <div className="seat bg-green-500 rounded-sm px-2">1</div>
                                                <div className="seat bg-green-500 rounded-sm px-2">1</div>
                                                <div>A</div>
                                            </div>
                                            <div className="row flex justify-center gap-2 mb-2">
                                                <div className="seat bg-green-500 rounded-sm px-2">1</div>
                                                <div className="seat bg-green-500 rounded-sm px-2">1</div>
                                                <div className="seat bg-green-500 rounded-sm px-2">1</div>
                                                <div className="seat bg-green-500 rounded-sm px-2">1</div>
                                                <div className="seat bg-green-500 rounded-sm px-2">1</div>
                                                <div className="seat bg-green-500 rounded-sm px-2">1</div>
                                                <div>A</div>
                                            </div>
                                            <div className="row flex justify-center gap-2 mb-2">
                                                <div className="seat bg-green-500 rounded-sm px-2">1</div>
                                                <div className="seat bg-green-500 rounded-sm px-2">1</div>
                                                <div className="seat bg-green-500 rounded-sm px-2">1</div>
                                                <div className="seat bg-green-500 rounded-sm px-2">1</div>
                                                <div className="seat bg-green-500 rounded-sm px-2">1</div>
                                                <div className="seat bg-green-500 rounded-sm px-2">1</div>
                                                <div>A</div>
                                            </div>
                                            <div className="row flex justify-center gap-2 mb-2">
                                                <div className="seat bg-green-500 rounded-sm px-2">1</div>
                                                <div className="seat bg-green-500 rounded-sm px-2">1</div>
                                                <div className="seat bg-green-500 rounded-sm px-2">1</div>
                                                <div className="seat bg-green-500 rounded-sm px-2">1</div>
                                                <div className="seat bg-green-500 rounded-sm px-2">1</div>
                                                <div className="seat bg-green-500 rounded-sm px-2">1</div>
                                                <div>A</div>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-1/4 max-lg:w-full">
                            <div className='rounded-lg bg-[#1A1A1A] p-3'>
                                <div className="seat-status">
                                    <div className="flex mb-2 gap-2 items-center">
                                        <div className="h-6 w-6 rounded-sm bg-green-500"></div>
                                        Available
                                    </div>
                                    <div className="flex mb-2 gap-2 items-center">
                                        <div className="h-6 w-6 rounded-sm bg-gray-500"></div>
                                        Unavailable
                                    </div>
                                    <div className="flex mb-2 gap-2 items-center">
                                        <div className="h-6 w-6 rounded-sm bg-blue-500"></div>
                                        Your Seat
                                    </div>
                                    <div className="flex mb-2 gap-2 items-center">
                                        <div className="h-6 w-6 rounded-sm bg-red-500"></div>
                                        Sold out
                                    </div>
                                    <div className="flex mb-2 gap-2 items-center">
                                        <div className="h-6 w-6 rounded-sm bg-yellow-500"></div>
                                        Reserved
                                    </div>
                                </div>
                                <div className="seat-details mt-4 border-t pt-3">
                                    <div className="flex justify-between mb-2">
                                        <p>Selected Seats</p>
                                        <p>A1, B1, C1</p>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <p>Total Price</p>
                                        <p>Rs. 660</p>
                                    </div>
                                </div>
                                <div className="action-btns flex gap-1 text-center flex-wrap mt-3">
                                    <a href="" className='py-1 px-2 rounded-full flex-grow bg-green-500'>Buy Tickets</a>
                                    <a href="" className='py-1 px-2 rounded-full flex-grow bg-yellow-500'>Reserve</a>
                                    <a href="" className='py-1 px-2 rounded-full flex-grow bg-red-500'>Reset</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Booking