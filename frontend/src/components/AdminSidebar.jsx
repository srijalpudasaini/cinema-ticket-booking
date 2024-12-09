import React, { useState } from 'react';
import { Link } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faClapperboard, faCouch, faFilm, faUser, faVideo } from '@fortawesome/free-solid-svg-icons';

const AdminSidebar = ({ nav, setNav }) => {
  const [activeDropdown, setActiveDropdown] = useState(null); // Track active dropdown globally

  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu); // Toggle or close other dropdowns
  };

  return (
    <div className={`transition-all duration-300 ease-in ${nav ? 'w-1/5' : 'w-20'}`}>
      <aside
        className={`sidebar bg-[#1A1A1A] fixed border-r left-0 h-screen top-0 p-2 transition-all duration-300 ease-in ${nav ? 'w-1/5 overflow-y-auto' : 'w-20'}`}
      >
        <div className={`flex items-center ${nav ? 'justify-between' : 'justify-center'}`}>
          <div className={nav ? 'block' : 'hidden'}>
            <Link to="/">
              <h2 className="text-2xl font-semibold">
                Seat<span className="text-main">ly</span>
              </h2>
            </Link>
          </div>
          <button onClick={() => setNav(!nav)}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </button>
        </div>

        <ul className="mt-8">
          <li className="mb-3 relative">
            <div
              className={`p-2 rounded-md flex items-center hover:bg-[#F3DD67] hover:text-black cursor-pointer ${nav ? 'justify-between' : 'justify-center'}`}
              onClick={() => toggleDropdown('movie')}
            >
              <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faClapperboard} />
                {nav &&
                  <span className={`${nav ? 'block' : 'hidden'}`}>Movie</span>
                }
              </div>
              {nav && <FontAwesomeIcon icon={faAngleDown} />}
            </div>
            <ul
              className={`text-sm overflow-hidden transition-all duration-800 ease-in ${nav ? 'pl-5 mt-2' : 'absolute bg-[#1A1A1A] top-0 w-28 left-[4.5rem]'} ${!nav && activeDropdown === 'movie' ? 'p-1 text-nowrap' : ''} ${activeDropdown === 'movie' ? 'max-h-14' : 'max-h-0'
                }`}
            >
              <li className="mb-1">
                <Link to="movies" className="hover:text-[#F3DD67]">
                  Movies
                </Link>
              </li>
              <li>
                <Link to="movie/add" className="hover:text-[#F3DD67]">
                  Add Movie
                </Link>
              </li>
            </ul>
          </li>
          <li className="mb-3 relative">
            <div
              className={`p-2 rounded-md flex items-center hover:bg-[#F3DD67] hover:text-black cursor-pointer ${nav ? 'justify-between' : 'justify-center'}`}
              onClick={() => toggleDropdown('show')}
            >
              <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faVideo} />
                <span className={`${nav ? 'block' : 'hidden'}`}>Show</span>
              </div>
              {nav && <FontAwesomeIcon icon={faAngleDown} />}
            </div>
            <ul
              className={`text-sm overflow-hidden transition-all duration-800 ease-in ${nav ? 'pl-5 mt-2' : 'absolute bg-[#1A1A1A] top-0 w-28 left-[4.5rem]'} ${!nav && activeDropdown === 'show' ? 'p-1 text-nowrap' : ''} ${activeDropdown === 'show' ? 'max-h-14' : 'max-h-0'
                }`}
            >
              <li className="mb-1">
                <Link to="shows" className="hover:text-[#F3DD67]">
                  Shows
                </Link>
              </li>
              <li>
                <Link to="show/add" className="hover:text-[#F3DD67]">
                  Add Show
                </Link>
              </li>
            </ul>
          </li>
          <li className="mb-3 relative">
            <div
              className={`p-2 rounded-md flex items-center hover:bg-[#F3DD67] hover:text-black cursor-pointer ${nav ? 'justify-between' : 'justify-center'}`}
              onClick={() => toggleDropdown('hall')}
            >
              <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faFilm} />
                <span className={`${nav ? 'block' : 'hidden'}`}>Hall</span>
              </div>
              {nav && <FontAwesomeIcon icon={faAngleDown} />}
            </div>
            <ul
              className={`text-sm overflow-hidden transition-all duration-800 ease-in ${nav ? 'pl-5 mt-2' : 'absolute bg-[#1A1A1A] top-0 w-28 left-[4.5rem]'} ${!nav && activeDropdown === 'hall' ? 'p-1 text-nowrap' : ''} ${activeDropdown === 'hall' ? 'max-h-14' : 'max-h-0'
                }`}
            >
              <li className="mb-1">
                <Link to="halls" className="hover:text-[#F3DD67]">
                  Halls
                </Link>
              </li>
              <li>
                <Link to="hall/add" className="hover:text-[#F3DD67]">
                  Add Hall
                </Link>
              </li>
            </ul>
          </li>
          <li className="mb-3 relative">
            <div
              className={`p-2 rounded-md flex items-center hover:bg-[#F3DD67] hover:text-black cursor-pointer ${nav ? 'justify-between' : 'justify-center'}`}
              onClick={() => toggleDropdown('seat')}
            >
              <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faCouch} />
                <span className={`${nav ? 'block' : 'hidden'}`}>Seat</span>
              </div>
              {nav && <FontAwesomeIcon icon={faAngleDown} />}
            </div>
            <ul
              className={`text-sm overflow-hidden transition-all duration-800 ease-in ${nav ? 'pl-5 mt-2' : 'absolute bg-[#1A1A1A] top-0 w-28 left-[4.5rem]'} ${!nav && activeDropdown === 'seat' ? 'p-1 text-nowrap' : ''} ${activeDropdown === 'seat' ? 'max-h-14' : 'max-h-0'
                }`}
            >
              <li className="mb-1">
                <Link to="seats" className="hover:text-[#F3DD67]">
                  Seats
                </Link>
              </li>
              <li>
                <Link to="seat/add" className="hover:text-[#F3DD67]">
                  Add Seat
                </Link>
              </li>
            </ul>
          </li>
          <li className="mb-3 relative">
            <div
              className={`p-2 rounded-md flex items-center hover:bg-[#F3DD67] hover:text-black cursor-pointer ${nav ? 'justify-between' : 'justify-center'}`}
              onClick={() => toggleDropdown('user')}
            >
              <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faUser} />
                <span className={`${nav ? 'block' : 'hidden'}`}>User</span>
              </div>
              {nav && <FontAwesomeIcon icon={faAngleDown} />}
            </div>
            <ul
              className={`text-sm overflow-hidden transition-all duration-800 ease-in ${nav ? 'pl-5 mt-2' : 'absolute bg-[#1A1A1A] top-0 w-28 left-[4.5rem]'} ${!nav && activeDropdown === 'user' ? 'p-1 text-nowrap' : ''} ${activeDropdown === 'user' ? 'max-h-14' : 'max-h-0'
                }`}
            >
              <li className="mb-1">
                <Link to="users" className="hover:text-[#F3DD67]">
                  Users
                </Link>
              </li>
              <li>
                <Link to="user/add" className="hover:text-[#F3DD67]">
                  Add User
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default AdminSidebar;
