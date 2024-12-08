import React from 'react'

const AddMovie = () => {
  const handleFocus = (e) =>{
    e.target.showPicker()
  }
  return (
    <>
      <h2 className='text-2xl font-medium text-center mb-3'>Add Movie</h2>
      <div className="form-container w-fit md:w-3/4 p-8 mx-auto rounded-lg shadow-sm shadow-current text-sm text-gray-300">
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
          <label htmlFor="run_time">Run Time</label>
          <input
            type="text"
            name="run_time"
            id='run_time'
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
          <label htmlFor="cover_image">Cover Image</label>
          <input
            type="file"
            name="cover_image"
            id='cover_image'
            className="w-full outline-none border border-gray-500 rounded-md bg-black p-1 px-2"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="thumbnail_image">Thumbnail Image</label>
          <input
            type="file"
            name="thumbnail_image"
            id='thumbnail_image'
            className="w-full outline-none border border-gray-500 rounded-md bg-black p-1 px-2"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="upcoming">Upcoming</label>
          <select name="upcoming" id="upcoming" className='w-full outline-none border border-gray-500 rounded-md bg-black p-1 px-2'>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="active">Active</label>
          <select name="active" id="active" className='w-full outline-none border border-gray-500 rounded-md bg-black p-1 px-2'>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="text-center pt-3">
          <button className="py-2 inline-block px-6 text-black rounded-full bg-main">
            Add Movie
          </button>
        </div>
      </div>
    </>
  )
}

export default AddMovie