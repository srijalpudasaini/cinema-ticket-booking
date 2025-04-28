import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

const Modal = ({ message, setOpen }) => {
    return (
        <div className='h-screen w-screen fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-50 z-50 animation-scale'>
            <div className="modal-box p-5 pt-3 rounded-md bg-secondary text-white">
                <div className="text-end mb-2">
                    <FontAwesomeIcon icon={faTimes} onClick={()=>setOpen(false)} className='cursor-pointer'/>
                </div>

                <p className='mb-4 me-7'>{message}</p>
            </div>
        </div>
    )
}

export default Modal