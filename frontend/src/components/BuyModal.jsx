import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'


const BuyModal = ({ movie, time, date, price, number, setOpen }) => {
    const [paymentMethod, setPaymentMehod] = useState('')
    const handleBuy = async () => {
        
    }
    return (
        <>
            <div className='h-screen w-screen fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-50 z-50 '>
                <div className="modal-box p-5 pt-3 rounded-md bg-secondary text-white">
                    <div className="text-end mb-2">
                        <FontAwesomeIcon icon={faTimes} onClick={() => setOpen(false)} className='cursor-pointer' />
                    </div>
                    <table className='w-full mb-4 text-start'>
                        <tr>
                            <th className='text-start pr-24 pb-4'>Movie Name:</th>
                            <td>{movie}</td>
                        </tr>
                        <tr>
                            <th className='text-start pr-24 pb-4'>Date:</th>
                            <td>{date}</td>
                        </tr>
                        <tr>
                            <th className='text-start pr-24 pb-4'>Time:</th>
                            <td>{time}</td>
                        </tr>
                        <tr>
                            <th className='text-start pr-24 pb-4'>Number of Tickets:</th>
                            <td>{number}</td>
                        </tr>
                        <tr>
                            <th className='text-start pr-24 pb-4'>Price:</th>
                            <td>{price}</td>
                        </tr>
                    </table>
                    <select className='w-full outline-none border border-gray-500 rounded-md bg-black p-1 px-2 mb-6'
                        value={paymentMethod}
                        onChange={(e) => setPaymentMehod(e.target.value)}
                    >
                        <option value="">Select payment method</option>
                        <option value="esewa">E sewa</option>
                        <option value="Khalti">Khalti</option>
                    </select>
                    <div className="text-center">
                        <button className='py-1 px-6 rounded-full bg-green-500' onClick={hanldeBuy}>Buy Tickets</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BuyModal