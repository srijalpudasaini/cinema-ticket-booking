import { faPenSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router'

const Seats = () => {
  return (
    <>
        <h2 className='text-2xl font-medium text-center mb-3'>Seats</h2>
        <div className="text-end mb-4">
            <Link to='/admin/seat/add' className='py-1 px-2 text-black bg-main'> + Add Seat</Link>
        </div>
        <div className="overflow-auto p-8 mx-auto rounded-lg shadow-sm shadow-current text-sm text-gray-300">
            <table className='table-striped w-full text-nowrap'>
                <tr className='bg-main text-black'>
                    <td>S.N.</td>
                    <td>Hall</td>
                    <td>Action</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Name</td>
                    <td className='flex gap-4 justify-center'>
                        <FontAwesomeIcon icon={faPenSquare} className='text-blue-600' size='xl'/>
                        <FontAwesomeIcon icon={faTrash} className='text-red-600' size='xl'/>
                    </td>
                </tr>
            </table>
        </div>
    </>
  )
}

export default Seats