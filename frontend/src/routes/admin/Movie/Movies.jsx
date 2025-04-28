import { faPenSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import Loader from '../../../components/Loader'
import axios from 'axios'

const Movies = () => {

    const [movies, setMovies] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8000/api/movies')
            .then((res) => {
                setMovies(res.data.movies)
                setLoading(false)
            })
    }, [])
    return (
        <>
            <h2 className='text-2xl font-medium text-center mb-3'>Movies</h2>
            <div className="text-end mb-4">
                <Link to='/admin/movie/add' className='py-1 px-2 text-black bg-main'> + Add Movie</Link>
            </div>
            <div className="overflow-auto p-8 mx-auto rounded-lg shadow-sm shadow-current text-sm text-gray-300">
                <table className='table-striped w-full text-nowrap'>
                    <tr className='bg-main text-black'>
                        <td>S.N.</td>
                        <td>Thumbnail</td>
                        <td>Name</td>
                        <td>Subtitle</td>
                        <td>Release Date</td>
                        <td>Trailer</td>
                        <td>Status</td>
                        <td>Action</td>
                    </tr>
                    {
                        loading ? <Loader /> :
                            movies.map((movie, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td><img src={`http://localhost:8000/uploads/movies/thumbnail/${movie.thumbnail}`} alt={movie.name} height={100} width={60} className='mx-auto' /></td>
                                    <td>{movie.name}</td>
                                    <td>{movie.subtitle}</td>
                                    <td>{movie.release_date}</td>
                                    <td>{movie.trailer}</td>
                                    <td>{movie.status}</td>
                                    <td className='flex gap-4 justify-center items-center align-middle' align='center'>
                                        <Link to={`/admin/movie/edit/${movie.id}`}>
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

export default Movies