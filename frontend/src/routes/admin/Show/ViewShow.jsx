import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import Cookies from 'js-cookie'
import axios from 'axios'

const ViewShow = () => {
    const { id } = useParams();
    const [showSeats, setShowSeats] = useState([]);
    const [show, setShow] = useState();
    const [loading,setLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
        const token = Cookies.get('token')
        const getSeats = async () => {
            await axios.get(`http://localhost:8000/api/show/${id}`,{
                 headers: {
                'Authorization': `Bearer ${token}`
            }
            }).then(res => {
                setShow(res.data.show);
                console.log(res.data.show.bookings)
                setShowSeats(res.data.show.show_seat)
                setLoading(false)
            }
        )
        .catch(err=>{
         navigate('/admin/404')
        })
        }
        getSeats();
    }, [id])

    const generateSeats = () => {
        const uniqueRows = Array.from(new Set(showSeats?.map((seat) => seat.row))).sort();
        return uniqueRows.map((rowLabel) => {
            const rowSeats = showSeats.filter((seat) => seat.row === rowLabel);
            return (
                <div key={rowLabel} className="row flex justify-center items-center gap-2 mb-2">
                    {rowSeats.map((seat) => (
                        <div
                            key={seat.seat_id}
                            className={`seat rounded-sm w-8 h-8 flex items-center justify-center text-white text-center cursor-not-allowed
                                    ${seat.status == 'available' ? 'bg-green-500 !cursor-pointer' :
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
    return (
        <>
            <h2 className='text-2xl font-medium text-center mb-3'>View Show</h2>
            <div className="form-container w-fit md:w-3/4 p-8 mx-auto rounded-lg shadow-sm shadow-current relative text-sm text-gray-300 mb-5">
                <img src="/screen.png" className='w-1/2 absolute top-4 left-1/2 -translate-x-1/2' alt="" />
                <div className="screen-text">
                    <h3 className="text-xl text-center mt-6">Screen Side</h3>
                </div>
                <div className="seat-wrapper mt-12">
                    {generateSeats()}
                </div>
            </div>
            <div className="form-container w-fit md:w-3/4 p-8 mx-auto rounded-lg shadow-sm shadow-current relative text-sm text-gray-300">
                <h2 className='text-2xl font-medium text-center mb-3'>Reservations</h2>
                <div className="overflow-auto text-sm text-gray-300">
                    <table className='table-striped w-full text-nowrap'>
                        <tr className='bg-main text-black'>
                            <td>S.N.</td>
                            <td>Reserved By</td>
                            <td>Status</td>
                            <td>Seats</td>
                        </tr>
                        {show?.bookings?.map((b,index)=>(
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{b.user?.name}</td>
                                <td>{b.status}</td>
                                <td>{b.booking_seats?.map((s)=>s.show_seat.seat.number + ", ")}</td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        </>
    )
}

export default ViewShow