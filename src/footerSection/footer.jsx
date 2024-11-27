import React from 'react';
import { FaFacebook, FaInstagram, FaXTwitter, FaLinkedin } from "react-icons/fa6";
import { IoLogoGithub } from "react-icons/io5";

const FooterSec = () => {
  return (
    <div className='relative bg-[url("https://cdn.pixabay.com/photo/2019/08/14/09/52/haji-peer-azad-kashmir-4405256_640.jpg")] bg-cover bg-center bg-fixed'>
      {/* Hazy overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className='relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-opacity-60'>
        <div className="box">
          <h3 className='text-2xl font-semibold mb-2 text-white'>Quick Links</h3>
          <a className='block text-lg text-white py-1' href="#home">Home</a>
          <a className='block text-lg text-white py-1' href="#about">About</a>
          <a className='block text-lg text-white py-1' href="#packages">Packages</a>
          <a className='block text-lg text-white py-1' href="#feedback">Feedback</a>
        </div>

        <div className="box">
          <h3 className='text-2xl font-semibold mb-2 text-white'>Extra Links</h3>
          <a className='block text-lg text-white py-1' href="#">My Account</a>
          <a className='block text-lg text-white py-1' href="#">My Order</a>
          <a className='block text-lg text-white py-1' href="#">My Watchlists</a>
          <a className='block text-lg text-white py-1' href="#">Ask Questions</a>
          <a className='block text-lg text-white py-1' href="#">Terms of Use</a>
          <a className='block text-lg text-white py-1' href="#">Privacy Policy</a>
        </div>

        <div className="box">
          <h3 className='text-2xl font-semibold mb-2 text-white'>Contact Info</h3>
          <a className='block text-lg text-white py-1' href="#">📞 +123-456-7890</a>
          <a className='block text-lg text-white py-1' href="#">☎️ +111-222-3333</a>
          <a className='block text-lg text-white py-1' href="#">✉️ abc@gmail.com</a>
          <a className='block text-lg text-white py-1' href="#">📌 Behala, Kolkata-700060</a>
        </div>

        <div className="box">
          <h3 className='text-2xl font-semibold mb-2 text-white'>Follow Us</h3>
          <a className='block text-lg text-white py-1' href="#"><FaFacebook className='inline mr-2' /> Facebook</a>
          <a className='block text-lg text-white py-1' href="#"><FaInstagram className='inline mr-2' /> Instagram</a>
          <a className='block text-lg text-white py-1' href="#"><FaXTwitter className='inline mr-2' /> X Handle</a>
          <a className='block text-lg text-white py-1' href="#"><FaLinkedin className='inline mr-2' /> LinkedIn</a>
          <a className='block text-lg text-white py-1' href="#"><IoLogoGithub className='inline mr-2' /> Github</a>
        </div>

        <div className="col-span-full text-center mt-4">
          <div className='text-lg text-white'>
            Created by <span className='text-green-500'>₷elta@8240</span> | All ©️opyrights are reserved!
          </div>
        </div>
      </div>
    </div>
  );
}

export default FooterSec;
