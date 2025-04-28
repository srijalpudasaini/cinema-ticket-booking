import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import Loader from '../../components/Loader';
import Modal from '../../components/Modal';

const Reservation = () => {
  const [reservations, setReservations] = useState();
  const [loading, setLoading] = useState(true)
  const token = Cookies.get('token');

  const [message, setMessage] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  useEffect(() => {
    axios.get('http://localhost:8000/api/reservations', { headers: { 'Authorization': `Bearer ${token}` } })
      .then((res) => {
        console.log(res.data)
        setReservations(res.data.reservations)
        setLoading(false)
      })
  }, []);

  const handleCancel = async (id) => {
    try {
      await axios.post('http://localhost:8000/api/cancelSeats', {
        id,
        '_method': 'PUT'
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then((res) => {
          setMessage(res.data.message)
          setModalOpen(true)
        })
    } catch (error) {
      setMessage(error || error.data.response.message)
      setModalOpen(true)
    }
  }
  return (
    <>
      {modalOpen &&
        <Modal setOpen={setModalOpen} message={message} />
      }
      <div className="overflow-auto">
        <table className='w-full text-nowrap table-striped'>
          <tr className='bg-main text-black'>
            <td>Movie</td>
            <td>Date</td>
            <td>Seats</td>
            <td>Quantity</td>
            <td>Price</td>
            <td>Action</td>
          </tr>
          {loading ? <Loader /> :
            reservations.length !== 0 ?
              reservations.map((reservation, index) => (
                <tr key={index}>
                  <td>{reservation.show.movie.name + " " + reservation.show.movie.subtitle}</td>
                  <td>{reservation.show.date}</td>
                  <td>{reservation.booking_seats.map((b) => b.seat.number + ',')}</td>
                  <td>{reservation.booking_seats.length}</td>
                  <td>{reservation.total_price}</td>
                  <td>
                    <a href="" className="rounded-sm bg-blue-500 text-white px-2 py-1 me-2">Buy</a>
                    <button onClick={() => handleCancel(reservation.id)} className="rounded-sm bg-red-500 text-white px-2 py-1">Cancel</button>
                  </td>
                </tr>
              ))
              :
              <tr>
                <td colSpan={6}>You do not have any reservations.</td>
              </tr>
          }
        </table>
      </div>
    </>
  )
}

export default Reservation