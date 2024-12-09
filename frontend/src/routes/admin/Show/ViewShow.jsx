import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router'

const ViewShow = () => {
    return (
        <>
            <h2 className='text-2xl font-medium text-center mb-3'>View Show</h2>
            <div className="form-container w-fit md:w-3/4 p-8 mx-auto rounded-lg shadow-sm shadow-current relative text-sm text-gray-300 mb-5">
                <img src="/screen.png" className='w-1/2 absolute top-4 left-1/2 -translate-x-1/2' alt="" />
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
            <div className="form-container w-fit md:w-3/4 p-8 mx-auto rounded-lg shadow-sm shadow-current relative text-sm text-gray-300">
            <h2 className='text-2xl font-medium text-center mb-3'>Reservations</h2>
                <div className="overflow-auto text-sm text-gray-300">
                    <table className='table-striped w-full text-nowrap'>
                        <tr className='bg-main text-black'>
                            <td>S.N.</td>
                            <td>Reserved By</td>
                            <td>Status</td>
                            <td>Seats</td>
                            <td>Action</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Name</td>
                            <td>Subtitle</td>
                            <td>Active</td>
                            <td className='flex gap-4 justify-center'>
                                <Link to='/admin/show/view'>
                                    <FontAwesomeIcon icon={faEye} className='text-green-600' size='xl' />
                                </Link>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ViewShow