import axios from 'axios';
import React from 'react'
import Cookies from 'js-cookie'

const AddMovie = () => {

  const handleSubmit = async (e) => {
    e.preventDefault();
     const token = Cookies.get('token')

    const formData = new FormData(e.target)
    try {
      const response = await axios.post('http://localhost:8000/api/movie/store', formData,{
        headers:{
          'Authorization':`Bearer ${token}`
        }
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
      <h2 className='text-2xl font-medium text-center mb-3'>Add Movie</h2>
      <div className="form-container w-fit md:w-3/4 p-8 mx-auto rounded-lg shadow-sm shadow-current text-sm text-gray-300">
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id='name'
              className="w-full outline-none border border-gray-500 rounded-md bg-black p-1 px-2"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="name">Subtitle</label>
            <input
              type="text"
              name="subtitle"
              id='subtitle'
              className="w-full outline-none border border-gray-500 rounded-md bg-black p-1 px-2"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="rating">Rating</label>
            <input
              type="number"
              name="rating"
              id='rating'
              className="w-full outline-none border border-gray-500 rounded-md bg-black p-1 px-2"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="release_date">Release Date</label>
            <input
              type="date"
              name="release_date"
              id='release_date'
              className="w-full outline-none border border-gray-500 rounded-md bg-black p-1 px-2"
              onFocus={handleFocus}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="runtime">Run Time</label>
            <input
              type="text"
              name="runtime"
              id='runtime'
              className="w-full outline-none border border-gray-500 rounded-md bg-black p-1 px-2"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="director">Director</label>
            <input
              type="text"
              name="director"
              id='director'
              className="w-full outline-none border border-gray-500 rounded-md bg-black p-1 px-2"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="genre">Genre</label>
            <input
              type="text"
              name="genre"
              id='genre'
              className="w-full outline-none border border-gray-500 rounded-md bg-black p-1 px-2"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="trailer">Trailer</label>
            <input
              type="text"
              name="trailer"
              id='trailer'
              className="w-full outline-none border border-gray-500 rounded-md bg-black p-1 px-2"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="cover">Cover Image</label>
            <input
              type="file"
              name="cover"
              id='cover'
              className="w-full outline-none border border-gray-500 rounded-md bg-black p-1 px-2"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="thumbnail">Thumbnail Image</label>
            <input
              type="file"
              name="thumbnail"
              id='thumbnail'
              className="w-full outline-none border border-gray-500 rounded-md bg-black p-1 px-2"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="status">Status</label>
            <select name="status" id="status" className='w-full outline-none border border-gray-500 rounded-md bg-black p-1 px-2'>
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="previous">Previous</option>
            </select>
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