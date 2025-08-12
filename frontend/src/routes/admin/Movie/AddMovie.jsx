import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router';

const AddMovie = () => {
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const [genres,setGenres] = useState([])

  useEffect(()=>{
    axios.get('http://localhost:8000/api/genres')
      .then((res) => {
        setGenres(res.data.genres)
      })
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get('token')

    const formData = new FormData(e.target)
    try {
      const response = await axios.post('http://localhost:8000/api/movie/store', formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.data.status) {
        navigate('/admin/movies')
      }
    } catch (error) {
      console.error('Error adding movie:', error);
      setErrors(error.response.data.errors)
    }

  }
  const handleFocus = (e) => {
    e.target.showPicker()
  }
  return (
    <>
      <h2 className='text-2xl font-medium text-center mb-3'>Add Movie</h2>
      <div className="form-container w-fit md:w-3/4 p-8 mx-auto rounded-lg shadow-sm shadow-current text-sm text-gray-300">
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id='name'
              className={`w-full outline-none border border-gray-500 rounded-md bg-black p-1 ${errors?.name && 'border-red-300'}`}
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
            />
            {errors?.release_date && <span className='text-red-400'>{errors?.release_date}</span>}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="runtime">Run Time (in minutes)</label>
            <input
              type="number"
              name="runtime"
              id='runtime'
              className={`w-full outline-none border border-gray-500 rounded-md bg-black p-1 ${errors?.runtime && 'border-red-300'}`}
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
            />
            {errors?.director && <span className='text-red-400'>{errors?.director}</span>}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="genre">Genres</label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {
                genres && genres.map((genre, index) => (
                  <div key={index}>
                    <input type="checkbox" name='genres[]' value={genre.id} className='mr-3 p-1'/>
                    {genre.name}
                  </div>
                )
                )
              }
            </div>
            {errors?.genres && <span className='text-red-400'>{errors?.genres}</span>}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="trailer">Trailer</label>
            <input
              type="text"
              name="trailer"
              id='trailer'
              className={`w-full outline-none border border-gray-500 rounded-md bg-black p-1 ${errors?.trailer && 'border-red-300'}`}
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
            />
            {errors?.thumbnail && <span className='text-red-400'>{errors?.thumbnail}</span>}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="status">Status</label>
            <select name="status" id="status" className={`w-full outline-none border border-gray-500 rounded-md bg-black p-1 px-2 ${errors?.thumbnail && 'border-red-300'}`}>
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="previous">Previous</option>
            </select>
            {errors?.status && <span className='text-red-400'>{errors?.status}</span>}
          </div>
          <div className="text-center pt-3">
            <button className="py-2 inline-block px-6 text-black rounded-full bg-main">
              Add Movie
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddMovie