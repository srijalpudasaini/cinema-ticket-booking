import React, { useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios';
import Modal from '../../components/Modal';
const AdminChangePassword = () => {
  const [message, setMessage] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  // const 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append('_method', 'PUT')
    const token = Cookies.get('token');
    try {
      axios.post('http://localhost:8000/api/changePassword', formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then((res) => {
        setMessage(res.data.message)
        setModalOpen(true)
      })
    } catch (error) {
      setMessage(error.response.data.message || error.message)
      setModalOpen(true)
    }
  }
  return (
    <>
      {modalOpen &&
        <Modal setOpen={setModalOpen} message={message} />
      }
      <h2 className='text-2xl font-medium text-center mb-3'>Change Password</h2>
      <div className='form-container w-fit md:w-3/4 p-8 mx-auto rounded-lg shadow-sm shadow-current text-sm text-gray-300'>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-2 grid-cols-1 md:grid-cols-2">
          <div className="">
            <label htmlFor="opassword">Old Password</label>
            <input
              type="password"
              name="old_password"
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
              name="password_confirmation"
              className="w-full outline-none border border-gray-500 rounded-md bg-black p-1"
            />
          </div>
        </div>
        <button className="py-1 px-8 inline-block mt-4 text-black rounded-full bg-main">
          Save
        </button>
      </form>
      </div>
    </>
  )
}

export default AdminChangePassword;