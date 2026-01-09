import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Modal = ({ message, setOpen, showButtons = false, onConfirm = null }) => {
    return (
        <div className='h-screen w-screen fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-50 z-50 animation-scale'>
            <div className="modal-box p-5 pt-3 rounded-md bg-secondary text-white max-w-md w-full">
                <div className="text-end mb-2">
                    <FontAwesomeIcon icon={faTimes} onClick={() => setOpen(false)} className='cursor-pointer' />
                </div>
                <p className='mb-4 me-7'>{message}</p>

                {showButtons && (
                    <div className="flex justify-end gap-3 mt-4">
                        <button
                            className="bg-green-600 px-4 py-1 rounded hover:bg-green-700 transition"
                            onClick={() => {
                                if (onConfirm) onConfirm();
                                setOpen(false);
                            }}
                        >
                            Yes
                        </button>
                        <button
                            className="bg-red-600 px-4 py-1 rounded hover:bg-red-700 transition"
                            onClick={() => setOpen(false)}
                        >
                            No
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;
