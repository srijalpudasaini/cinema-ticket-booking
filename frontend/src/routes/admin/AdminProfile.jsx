import React from 'react'
import { Link } from 'react-router'

const AdminProfile = () => {
  return (
    <>
      <h2 className='text-2xl font-medium text-center mb-3'>Profile</h2>
      <div className='form-container w-fit md:w-3/4 p-8 mx-auto rounded-lg shadow-sm shadow-current text-sm text-gray-300'>
        <div className="grid gap-2 grid-cols-1 md:grid-cols-2">
          <div className="">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              name="name"
              className="w-full outline-none border border-gray-500 rounded-md bg-black p-1"
              value="Srijal Pudasaini"
            />
          </div>
          <div className="">
            <label htmlFor="number">Phone</label>
            <input
              type="number"
              name="number"
              className="w-full outline-none border border-gray-500 rounded-md bg-black p-1"
              value="9810008986"
            />
          </div>
          <div className="">
            <label htmlFor="name">Email</label>
            <input
              type="email"
              name="email"
              className="w-full outline-none border border-gray-500 rounded-md bg-black p-1"
              value="srijalpudasaini89@gmail.com"
            />
          </div>
        </div>
        <button className="py-1 px-8 inline-block mt-4 text-black rounded-full bg-main">
          Save
        </button>
        <br />
        <Link to='change-password' className="py-1 px-8 inline-block mt-4 text-black rounded-full bg-main">
          Change Password
        </Link>
      </div>
    </>
  )
}

export default AdminProfile