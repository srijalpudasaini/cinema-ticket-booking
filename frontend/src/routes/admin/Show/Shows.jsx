import { faEye, faPenSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import Loader from '../../../components/Loader'
import axios from 'axios'
import Cookies from 'js-cookie'

const Shows = () => {
    const [shows, setShows] = useState([]);

    const [loading, setLoading] = useState(true);
    const token = Cookies.get('token')

    useEffect(() => {
        axios.get('http://localhost:8000/api/shows',{
            headers:{
              'Authorization':`Bearer ${token}`
            }
          })
            .then((res) => {
                setShows(res.data.shows)
                setLoading(false)
            })
    }, [])
    return (
        <>
            <h2 className='text-2xl font-medium text-center mb-3'>Shows</h2>
            <div className="text-end mb-4">
                <Link to='/admin/show/add' className='py-1 px-2 text-black bg-main'> + Add Show</Link>
            </div>
            <div className="overflow-auto p-8 mx-auto rounded-lg shadow-sm shadow-current text-sm text-gray-300">
                {loading ? <Loader /> :
                    <table className='table-striped w-full text-nowrap'>
                        <tr className='bg-main text-black'>
                            <td>S.N.</td>
                            <td>Movie</td>
                            <td>Date</td>
                            <td>Time</td>
                            <td>Hall</td>
                            <td>Action</td>
                        </tr>
                        {shows.map((show, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{show.movie.name}</td>
                                <td>{show.date}</td>
                                <td>{show.time}</td>
                                <td>{show.hall.name}</td>
                                <td className='flex gap-4 justify-center'>
                                    <Link to='/admin/show/view'>
                                        <FontAwesomeIcon icon={faEye} className='text-green-600' size='xl' />
                                    </Link>
                                    <Link to={`/admin/show/edit/${show.id}`}>
                                        <FontAwesomeIcon icon={faPenSquare} className='text-blue-600' size='xl' />
                                    </Link>
                                    <FontAwesomeIcon icon={faTrash} className='text-red-600' size='xl' />
                                </td>
                            </tr>
                        ))}
                    </table>
                }
            </div>
        </>
    )
}

export default Shows