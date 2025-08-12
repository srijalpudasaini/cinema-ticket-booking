import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import Loader from '../../../components/Loader';
import Cookies from 'js-cookie'


const EditHall = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [hall, setHall] = useState({});
    const [price, setPrice] = useState();

    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({})
    const token = Cookies.get('token')

    useEffect(() => {
        axios.get(`http://localhost:8000/api/hall/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                setHall(res.data.hall)
                setPrice(res.data.price)
                setLoading(false)
            })
            .catch(err=>{
                navigate('/admin/404')
            })
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target
        setHall((prev) => ({
            ...prev,
            [name]: value
        })
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...hall,
            price
        }

        console.log(payload)
        try {
            const response = await axios.put(`http://localhost:8000/api/hall/update/${id}`, payload, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.data.status) {
                navigate('/admin/halls')
            }
        } catch (error) {
            console.error('Error updating hall:', error);
            setErrors(error.response.data.errors)
        }

    }
    return (
        <>
            <h2 className='text-2xl font-medium text-center mb-3'>Edit Hall</h2>
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
                                value={hall.name}
                                onChange={handleChange}
                            />
                            {errors?.name && <span className='text-red-400'>{errors?.name}</span>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="rows">No. of rows</label>
                            <input
                                type="number"
                                name="rows"
                                id='rows'
                                className={`w-full outline-none border border-gray-500 rounded-md bg-black p-1 ${errors?.rows && 'border-red-300'}`}
                                value={hall.rows}
                                onChange={handleChange}
                            />
                            {errors?.rows && <span className='text-red-400'>{errors?.rows}</span>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="cols">No. of cols</label>
                            <input
                                type="number"
                                name="cols"
                                id='cols'
                                className={`w-full outline-none border border-gray-500 rounded-md bg-black p-1 ${errors?.cols && 'border-red-300'}`}
                                value={hall.cols}
                                onChange={handleChange}
                            />
                            {errors?.cols && <span className='text-red-400'>{errors?.cols}</span>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="price">Price</label>
                            <input
                                type="number"
                                name="price"
                                id='price'
                                className={`w-full outline-none border border-gray-500 rounded-md bg-black p-1 ${errors?.price && 'border-red-300'}`}
                                value={price}
                                onChange={(e) => setPrice(parseInt(e.target.value))}
                            />
                            {errors?.price && <span className='text-red-400'>{errors?.price}</span>}
                        </div>
                        <div className="text-center pt-3">
                            <button className="py-2 inline-block px-6 text-black rounded-full bg-main">
                                Update Hall
                            </button>
                        </div>
                    </form>
                }
            </div>
        </>
    )
}

export default EditHall