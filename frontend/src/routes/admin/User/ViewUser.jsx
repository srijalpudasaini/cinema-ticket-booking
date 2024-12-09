import React from 'react'

const ViewUser = () => {
    return (
        <>
            <h2 className='text-2xl font-medium text-center mb-3'>View User</h2>
            <div className="form-container w-fit md:w-3/4 p-8 mx-auto rounded-lg shadow-sm shadow-current text-sm text-gray-300">
                <table className='border-none max-sm:w-3/4 w-1/2 text-sm mb-4'>
                    <tr>
                        <td className='text-main'>User Name:</td>
                        <td>Srijal</td>
                    </tr>
                    <tr>
                        <td className='text-main'>Email:</td>
                        <td>2hr 09min</td>
                    </tr>
                    <tr>
                        <td className='text-main'>Contact:</td>
                        <td>Srijal</td>
                    </tr>
                </table>
                <h2 className='text-xl font-medium text-center mb-3'>Reservation History</h2>
                <div className="overflow-auto">
                    <table className='table-striped w-full text-nowrap'>
                        <tr className='bg-main text-black'>
                            <td>Show Details</td>
                            <td>Date</td>
                            <td>Seats</td>
                            <td>Status</td>
                            <td>Quantity</td>
                        </tr>
                        <tr>
                            <td>Show Details</td>
                            <td>Date</td>
                            <td>Date</td>
                            <td>Date</td>
                            <td>Quantity</td>
                        </tr>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ViewUser