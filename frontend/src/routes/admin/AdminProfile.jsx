import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import Cookies from 'js-cookie'
import Modal from '../../components/Modal';
import useAuthContext from '../../context/AuthContext';

const AdminProfile = () => {
  const { user, getUser } = useAuthContext();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [modalOpen, setModalOpen] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    setName(user?.name)
    setEmail(user?.email)
    setPhone(user?.phone)
  }, [user])


  const handleSubmit = async (e) => {
    const token = Cookies.get('token')

    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/updateProfile', {
        _method: 'PUT',
        name,
        email,
        phone
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then((res) => {
          setMessage(res.data.message)
          setModalOpen(true)
          getUser()
        })
    } catch (error) {
      setMessage(error.response.data.message ? error.response.data.message : error.message)
      setModalOpen(true)
    }

  }
  return (
    <>
    {modalOpen &&
      <Modal setOpen={setModalOpen} message={message}/>
    }
      <h2 className='text-2xl font-medium text-center mb-3'>Profile</h2>
      <div className='form-container w-fit md:w-3/4 p-8 mx-auto rounded-lg shadow-sm shadow-current text-sm text-gray-300'>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-2 grid-cols-1 md:grid-cols-2">
          <div className="">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              name="name"
              className="w-full outline-none border border-gray-500 rounded-md bg-black p-1"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
          </div>
          <div className="">
            <label htmlFor="phone">Phone</label>
            <input
              type="number"
              name="phone"
              className="w-full outline-none border border-gray-500 rounded-md bg-black p-1"
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
            />
          </div>
          <div className="">
            <label htmlFor="name">Email</label>
            <input
              type="email"
              name="email"
              className="w-full outline-none border border-gray-500 rounded-md bg-black p-1"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
        </div>
        <button className="py-1 px-8 inline-block mt-4 text-black rounded-full bg-main">
          Save
        </button>
      </form>
        <Link to='change-password' className="py-1 px-8 inline-block mt-4 text-black rounded-full bg-main">
          Change Password
        </Link>
      </div>
    </>
  )
}

export default AdminProfile