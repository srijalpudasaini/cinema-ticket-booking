import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import Loader from '../../../components/Loader';
import Cookies from 'js-cookie'
const EditShow = () => {
    const { id } = useParams();
    const [movies, setMovies] = useState([]);
    const [halls, setHalls] = useState([]);
    const [show, setShow] = useState({});
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();
    const token = Cookies.get('token')
    const handleFocus = (e) => {
        e.target.showPicker()
    }
    const [errors, setErrors] = useState({})
    useEffect(() => {
        axios.get(`http://localhost:8000/api/show/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                setShow(res.data.show)
                setLoading(false)
            })
            .catch(err=>{
                navigate('/admin/404')
            })
        axios.get('http://localhost:8000/api/movies')
            .then((res) => {
                setMovies(res.data.movies)
            })
        axios.get('http://localhost:8000/api/halls')
            .then((res) => {
                setHalls(res.data.halls)
            })
    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setShow((show) => (
            {
                ...show,
                [name]: value
            }
        ))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('_method', 'PUT');
        Object.keys(show).forEach((key) => {
            formData.append(key, show[key]);
        });

        try {
            const response = await axios.post(`http://localhost:8000/api/show/update/${id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then((res) => {
                    navigate('/admin/shows')
                })
        } catch (error) {
            setErrors(error.response.data.errors)
        }
    }
    return (
        <>
            <h2 className='text-2xl font-medium text-center mb-3'>Edit Show</h2>
            <div className="form-container w-fit md:w-3/4 p-8 mx-auto rounded-lg shadow-sm shadow-current text-sm text-gray-300">
                {
                    loading ? <Loader /> :
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-3">
                                <label htmlFor="movie">Movie</label>
                                <select name="movie_id" id="movie" className={`w-full outline-none border border-gray-500 rounded-md bg-black p-1 px-2 ${errors?.movie && 'border-red-300'}`} value={show.movie_id} onChange={handleChange}>
                                    {
                                        movies && movies.map((movie, index) => (
                                            <option value={movie.id} key={index}>{movie.name}</option>
                                        )
                                        )
                                    }
                                </select>
                                {errors?.movie && <span className='text-red-400'>{errors?.movie}</span>}
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="date">Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    id='date'
                                    className={`w-full outline-none border border-gray-500 rounded-md bg-black p-1 ${errors?.date && 'border-red-300'}`}
                                    onFocus={handleFocus}
                                    value={show.date}
                                    onChange={handleChange}
                                />
                                {errors?.date && <span className='text-red-400'>{errors?.date}</span>}
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="time">Time</label>
                                <input
                                    type="time"
                                    name="time"
                                    id='time'
                                    className={`w-full outline-none border border-gray-500 rounded-md bg-black p-1 ${errors?.time && 'border-red-300'}`}
                                    onFocus={handleFocus}
                                    value={show.time}
                                    onChange={handleChange}
                                />
                                {errors?.time && <span className='text-red-400'>{errors?.time}</span>}
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="hall">Hall</label>
                                <select name="hall_id" id="hall" className={`w-full outline-none border border-gray-500 rounded-md bg-black p-1 px-2 ${errors?.hall && 'border-red-300'}`} value={show.hall_id} onChange={handleChange}>
                                    {
                                        halls && halls.map((hall, index) => (
                                            <option value={hall.id} key={index}>{hall.name}</option>
                                        )
                                        )
                                    }
                                </select>
                                {errors?.hall && <span className='text-red-400'>{errors?.hall}</span>}
                            </div>
                            <div className="text-center pt-3">
                                <button className="py-2 inline-block px-6 text-black rounded-full bg-main">
                                    Update Show
                                </button>
                            </div>
                        </form>
                }
            </div>
        </>
    )
}

export default EditShow