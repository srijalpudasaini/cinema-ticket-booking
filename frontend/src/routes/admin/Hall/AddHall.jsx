import React from 'react'

const AddHall = () => {
  return (
    <>
      <h2 className='text-2xl font-medium text-center mb-3'>Add Hall</h2>
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
          <label htmlFor="no_of_rows">No. of rows</label>
          <input
            type="number"
            name="no_of_rows"
            id='no_of_rows'
            className="w-full outline-none border border-gray-500 rounded-md bg-black p-1 px-2"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="no_of_cols">No. of cols</label>
          <input
            type="number"
            name="no_of_cols"
            id='no_of_cols'
            className="w-full outline-none border border-gray-500 rounded-md bg-black p-1 px-2"
          />
        </div>
        <div className="text-center pt-3">
          <button className="py-2 inline-block px-6 text-black rounded-full bg-main">
            Add Hall
          </button>
        </div>
      </div>
    </>
  )
}

export default AddHall