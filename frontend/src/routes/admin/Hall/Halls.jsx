import { faPenSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import axios from 'axios'
import Loader from '../../../components/Loader'

const Halls = () => {

    const [halls, setHalls] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8000/api/halls')
            .then((res) => {
                setHalls(res.data.halls)
                setLoading(false)
            })
    }, [])
    return (
        <>
            <h2 className='text-2xl font-medium text-center mb-3'>Halls</h2>
            <div className="text-end mb-4">
                <Link to='/admin/hall/add' className='py-1 px-2 text-black bg-main'> + Add Hall</Link>
            </div>
            <div className="overflow-auto p-8 mx-auto rounded-lg shadow-sm shadow-current text-sm text-gray-300">
                <table className='table-striped w-full text-nowrap'>
                    <tr className='bg-main text-black'>
                        <td>S.N.</td>
                        <td>Name</td>
                        <td>No. of rows</td>
                        <td>No. of cols</td>
                        <td>Action</td>
                    </tr>
                    {
                        loading ? <Loader /> :
                            halls.map((hall, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{hall.name}</td>
                                    <td>{hall.rows}</td>
                                    <td>{hall.cols}</td>
                                    <td className='flex gap-4 justify-center'>
                                        <Link to={`/admin/hall/edit/${hall.id}`}>
                                            <FontAwesomeIcon icon={faPenSquare} className='text-blue-600' size='xl' />
                                        </Link>
                                        <FontAwesomeIcon icon={faTrash} className='text-red-600' size='xl' />
                                    </td>
                                </tr>
                            ))
                    }
                </table>
            </div>
        </>
    )
}

export default Halls