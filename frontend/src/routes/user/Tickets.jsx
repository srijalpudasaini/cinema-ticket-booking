import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from "react-router";
import Modal from '../../components/Modal';
import Loader from '../../components/Loader';
import Cookies from 'js-cookie'

const Tickets = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status');
  const [modalOpen, setModalOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      if (!status || status != 'false') {
        const res = await axios.get('http://localhost:8000/api/esewa/verify?data=' + searchParams.get('data'), {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
          }
        });
        setMessage(res.data.message)
        setModalOpen(true)
        if (res.data.status) {
          getTickets();
        }
      }
    }
    fetchData();
  }, [status])

  const getTickets = async () => {
    setLoading(true)
    try{
      const res = await axios.get('http://localhost:8000/api/tickets', {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      })
      setTickets(res.data.tickets);
      setLoading(false)
    }
    catch(error){
      setLoading(false)
    }
  }
  useEffect(() => {
    getTickets()
  }, [])
  return (
    <>
      {
        modalOpen &&
        <Modal
          setOpen={setModalOpen}
          message={message}
        />
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
            tickets.length !== 0 ?
              tickets.map((ticket, index) => (
                <tr key={index}>
                  <td>{ticket.show.movie.name + " " + ticket.show.movie.subtitle}</td>
                  <td>{ticket.show.date}</td>
                  <td>{ticket.booking_seats.map((b) => b.show_seat.seat.number + ',')}</td>
                  <td>{ticket.booking_seats.length}</td>
                  <td>{ticket.total_price}</td>
                  <td>
                    <button className="rounded-sm bg-blue-500 text-white px-2 py-1 me-2">Download</button>
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

export default Tickets