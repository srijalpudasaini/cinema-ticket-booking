import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import Loader from '../../../components/Loader';
import Cookies from 'js-cookie'

const EditMovie = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [movie, setMovie] = useState({});
    const [errors, setErrors] = useState({})

    const [loading, setLoading] = useState(true);
    const [cover, setCover] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const token = Cookies.get('token')

    useEffect(() => {
        axios.get(`http://localhost:8000/api/movie/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                setMovie(res.data.movie)
                setLoading(false)
            })
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target
        setMovie((prev) => ({
            ...prev,
            [name]: value
        })
        )
    }

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (name === 'cover') setCover(files[0]);
        if (name === 'thumbnail') setThumbnail(files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            formData.append('_method', 'PUT');
            formData.append('name', movie.name);
            formData.append('subtitle', movie.subtitle);
            formData.append('trailer', movie.trailer);
            formData.append('rating', movie.rating);
            formData.append('release_date', movie.release_date);
            formData.append('runtime', movie.runtime);
            formData.append('director', movie.director);
            formData.append('genre', movie.genre);
            formData.append('status', movie.status);

            if (cover) formData.append("cover", cover)
            if (thumbnail) formData.append("thumbnail", thumbnail)

            const response = await axios.post(`http://localhost:8000/api/movie/update/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data", 'Authorization': `Bearer ${token}` }
            });
            if (response.data.status) {
                navigate('/admin/movies')
            }
        } catch (error) {
            console.error('Error adding hall:', error);
        }

    }
    const handleFocus = (e) => {
        e.target.showPicker()
    }
    return (
        <>
            <h2 className='text-2xl font-medium text-center mb-3'>Edit Movie</h2>
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
                                value={movie.name}
                                onChange={handleChange}
                            />
                            {errors?.name && <span className='text-red-400'>{errors?.name}</span>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="name">Subtitle</label>
                            <input
                                type="text"
                                name="subtitle"
                                id='subtitle'
                                className={`w-full outline-none border border-gray-500 rounded-md bg-black p-1 ${errors?.subtitle && 'border-red-300'}`}
                                value={movie.subtitle}
                                onChange={handleChange}
                            />
                            {errors?.subtitle && <span className='text-red-400'>{errors?.subtitle}</span>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="rating">Rating</label>
                            <input
                                type="number"
                                name="rating"
                                id='rating'
                                className={`w-full outline-none border border-gray-500 rounded-md bg-black p-1 ${errors?.rating && 'border-red-300'}`}
                                value={movie.rating}
                                onChange={handleChange}
                            />
                            {errors?.rating && <span className='text-red-400'>{errors?.rating}</span>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="release_date">Release Date</label>
                            <input
                                type="date"
                                name="release_date"
                                id='release_date'
                                className={`w-full outline-none border border-gray-500 rounded-md bg-black p-1 ${errors?.release_date && 'border-red-300'}`}
                                onFocus={handleFocus}
                                value={movie.release_date}
                                onChange={handleChange}
                            />
                            {errors?.release_date && <span className='text-red-400'>{errors?.release_date}</span>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="runtime">Run Time</label>
                            <input
                                type="text"
                                name="runtime"
                                id='runtime'
                                className={`w-full outline-none border border-gray-500 rounded-md bg-black p-1 ${errors?.runtime && 'border-red-300'}`}
                                value={movie.runtime}
                                onChange={handleChange}
                            />
                            {errors?.runtime && <span className='text-red-400'>{errors?.runtime}</span>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="director">Director</label>
                            <input
                                type="text"
                                name="director"
                                id='director'
                                className={`w-full outline-none border border-gray-500 rounded-md bg-black p-1 ${errors?.director && 'border-red-300'}`}
                                value={movie.director}
                                onChange={handleChange}
                            />
                            {errors?.director && <span className='text-red-400'>{errors?.director}</span>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="genre">Genre</label>
                            <input
                                type="text"
                                name="genre"
                                id='genre'
                                className={`w-full outline-none border border-gray-500 rounded-md bg-black p-1 ${errors?.genre && 'border-red-300'}`}
                                value={movie.genre}
                                onChange={handleChange}
                            />
                            {errors?.genre && <span className='text-red-400'>{errors?.genre}</span>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="trailer">Trailer</label>
                            <input
                                type="text"
                                name="trailer"
                                id='trailer'
                                className={`w-full outline-none border border-gray-500 rounded-md bg-black p-1 ${errors?.trailer && 'border-red-300'}`}
                                value={movie.trailer}
                                onChange={handleChange}
                            />
                            {errors?.trailer && <span className='text-red-400'>{errors?.trailer}</span>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="cover">Cover Image</label>
                            <input
                                type="file"
                                name="cover"
                                id='cover'
                                className={`w-full outline-none border border-gray-500 rounded-md bg-black p-1 ${errors?.cover && 'border-red-300'}`}
                                onChange={handleFileChange}
                            />
                            {errors?.cover && <span className='text-red-400'>{errors?.cover}</span>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="thumbnail">Thumbnail Image</label>
                            <input
                                type="file"
                                name="thumbnail"
                                id='thumbnail'
                                className={`w-full outline-none border border-gray-500 rounded-md bg-black p-1 ${errors?.thumbnail && 'border-red-300'}`}
                                onChange={handleFileChange}
                            />
                            {errors?.thumbnail && <span className='text-red-400'>{errors?.thumbnail}</span>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="status">Status</label>
                            <select name="status" id="status" className={`w-full outline-none border border-gray-500 rounded-md bg-black p-1 px-2 ${errors?.status && 'border-red-300'}`} value={movie.status} onChange={handleChange}>
                                <option value="upcoming" >Upcoming</option>
                                <option value="ongoing" >Ongoing</option>
                                <option value="previous" >Previous</option>
                            </select>
                            {errors?.status && <span className='text-red-400'>{errors?.status}</span>}
                        </div>
                        <div className="text-center pt-3">
                            <button className="py-2 inline-block px-6 text-black rounded-full bg-main">
                                Update Movie
                            </button>
                        </div>
                    </form>
                }
            </div>
        </>
    )
}

export default EditMovie