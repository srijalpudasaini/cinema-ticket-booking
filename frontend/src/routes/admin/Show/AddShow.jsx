import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie'
import Modal from '../../../components/Modal';

const AddShow = () => {

  const [movies, setMovies] = useState([]);
  const [halls, setHalls] = useState([]);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({})
  const [modalOpen,setModalOpen] = useState(false)
  const handleFocus = (e) => {
    e.target.showPicker()
  }
  useEffect(() => {
    axios.get('http://localhost:8000/api/movies')
      .then((res) => {
        setMovies(res.data.movies)
      })
    axios.get('http://localhost:8000/api/halls')
      .then((res) => {
        setHalls(res.data.halls)
      })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get('token')

    const formData = new FormData(e.target)

    try {
      const response = await axios.post('http://localhost:8000/api/show/store', formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then((res) => {
          // console.log(res)
          navigate('/admin/shows')
        })

    } catch (error) {
      setErrors(error.response.data.errors || error.response.data.message)
      setModalOpen(true)
    }
  }
  return (
    <>
      {modalOpen &&
        <Modal setOpen={setModalOpen} message={errors} />
      }
      <h2 className='text-2xl font-medium text-center mb-3'>Add Show</h2>
      <div className="form-container w-fit md:w-3/4 p-8 mx-auto rounded-lg shadow-sm shadow-current text-sm text-gray-300">
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="movie">Movie</label>
            <select name="movie_id" id="movie" className={`w-full outline-none border border-gray-500 rounded-md bg-black p-1 px-2 ${errors?.movie && 'border-red-300'}`}>
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
            />
            {errors?.time && <span className='text-red-400'>{errors?.time}</span>}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="hall">Hall</label>
            <select name="hall_id" id="hall" className={`w-full outline-none border border-gray-500 rounded-md bg-black p-1 px-2 ${errors?.hall && 'border-red-300'}`}>
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
              Add Show
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddShow