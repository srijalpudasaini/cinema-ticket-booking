import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useRef, useState } from 'react'
import Cookies from 'js-cookie'

const AddUser = () => {
    const [type, setType] = useState(true);
    const [ctype, setCtype] = useState(true);

    const passwordInputRef = useRef(null);
    const confirmPasswordInputRef = useRef(null);

    const togglePasswordVisibility = (event, ref, setter) => {
        event.preventDefault();

        ref.current.focus();
        const cursorPosition = ref.current.selectionStart;

        setter((prev) => !prev);

        setTimeout(() => {
            ref.current.setSelectionRange(cursorPosition, cursorPosition);
        }, 0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = Cookies.get('token')

        const formData = new FormData(e.target)
        try {
            const response = await axios.post('http://localhost:8000/api/user/store', formData,{
                headers:{
                  'Authorization':`Bearer ${token}`
                }
              });
            if (response.data.status) {
                navigate('/admin/users')
            }
        } catch (error) {
            console.error('Error adding hall:', error);
        }

    }
    return (
        <>
            <h2 className='text-2xl font-medium text-center mb-3'>Add User</h2>
            <div className="form-container w-fit md:w-3/4 p-8 mx-auto rounded-lg shadow-sm shadow-current text-sm text-gray-300">
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="name"
                            id="name"
                            name="name"
                            className="w-full outline-none border border-gray-500 rounded-md bg-black p-1"
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="phone">Phone</label>
                        <input
                            type="number"
                            id="phone"
                            name="phone"
                            className="w-full outline-none border border-gray-500 rounded-md bg-black p-1"
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="email">Email address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full outline-none border border-gray-500 rounded-md bg-black p-1"
                        />
                    </div>
                    <div className="form-group mb-3 relative">
                        <label htmlFor="password">Password</label>
                        <input
                            ref={passwordInputRef}
                            type={type ? "password" : "text"}
                            name="password"
                            className="w-full outline-none border border-gray-500 rounded-md bg-black p-1"
                        />
                        <FontAwesomeIcon
                            icon={type ? faEye : faEyeSlash}
                            className="absolute right-2 top-7 cursor-pointer"
                            onClick={(e) =>
                                togglePasswordVisibility(e, passwordInputRef, setType)
                            }
                        />
                    </div>
                    <div className="form-group mb-3 relative">
                        <label htmlFor="password_confirmation">Confirm Password</label>
                        <input
                            ref={confirmPasswordInputRef}
                            type={ctype ? "password" : "text"}
                            name="password_confirmation"
                            id="password_confirmation"
                            className="w-full outline-none border border-gray-500 rounded-md bg-black p-1"
                        />
                        <FontAwesomeIcon
                            icon={ctype ? faEye : faEyeSlash}
                            className="absolute right-2 top-7 cursor-pointer"
                            onClick={(e) =>
                                togglePasswordVisibility(e, confirmPasswordInputRef, setCtype)
                            }
                        />
                    </div>
                    <div className="text-center pt-3">
                        <button className="py-2 inline-block px-6 text-black rounded-full bg-main">
                            Add User
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddUser