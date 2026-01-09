import { faCirclePlay, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import axios from "axios"
import Loader from '../components/Loader'
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat";
import Modal from '../components/Modal'
import Cookies from 'js-cookie'
import BuyModal from '../components/BuyModal'
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(customParseFormat);

const Booking = () => {
    const { slug } = useParams();
    const [movie, setMovie] = useState({});

    const [loading, setLoading] = useState(true)

    const [dates, setDates] = useState([]);
    const [halls, setHalls] = useState([]);
    const [times, setTimes] = useState([]);

    const [user, setUser] = useState();

    const [selectedDate, setSelectedDate] = useState();
    const [selectedHall, setSelectedHall] = useState({ id: '' });
    const [selectedTime, setSelectedTime] = useState();
    const [showSeats, setShowSeats] = useState([]);
    const [show, setShow] = useState();
    const [confirmOpen, setConfirmOpen] = useState(false);



    const [seatLoading, setSeatLoading] = useState(false);

    const [selectedSeats, setSelectedSeats] = useState([]);
    const [price, setPrice] = useState(0);

    const [modalOpen, setModalOpen] = useState(false)
    const [message, setMessage] = useState('')

    const [buyModalOpen, setBuyModalOpen] = useState(false)
    const navigate = useNavigate()

    const [recommendedSeats, setRecommendedSeats] = useState(null)
    const [total, setTotal] = useState()

    const formatMinutes = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;

        let result = '';

        if (hours > 0) {
            result += `${hours}hr`;
        }

        if (mins > 0 || hours === 0) {
            result += (result ? ' ' : '') + `${mins} min`;
        }

        return result;
    }

    useEffect(() => {
        if (!selectedDate) {
            return;
        }
        const getHalls = async () => {
            await axios.get('http://localhost:8000/api/hallsByDate', {
                params: {
                    id: movie.id,
                    date: selectedDate
                }
            }).then(res => {
                setHalls(res.data)
            }
            );
        }
        getHalls();
    }, [selectedDate]);

    useEffect(() => {
        if (selectedHall && selectedDate) {
            const getTimes = async () => {
                await axios.get('http://localhost:8000/api/timesByHall', {
                    params: {
                        id: movie.id,
                        date: selectedDate,
                        hall_id: selectedHall?.hall_id,
                    }
                }).then(res => {
                    setTimes(res.data)
                });
            }
            getTimes();
        }
    }, [selectedHall, selectedDate]);

    useEffect(() => {
        if (selectedHall && selectedDate && selectedTime) {
            const getSeats = async () => {
                await axios.get('http://localhost:8000/api/showSeats', {
                    params: {
                        id: movie.id,
                        date: selectedDate,
                        hall_id: selectedHall?.hall_id,
                        time: selectedTime,
                    }
                }).then(res => {
                    setShow(res.data);
                    setShowSeats(res.data.show_seat)
                    const selected = res.data.show_seat.filter(seat => seat.status === 'unavailable' && seat.user_id === user?.id);
                    setSelectedSeats(selected)
                }
                );
            }
            getSeats();
        }
    }, [selectedHall, selectedDate, selectedTime]);
    const generateSeats = () => {
        const uniqueRows = Array.from(new Set(showSeats?.map((seat) => seat.row))).sort();
        return uniqueRows.map((rowLabel) => {
            const rowSeats = showSeats.filter((seat) => seat.row === rowLabel);
            return (
                <div key={rowLabel} className="row flex justify-center items-center gap-2 mb-2">
                    {rowSeats.map((seat) => (
                        <div
                            onClick={() => (seat.status === 'available' || selectedSeats.includes(seat) || (seat.user_id == user.id && (seat.status == 'unavailable'))) && handleSeatSelection(seat)}
                            key={seat.seat_id}
                            className={`seat rounded-sm w-8 h-8 flex items-center justify-center text-white text-center cursor-not-allowed
                                    ${(selectedSeats.includes(seat) || (seat.user_id == user?.id && seat.status == 'unavailable')) && user ? 'bg-blue-500 !cursor-pointer' :
                                    seat.status == 'available' ? 'bg-green-500 !cursor-pointer' :
                                        seat.status == 'reserved' ? 'bg-yellow-500' :
                                            seat.status == 'unavailable' ? 'bg-gray-500' :
                                                seat.status == 'bought' ? 'bg-red-500' : ''
                                }
                                `}
                        >
                            {seat.seat.number}
                        </div>
                    ))}
                    <div>{rowLabel}</div>
                </div>
            );
        });
    }

    useEffect(() => {
        let total = 0;
        selectedSeats.forEach(s => total += s.seat.price)
        setPrice(total);
    }, [selectedSeats])

    const handleDateChange = (date) => {
        if (date.date == selectedDate) {
            setSelectedDate(null);
        }
        else {
            setSelectedDate(date.date);
        }
        setHalls([]);
        setSelectedHall(null);
        setSelectedTime(null);
        setTimes([])
    }
    const handleHallChange = (event) => {
        const sHall = halls.find(hall => hall.hall.id == event.target.value);
        setSelectedTime(null)
        setSelectedHall(sHall || null);
    };

    useEffect(() => {
        const token = Cookies.get('token')
        axios.get(`http://localhost:8000/api/movies/${slug}`)
            .then((res) => {
                setMovie(res.data.movie)
                setLoading(false)
            })
            .catch(err => {
                navigate('/404')
            })
        axios.get('http://localhost:8000/api/user', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => {
            setUser(res.data);
        })
    }, [slug])

    useEffect(() => {
        axios.get(`http://localhost:8000/api/movieDates`, {
            params: {
                id: movie.id
            }
        }).then((res) => {

            const formattedDates = res.data.map((item) => {
                const dateObj = new Date(item.date);
                return {
                    date: item.date,
                    label: dateObj.toLocaleDateString("en-US", { weekday: "short" }),
                    md: `${dateObj.getDate().toString().padStart(2, "0")} ${dateObj.toLocaleDateString("en-US", { month: "short" })}`
                };
            });

            setDates(formattedDates);
        })
    }, [movie])


    const handleSeatSelection = async (seat) => {
        const token = Cookies.get('token');
        if (!user) {
            setMessage('You must be logged in to select a seat!');
            setModalOpen(true);
            return;
        }
        setSeatLoading(true);
        try {
            let newSelectedSeats;
            if (selectedSeats.some(s => s.id === seat.id)) {
                // User is deselecting the seat
                newSelectedSeats = selectedSeats.filter((s) => s.id !== seat.id);
            } else {
                // User is selecting the seat
                newSelectedSeats = [...selectedSeats, seat];
            }

            // num_seats must be at least 1
            const numSeatsToSend = newSelectedSeats.length > 0 ? newSelectedSeats.length : 1;

            const res = await axios.post('http://localhost:8000/api/show/seatSelect', {
                _method: 'PUT',
                show_id: show.id,
                seat_id: seat.id,
                num_seats: numSeatsToSend,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.data.status) {
                setShowSeats(res.data.show_seats);
                setSelectedSeats(res.data.show_seats.filter(s => s.status === 'unavailable' && s.user_id === user?.id));
                setRecommendedSeats(res.data.best_group_seats.seats)
                setTotal(res.data.best_group_seats.total_score)
            } else {
                setMessage(res.data.message);
                setShowSeats(res.data.show_seats);
                setModalOpen(true);
            }
        } catch (error) {
            setMessage(error.response?.data?.message || error.message);
            if (error.response?.data?.show_seats) {
                setShowSeats(error.response?.data?.show_seats);
            }
            setModalOpen(true);
        } finally {
            setSeatLoading(false);
        }
    };


    const resetSeats = async () => {
        if (!user) {
            return;
        }
        const token = Cookies.get('token');
        try {
            setSeatLoading(true)
            await axios.post('http://localhost:8000/api/show/seatReset', {
                _method: 'PUT',
                show_id: show.id,
                seats: selectedSeats.map((s) => s.id)
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((res) => {
                setMessage('Seats reseted successfully')
                setSelectedSeats([]);
                setSeatLoading(false)
                setModalOpen(true)
                setShowSeats(res.data.show_seats)
            })
        } catch (error) {
            setMessage(error.response.data.message ? error.response.data.message : error.message)
            setSeatLoading(false)
            setModalOpen(true)
        }
    }

    const handleBuy = () => {
        if (!user) {
            setMessage('Please login to buy seat');
            setModalOpen(true)
            return
        }
        if (selectedSeats.length === 0) {
            setMessage('No seats selected');
            setModalOpen(true)
            return
        }

        setBuyModalOpen(true)

    }

    const reserveNow = async () => {
        const token = Cookies.get('token');
        const s = selectedSeats.map((seat) => seat.id);

        try {
            const res = await axios.post('http://localhost:8000/api/booking/store', {
                show_id: show.id,
                total: price,
                seats: s.join(',')
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.data.status) {
                setMessage('Seat booking successful');
                setModalOpen(true);
                setShowSeats(res.data.show_seats);
                setSelectedSeats([]);
            }
        } catch (error) {
            setMessage(error.response?.data?.message || error.message);
            setModalOpen(true);
        }
    };


    const handleReservation = async () => {
        if (!user) {
            setMessage('Please login to reserve a seat');
            setModalOpen(true);
            return;
        }

        if (selectedSeats.length === 0) {
            setMessage('No seats selected');
            setModalOpen(true);
            return;
        }

        const selectedIds = selectedSeats.map((seat) => seat.id).sort();
        const recommendedIds = (recommendedSeats ?? []).map((seat) => seat.show_seat_id).sort();

        const isSame = JSON.stringify(selectedIds) === JSON.stringify(recommendedIds);

        if (!isSame && recommendedSeats?.length > 0) {
            setConfirmOpen(true); // Open confirmation modal
            return;
        }

        // Proceed with reservation if same or no recommendations
        await reserveNow();
    };

    return (
        <>
            {
                loading ? <Loader /> :
                    <>
                        {modalOpen &&
                            <Modal setOpen={setModalOpen} message={message} />
                        }
                        {confirmOpen && (
                            <Modal
                                setOpen={setConfirmOpen}
                                message={"You have not selected the recommended seats. Are you sure you want to continue?"}
                                showButtons={true}
                                onConfirm={() => {
                                    setConfirmOpen(false);
                                    reserveNow(); // Proceed if confirmed
                                }}
                            />
                        )}

                        {buyModalOpen &&
                            <BuyModal
                                setOpen={setBuyModalOpen}
                                movie={movie.name}
                                date={selectedDate}
                                time={selectedTime}
                                price={price}
                                number={selectedSeats.length}
                            />
                        }
                        <div className="container">
                            <div className="banner-booking rounded-xl h-[35vh] sm:h-[50vh] relative mt-8">
                                <img src={`http://localhost:8000/uploads/movies/cover/${movie.cover}`} alt="" className='h-full w-full rounded-xl object-cover' />
                                <div className="absolute bottom-8 -translate-x-1/2 left-1/2">
                                    <a href={movie.trailer} className="border border-gray-500 text-xs py-2 w-32 text-center inline-block rounded-full bg-secondary me-3" target='blank'><FontAwesomeIcon icon={faCirclePlay} className='me-2' />Watch Trailer</a>
                                </div>
                            </div>
                        </div>
                        <div className="movie-details my-8">
                            <div className="container">
                                {/* <div className="rating-movie">
                                    <FontAwesomeIcon icon={faStar} className='text-main' />
                                    <FontAwesomeIcon icon={faStar} className='text-main' />
                                    <FontAwesomeIcon icon={faStar} className='text-main' />
                                    <FontAwesomeIcon icon={faStar} className='text-main' />
                                    <FontAwesomeIcon icon={faStar} className='text-main' />
                                </div> */}
                                <h2 className='text-2xl mb-4'>{movie.name} : {movie.subtitle}</h2>
                                <table className='border-none max-sm:w-3/4 w-1/2 lg:w-1/4 text-sm'>
                                    <tr>
                                        <td className='text-main'>Release Date:</td>
                                        <td>{movie.release_date}</td>
                                    </tr>
                                    <tr>
                                        <td className='text-main'>Run Time:</td>
                                        <td>{formatMinutes(movie.runtime)}</td>
                                    </tr>
                                    <tr>
                                        <td className='text-main'>Director:</td>
                                        <td>{movie.director}</td>
                                    </tr>
                                    <tr>
                                        <td className='text-main'>Rating:</td>
                                        <td>{movie.rating}</td>
                                    </tr>
                                    <tr>
                                        <td className='text-main'>Genre:</td>
                                        <td>{movie.genres?.map((g) => g.name).join(", ")}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div className="booking-section">
                            <div className="container">
                                <div className="flex max-lg:flex-col gap-2">
                                    <div className="w-1/4 max-lg:w-full">
                                        <div className="rounded-lg bg-[#1A1A1A] p-3">
                                            Select Date
                                            <div className="flex date-wrapper gap-2 mt-2 text-center text-[11px] w-full overflow-x-auto">
                                                {dates.map((date, index) => (
                                                    <div
                                                        key={index}
                                                        className={`date-card text-nowrap p-1 rounded-md cursor-pointer transition-all duration-300 hover:bg-[#F3DD67] bg-black hover:text-black ${selectedDate == date.date ? '!bg-[#F3DD67] text-black' : ''}`}
                                                        onClick={() => handleDateChange(date)}
                                                    >
                                                        <p>{date.label}</p>
                                                        <p>{date.md}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="rounded-lg bg-[#1A1A1A] p-3 mt-6">
                                            Select Hall
                                            <select name="" id="" onChange={handleHallChange} className='w-full bg-[#151515] border border-gray-800 outline-none rounded-md p-1 mt-2'>
                                                <option value="">Select a hall</option>
                                                {halls.map((hall, index) => (
                                                    <option value={hall.hall_id} key={index} selected={selectedHall == hall.hall_id}>{hall.hall.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="rounded-lg bg-[#1A1A1A] p-3 mt-6">
                                            Select Time
                                            <div className="flex gap-2 mt-2 text-center text-[11px]">
                                                {times.map((time, index) => (
                                                    <div className={`time-card p-1 rounded-sm cursor-pointer transition-all duration-300 hover:bg-[#F3DD67] bg-black hover:text-black 
                                                        ${selectedTime == time.time ? '!bg-[#F3DD67] text-black' : ''}`}
                                                        key={index} onClick={() => setSelectedTime(time.time)}>
                                                        {console.log(time)}
                                                        <p>{dayjs.utc(time.time).format("hh:mm A")}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-1/2 max-lg:w-full">

                                        <div className='rounded-lg bg-[#1A1A1A] p-3 relative'>
                                            {
                                                seatLoading &&
                                                <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center bg-secondary">
                                                    Loading
                                                </div>
                                            }
                                            <img src="screen.png" className='w-1/2 absolute top-4 left-1/2 -translate-x-1/2' alt="" />
                                            <div className="screen-text">
                                                <h3 className="text-xl text-center mt-6">Screen Side</h3>
                                            </div>
                                            <div className="seat-wrapper mt-12">
                                                {selectedDate && selectedHall && selectedTime &&
                                                    <div className="">
                                                        {generateSeats()}
                                                        {recommendedSeats?.length > 0 &&
                                                            <p className="mt-4 text-center">
                                                                Recommended Seats:<br />
                                                                {recommendedSeats?.map((seat, index) => (
                                                                    <div key={index}>
                                                                        {seat.row}{seat.col} Score: {seat.score}
                                                                    </div>
                                                                ))}
                                                            </p>
                                                        }
                                                        <p className='text-center mt-1'>
                                                            {total &&
                                                                `Total Score: ${total}`
                                                            }
                                                        </p>
                                                    </div>
                                                }
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
                                                    <p>{selectedTime && selectedSeats.map((seat, index) => (
                                                        <span>
                                                            {seat.seat.number} {index == selectedSeats.length - 1 ? '' : ', '}
                                                        </span>
                                                    ))}</p>
                                                </div>
                                                <div className="flex justify-between mb-2">
                                                    <p>Total Price</p>
                                                    <p>Rs. {selectedTime && selectedSeats && (price)}</p>
                                                </div>
                                            </div>
                                            <div className="action-btns flex gap-1 text-center flex-wrap mt-3">
                                                <button onClick={handleBuy} className='py-1 px-2 rounded-full flex-grow bg-green-500'>Buy Tickets</button>
                                                <button onClick={handleReservation} className='py-1 px-2 rounded-full flex-grow bg-yellow-500'>Reserve</button>
                                                <button className='py-1 px-2 rounded-full flex-grow bg-red-500' onClick={resetSeats}>Reset</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
            }
        </>
    )
}

export default Booking