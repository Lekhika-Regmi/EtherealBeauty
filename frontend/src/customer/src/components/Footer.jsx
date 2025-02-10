import React from 'react'
import { Link } from 'react-router-dom'
import About from '../../../components/About'
const Footer = () => {
  return (
    <>
    <footer className=' footer__container footer__content' >
        <div className='footer__col mr-6'>
            <h4>CONTACT INFO</h4>
            <p>
                <span><i className="ri-map-pin-fill"></i></span>
                Apex College, Devkota Sadak, Kathmandu 44600
            </p>
            <p>
                <span><i className="ri-mail-fill"></i></span>
                Email: support@etherealbeauty.com
            </p>
            <p>
                <span><i className="ri-phone-fill"></i></span>
                Phone: +1 234 567 890
            </p>
            
        </div>

        <div className='footer__col'>
            <h4>COMPANY</h4>
           <Link to="/">Home</Link>
           <Link to="/about">About Us</Link>
           <Link to="/">Terms and Conditions</Link>
        </div>


        <div className='footer__col'>
            <h4>FOLLOW  US</h4>
            <p>
                <span><i className="ri-facebook-box-fill"></i></span>
                Facebook
            </p>
            <p>
                <span><i className="ri-instagram-line"></i></span>
                Instagram
            </p>
            <p>
                <span><i className="ri-tiktok-fill"></i></span>
                Tiktok
            </p>
            

 
        </div>
        <div className="nav__logo">
          <Link to="/">

            Ethereal Beauty <span>.</span>

          </Link>
            </div>
    </footer>
    <div className='footer__bar'>
            <p>
                <span><i className="ri-copyright-line"></i></span>
                2024 Ethereal Beauty. All rights reserved.
            </p>
            </div>
    </>
  )
}

export default Footer