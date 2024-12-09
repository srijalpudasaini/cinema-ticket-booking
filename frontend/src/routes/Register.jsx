import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useRef } from 'react';
import { Link } from 'react-router';

const Register = () => {
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

    return (
        <section className="login my-16">
            <div className="container">
                <div className="w-fit p-8 mx-auto rounded-lg shadow-sm shadow-current text-sm text-gray-300">
                    <h2 className="text-2xl mb-2">Register</h2>
                    <p>Please create an account</p>
                    <form className="mt-4">
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
                            <label htmlFor="cpassword">Confirm Password</label>
                            <input
                                ref={confirmPasswordInputRef}
                                type={ctype ? "password" : "text"}
                                name="cpassword"
                                id="cpassword"
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
                        <div className="text-center">
                            <button className="py-2 w-full text-black rounded-full bg-main">
                                Register
                            </button>
                            <p className="mt-3">
                                Already have an account? <Link to="/login" className="text-main">Login here</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Register;
