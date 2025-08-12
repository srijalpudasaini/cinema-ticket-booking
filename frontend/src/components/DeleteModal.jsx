import axios from 'axios'
import React, { useState } from 'react'
import Modal from './Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Cookies from 'js-cookie'

const DeleteModal = ({ model, id, setOpen, setData }) => {
    const [modalOpen, setModalOpen] = useState(false)
    const [message, setMessage] = useState("")
    const token = Cookies.get('token')
    const [loading, setLoading] = useState(false)
    const handleDelete = () => {
        setLoading(true)
        axios.delete(`http://localhost:8000/api/${model}/delete/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                setOpen(false)
                setModalOpen(true)
                setMessage(res.data.message)
                setData(res.data[model + 's'])
            })
            .catch((err) => {
                setOpen(false)
                setModalOpen(true)
                setMessage(err.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }
    return (
        <>
            {modalOpen &&
                <Modal setOpen={setModalOpen} message={message} />
            }
            <div className='h-screen w-screen fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-50 z-50 animation-scale'>
                <div className="modal-box p-5 pt-3 rounded-md bg-secondary text-white">
                    <div className="text-end mb-2">
                        <FontAwesomeIcon icon={faTimes} onClick={() => setOpen(false)} className='cursor-pointer' />
                    </div>
                    <p className='mb-4 me-7'>Are you sure you want to delete this {model}?</p>
                    <div className="flex justify-end gap-3">
                        <button className='bg-main text-black py-1 px-2 text-xs rounded-sm' onClick={() => setOpen(false)}>Cancel</button>
                        <button 
                            className='bg-red-600 text-white py-1 px-2 text-xs rounded-sm' 
                            onClick={handleDelete}
                            disabled={loading}
                        >
                            {loading ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeleteModal