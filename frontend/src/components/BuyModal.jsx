import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useState } from 'react'
import Cookies from 'js-cookie'

const BuyModal = ({ movie, time, date, price, number, setOpen, showId, seats, booking_id = null }) => {
    const [paymentMethod, setPaymentMethod] = useState('')
    const handleBuy = async () => {
        try {
            const res = await axios.post('http://localhost:8000/api/booking/buy', { show_id: showId, seats, total: price, booking_id,payment_method:paymentMethod },{
                headers:{
                    Authorization: `Bearer ${Cookies.get('token')}`
                }
            })
            const data = res.data.data
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = 'https://rc-epay.esewa.com.np/api/epay/main/v2/form';

            const fields = {
                amount:data.amount,
                tax_amount: 0,
                total_amount: data.total_amount,
                transaction_uuid: data.transaction_uuid,
                product_code: data.product_code,
                product_service_charge: 0,
                product_delivery_charge: 0,
                success_url: data.success_url,
                failure_url: data.failure_url,
                signed_field_names: data.signed_field_names,
                signature: data.signature,
            };

            Object.entries(fields).forEach(([key, value]) => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = value;
                form.appendChild(input);
            });

            document.body.appendChild(form);
            form.submit();
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className='h-screen w-screen fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-50 z-50 overflow-hidden'>
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
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                        <option value="">Select payment method</option>
                        <option value="esewa">E sewa</option>
                        <option value="Khalti">Khalti</option>
                    </select>
                    <div className="text-center">
                        <button className='py-1 px-6 rounded-full bg-green-500' onClick={handleBuy}>Buy Tickets</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BuyModal