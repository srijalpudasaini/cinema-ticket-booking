import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import Cookies from 'js-cookie'


const AddGenre = () => {

  const navigate = useNavigate();
  const [errors,setErrors] = useState({})


  const handleSubmit = async (e) =>{
    e.preventDefault();
    const token = Cookies.get('token');

    const formData = new FormData(e.target)
    try {
      const response = await axios.post('http://localhost:8000/api/genre/store',formData,{
        headers:{
          'Authorization':`Bearer ${token}`
        }
      });
      if(response.data.status){
        navigate('/admin/genres')
      }
    } catch (error) {
      console.error('Error adding genre:', error);
      setErrors(error.response.data.errors)
    }

  }
  return (
    <>
      <h2 className='text-2xl font-medium text-center mb-3'>Add Genre</h2>
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
            <label htmlFor="status">Status</label>
             <select className='w-full outline-none border border-gray-500 rounded-md bg-black p-1 px-2 mb-6' name='status'>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
            </select>
            {errors?.status && <span className='text-red-400'>{errors?.status}</span>}
          </div>
          <div className="text-center pt-3">
            <button className="py-2 inline-block px-6 text-black rounded-full bg-main">
              Add Genre
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddGenre