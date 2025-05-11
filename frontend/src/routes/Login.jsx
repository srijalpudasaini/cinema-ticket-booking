import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
const Login = () => {

    const { user, login } = useAuth();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (user) {
            if (user.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/");
            }
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        try {
            const res = await axios.post("http://localhost:8000/api/login", formData);
            if (res.data.status) {
                login(res.data.user, res.data.token);
                if (res.data.user.role == 'user') {
                    navigate("/");
                }
                else {
                    navigate("/admin");
                }
            }
        } catch (error) {
            console.log(error);
            if(error.response.status == 404){
                setErrors(error.response.data)
            }
            else{
                setErrors(error.response.data.errors)
            }
        }
    };

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
                        <form className="mt-4" onSubmit={handleSubmit}>
                            <div className="form-group mb-3">
                                <label htmlFor="email">Email address</label>
                                <input
                                    type="email"
                                    name="email"
                                    className={`w-full outline-none border border-gray-500 rounded-md bg-black p-1 ${errors?.email && 'border-red-300'}`}
                                />
                                {errors?.email && <span className='text-red-400'>{errors?.email}</span>}
                            </div>
                            <div className="form-group mb-3 relative">
                                <label htmlFor="password">Password</label>
                                <input
                                    ref={passwordInputRef}
                                    type={type ? "password" : "text"}
                                    name="password"
                                    className={`w-full outline-none border border-gray-500 rounded-md bg-black p-1 ${errors?.password && 'border-red-300'}`}
                                />
                                <FontAwesomeIcon
                                    icon={icon}
                                    className="absolute right-2 top-7 cursor-pointer"
                                    onClick={togglePasswordVisibility}
                                />
                                {errors?.password && <span className='text-red-400'>{errors?.password}</span>}
                            </div>
                            {errors?.message && <span className='text-red-400'>{errors?.message}</span>}
                            <div className="text-end mb-3">
                                <a href="#" className="text-main">
                                    Forgot your password?
                                </a>
                            </div>
                            <div className="text-center">
                                <button className="py-2 w-full text-black rounded-full bg-main">
                                    Login
                                </button>
                                <p className="mt-3">
                                    Don't have an account? <Link to="/register" className="text-main">Register here</Link>
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
