import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { useAuth } from '../context/AuthContext';
// import useAuth from '../context/AuthContext';

const Header = () => {
    const location = useLocation();
    const [nav, setNav] = useState(false)
    const navigate = useNavigate()


    const { user, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };




    return (
        <>
            <header className='header py-3'>
                <div className="container">
                    <div className="flex items-center justify-between gap-16">
                        <div className="logo">
                            <Link to='/'>
                                <h2 className='text-4xl font-semibold'>Seat<span className='text-main'>ly</span></h2>
                            </Link>
                        </div>
                        <div className='md:flex items-center gap-8 hidden'>
                            <nav>
                                <ul className='flex gap-8'>
                                    <li>
                                        <Link to='/' className={`${location.pathname == '/' ? 'text-main' : 'hover:text-main'} transition-all duration-300`}>Home</Link>
                                    </li>
                                    <li>
                                        <Link to='/about' className={`${location.pathname == '/about' ? 'text-main' : 'hover:text-[#F3DD67]'} transition-all duration-300`}>About Us</Link>
                                    </li>
                                    <li>
                                        <Link to='/' className={`${location.pathname == '/contact' ? 'text-main' : 'hover:text-[#F3DD67]'} transition-all duration-300`}>Contact Us</Link>
                                    </li>
                                </ul>
                            </nav>
                            <div className="user-icon flex items-center gap-2 relative group cursor-pointer z-50">
                                <div className="rounded-full h-8 w-8 bg-gray-400"></div>
                                {
                                    user ? <>
                                        <p>{user.name}</p>
                                        <div className="user-dropdown absolute invisible top-[120%] left-10 group-hover:visible  group-hover:top-[110%] min-w-fit py-1 ps-2 pe-10 shadow-sm shadow-current rounded-sm transition-all ease-in duration-150 bg-black">
                                            <Link to={user.role == 'user' ? 'user' : 'admin'} className='block text-sm'>Profile</Link>
                                            <p onClick={handleLogout} className='text-sm'>Logout</p>
                                        </div>
                                    </>
                                        :
                                        <Link to='login'>Login</Link>
                                }
                            </div>
                        </div>
                        <button className='md:hidden' onClick={() => setNav(!nav)}>
                            <div className="line"></div>
                            <div className="line"></div>
                            <div className="line"></div>
                        </button>
                    </div>
                </div>
                <aside className={`${nav ? 'right-0' : '-right-full'} bg-main h-dvh fixed top-0 w-[300px] transition-all duration-300 ease-in p-3 text-black md:hidden z-50`}>
                    <div className="text-end mb-4">
                        <button onClick={() => setNav(!nav)} className='close'>
                        </button>
                    </div>
                    <ul className="nav">
                        <li className='mb-2'><Link to='/'>Home</Link></li>
                        <li className='mb-2'><Link to='/about'>About Us</Link></li>
                        <li className='mb-2'><Link to='/contact'>Contact Us</Link></li>
                        {user ?
                            <>
                                <li className='mb-2'><Link to={user.role == 'user' ? 'user' : 'admin'}>Profile</Link></li>
                                <li onClick={handleLogout} className='mb-2'>Logout</li>
                            </>
                            :

                            <li className='mb-2'><Link to='/login'>Login</Link></li>
                        }
                    </ul>
                </aside>
            </header>
            <div className={`${nav ? 'block' : 'hidden'} h-dvh w-screen bg-black fixed top-0 bg-opacity-60 z-40`} onClick={() => setNav(!nav)}></div>
        </>
    )
}

export default Header