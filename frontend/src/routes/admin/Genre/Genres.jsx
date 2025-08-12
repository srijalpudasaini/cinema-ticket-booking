import { faPenSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import axios from 'axios'
import Loader from '../../../components/Loader'
import DeleteModal from '../../../components/DeleteModal'

const Genres = () => {

    const [genres, setGenres] = useState([]);

    const [deleteModalOpen,setDeleteModalOpen] = useState(false)
    const[id,setId] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8000/api/genres?inactive=true')
            .then((res) => {
                setGenres(res.data.genres)
                setLoading(false)
            })
    }, [])
    
    const handleDelete = (id) =>{
        setId(id)
        setDeleteModalOpen(true)
    }
    return (
        <>
            {deleteModalOpen && 
                <DeleteModal model={'genre'} id={id} setOpen={setDeleteModalOpen} setData={setGenres}/>
            }
            <h2 className='text-2xl font-medium text-center mb-3'>Genres</h2>
            <div className="text-end mb-4">
                <Link to='/admin/genre/add' className='py-1 px-2 text-black bg-main'> + Add Genre</Link>
            </div>
            <div className="overflow-auto p-8 mx-auto rounded-lg shadow-sm shadow-current text-sm text-gray-300">
                <table className='table-striped w-full text-nowrap'>
                    <tr className='bg-main text-black'>
                        <td>S.N.</td>
                        <td>Name</td>
                        <td>Status</td>
                        <td>Action</td>
                    </tr>
                    {
                        loading ? <Loader /> :
                            genres.map((genre, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{genre.name}</td>
                                    <td>{genre.status ? 'Active' : 'Inactive'}</td>
                                    <td className='flex gap-4 justify-center'>
                                        <Link to={`/admin/genre/edit/${genre.id}`}>
                                            <FontAwesomeIcon icon={faPenSquare} className='text-blue-600' size='xl' />
                                        </Link>
                                        <FontAwesomeIcon icon={faTrash} className='text-red-600 cursor-pointer' size='xl' onClick={()=>handleDelete(genre.id)}/>
                                    </td>
                                </tr>
                            ))
                    }
                </table>
            </div>
        </>
    )
}

export default Genres