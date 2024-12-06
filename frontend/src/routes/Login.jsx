import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useRef } from 'react';
import { Link } from 'react-router';

const Login = () => {
    const [type, setType] = useState(true);
    const icon = type ? faEye : faEyeSlash;

    const passwordInputRef = useRef(null);

    const togglePasswordVisibility = (event) => {
        event.preventDefault();
        
        passwordInputRef.current.focus();
        const cursorPosition = passwordInputRef.current.selectionStart;

        setType((prev) => !prev);

        setTimeout(() => {
            passwordInputRef.current.setSelectionRange(cursorPosition, cursorPosition);
        }, 0);
    };

    return (
        <>
            <section className="login my-16">
                <div className="container">
                    <div className="w-fit p-8 mx-auto rounded-lg shadow-sm shadow-current text-sm text-gray-300">
                        <h2 className="text-2xl mb-2">Login</h2>
                        <p>Please login to continue with your account</p>
                        <form className="mt-4">
                            <div className="form-group mb-3">
                                <label htmlFor="email">Email address</label>
                                <input
                                    type="email"
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
                                    icon={icon}
                                    className="absolute right-2 top-7 cursor-pointer"
                                    onClick={togglePasswordVisibility}
                                />
                            </div>
                            <div className="text-end mb-3">
                                <a href="#" className="text-main">
                                    Forgot your password?
                                </a>
                            </div>
                            <div className="text-center">
                                <button className="py-1 w-full text-black rounded-full bg-main">
                                    Login
                                </button>
                                <p className="mt-3">
                                    Don't have an account?
                                    <Link to="/register" className="text-main">
                                        Register here
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Login;
