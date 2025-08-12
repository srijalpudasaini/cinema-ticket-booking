import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import Loader from '../../../components/Loader';
import Cookies from 'js-cookie'


const EditGenre = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [genre, setGenre] = useState({});

    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({})
    const token = Cookies.get('token')

    useEffect(() => {
        axios.get(`http://localhost:8000/api/genre/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                setGenre(res.data.genre)
                setLoading(false)
            })
            .catch(err=>{
                navigate('/admin/404')
            })
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target
        setGenre((prev) => ({
            ...prev,
            [name]: value
        })
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:8000/api/genre/update/${id}`, genre, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data)
            if (response.data.status) {
                console.log('ok')
                navigate('/admin/genres')
            }
        } catch (error) {
            console.error('Error updating genre:', error);
            setErrors(error.response.data.errors)
        }

    }
    return (
        <>
            <h2 className='text-2xl font-medium text-center mb-3'>Edit Genre</h2>
            <div className="form-container w-fit md:w-3/4 p-8 mx-auto rounded-lg shadow-sm shadow-current text-sm text-gray-300">
                {loading ? <Loader /> :
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                name="name"
                                id='name'
                                className={`w-full outline-none border border-gray-500 rounded-md bg-black p-1 ${errors?.name && 'border-red-300'}`}
                                value={genre.name}
                                onChange={handleChange}
                            />
                            {errors?.name && <span className='text-red-400'>{errors?.name}</span>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="status">Status</label>
                            <select className='w-full outline-none border border-gray-500 rounded-md bg-black p-1 px-2 mb-6' name='status' onChange={handleChange}>
                                <option value="1" selected={+genre.status === 1 }>Active</option>
                                <option value="0" selected={+genre.status === 0 }>Inactive</option>
                            </select>
                            {errors?.status && <span className='text-red-400'>{errors?.status}</span>}
                        </div>
                        <div className="text-center pt-3">
                            <button className="py-2 inline-block px-6 text-black rounded-full bg-main">
                                Update Genre
                            </button>
                        </div>
                    </form>
                }
            </div>
        </>
    )
}

export default EditGenre