import { faAngleRight, faClapperboard, faEnvelope, faHeadset, faMapMarkerAlt, faPhone, faTicket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-[#1A1A1A] mt-16 pb-6'>
      <div className="container">
        <div className="footer-cards flex justify-center gap-4">
          <div className="bg-[#151515] relative -top-6 rounded-lg footer-card text-center border border-gray-400 p-3">
            <FontAwesomeIcon icon={faHeadset} className='text-main'/>
            <p className="text-white text-xs">24/7 Customer Care</p>
          </div>
          <div className="bg-[#151515] relative -top-6 rounded-lg footer-card text-center border border-gray-400 p-3">
            <FontAwesomeIcon icon={faTicket} className='text-main'/>
            <p className="text-white text-xs">24/7 Customer Care</p>
          </div>
          <div className="bg-[#151515] relative -top-6 rounded-lg footer-card text-center border border-gray-400 p-3">
            <FontAwesomeIcon icon={faClapperboard} className='text-main'/>
            <p className="text-white text-xs">24/7 Customer Care</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4">
          <div className="footer-col">
              <h1 className='text-4xl font-semibold mb-3'>Seat<span className="text-main">ly</span></h1>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, minima necessitatibus, velit deleniti esse nam
          </div>
          <div className="footer-col">
            <h3 className='text-lg mb-2 font-semibold'>Quick Links</h3>
            <ul>
              <li className='text-sm'><a href=""><FontAwesomeIcon icon={faAngleRight} className='me-1'/> Home</a></li>
              <li className='text-sm'><a href=""><FontAwesomeIcon icon={faAngleRight} className='me-1'/> About Us</a></li>
              <li className='text-sm'><a href=""><FontAwesomeIcon icon={faAngleRight} className='me-1'/> Contact Us</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3 className='text-lg mb-2 font-semibold'>Contact Us</h3>
            <ul>
              <li className='text-sm'><a href=""><FontAwesomeIcon icon={faEnvelope} className='me-1'/>seatly@gmail.com</a></li>
              <li className='text-sm'><a href=""><FontAwesomeIcon icon={faPhone} className='me-1'/>9876543210</a></li>
              <li className='text-sm'><a href=""><FontAwesomeIcon icon={faMapMarkerAlt} className='me-1'/>Chabahil, Kathmandu</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer