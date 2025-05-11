import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import Cookies from 'js-cookie'


const AddHall = () => {

  const navigate = useNavigate();
  const [errors,setErrors] = useState({})


  const handleSubmit = async (e) =>{
    e.preventDefault();
    const token = Cookies.get('token');

    const formData = new FormData(e.target)
    try {
      const response = await axios.post('http://localhost:8000/api/hall/store',formData,{
        headers:{
          'Authorization':`Bearer ${token}`
        }
      });
      if(response.data.status){
        navigate('/admin/halls')
      }
    } catch (error) {
      console.error('Error adding hall:', error);
      setErrors(error.response.data.errors)
    }

  }
  return (
    <>
      <h2 className='text-2xl font-medium text-center mb-3'>Add Hall</h2>
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
            <label htmlFor="rows">No. of rows</label>
            <input
              type="number"
              name="rows"
              id='rows'
              className={`w-full outline-none border border-gray-500 rounded-md bg-black p-1 ${errors?.rows && 'border-red-300'}`}
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
            />
            {errors?.price && <span className='text-red-400'>{errors?.price}</span>}
          </div>
          <div className="text-center pt-3">
            <button className="py-2 inline-block px-6 text-black rounded-full bg-main">
              Add Hall
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddHall