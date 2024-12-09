import React from 'react'

const AdminChangePassword = () => {
  return (
    <>
      <h2 className='text-2xl font-medium text-center mb-3'>Change Password</h2>
      <div className='form-container w-fit md:w-3/4 p-8 mx-auto rounded-lg shadow-sm shadow-current text-sm text-gray-300'>
      <div className="grid gap-2 grid-cols-1 md:grid-cols-2">
        <div className="">
          <label htmlFor="opassword">Old Password</label>
          <input
            type="password"
            name="opassword"
            className="w-full outline-none border border-gray-500 rounded-md bg-black p-1"
          />
        </div>
        <div className="">
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            name="password"
            className="w-full outline-none border border-gray-500 rounded-md bg-black p-1"
          />
        </div>
        <div className="">
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type="password"
            name="cpassword"
            className="w-full outline-none border border-gray-500 rounded-md bg-black p-1"
          />
        </div>
      </div>
        <button className="py-1 px-8 inline-block mt-4 text-black rounded-full bg-main">
          Save
        </button>
      </div>
    </>
  )
}

export default AdminChangePassword