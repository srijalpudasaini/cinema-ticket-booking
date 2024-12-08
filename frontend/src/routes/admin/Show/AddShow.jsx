import React from 'react'

const AddShow = () => {
  const handleFocus = (e) =>{
    e.target.showPicker()
  }
  return (
    <>
      <h2 className='text-2xl font-medium text-center mb-3'>Add Show</h2>
      <div className="form-container w-fit md:w-3/4 p-8 mx-auto rounded-lg shadow-sm shadow-current text-sm text-gray-300">
        <div className="form-group mb-3">
          <label htmlFor="movie">Movie</label>
          <select name="movie" id="movie" className='w-full outline-none border border-gray-500 rounded-md bg-black p-1 px-2'>
            <option value="">Doctor Strange</option>
            <option value="">Avengers Endgame</option>
          </select>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="release_date">Date</label>
          <input
            type="date"
            name="release_date"
            id='release_date'
            className="w-full outline-none border border-gray-500 rounded-md bg-black p-1 px-2"
            onFocus={handleFocus}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="time">Time</label>
          <input
            type="time"
            name="time"
            id='time'
            className="w-full outline-none border border-gray-500 rounded-md bg-black p-1 px-2"
            onFocus={handleFocus}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="hall">Hall</label>
          <select name="hall" id="hall" className='w-full outline-none border border-gray-500 rounded-md bg-black p-1 px-2'>
            <option value="">Hall 1</option>
            <option value="">Hall 2</option>
          </select>
        </div>
        <div className="text-center pt-3">
          <button className="py-2 inline-block px-6 text-black rounded-full bg-main">
            Add Show
          </button>
        </div>
      </div>
    </>
  )
}

export default AddShow