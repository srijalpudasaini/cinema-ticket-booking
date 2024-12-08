import React from 'react'

const Tickets = () => {
  return (
    <>
      <div className="overflow-auto">
        <table className='w-full text-nowrap table-striped'>
          <tr className='text-black bg-main'>
            <td>Movie</td>
            <td>Date</td>
            <td>Time</td>
            <td>Hall</td>
            <td>Seat</td>
            <td>Price</td>
            <td>Ticket</td>
          </tr>
          <tr>
            <td>Movie</td>
            <td>Date</td>
            <td>Time</td>
            <td>Hall</td>
            <td>Seat</td>
            <td>Price</td>
            <td>Ticket</td>
          </tr>
          <tr>
            <td>Movie</td>
            <td>Date</td>
            <td>Time</td>
            <td>Hall</td>
            <td>Seat</td>
            <td>Price</td>
            <td>Ticket</td>
          </tr>
          <tr>
            <td>Movie</td>
            <td>Date</td>
            <td>Time</td>
            <td>Hall</td>
            <td>Seat</td>
            <td>Price</td>
            <td>Ticket</td>
          </tr>
        </table>
      </div>
    </>
  )
}

export default Tickets