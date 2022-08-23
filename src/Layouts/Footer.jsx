import React from 'react'
import { Link } from 'react-router-dom' 
import { socialMedia } from '../Assets/Apis/socialMediaHandles'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import { catagories } from "../Assets/Apis/footer";
import { information } from "../Assets/Apis/footer";
import { uLinks } from '../Assets/Apis/footer';
const Footer = () => {
  return (
    <div className='relative h-full m-0 bg-zinc-100 py-24'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12'>
        <div id="logoxContactDet" className="flex flex-col col-span-3 p-5">
          <div id="logo" className="block">
            <div id="textLogo" className="overflow-hidden px-16 my-3 text-center md:text-left">
              <span className="text-2xl md:text-2xl lg:text-3xl font-medium">Just BuyIt</span>
            </div>
          </div>
          <div id="contactDet" className='flex flex-col justify-center'>
            <div id="address" className='px-12 flex flex-row my-2 justify-center lg:justify-start'>
              <span id="locLogo" className='w-5 h-5 mx-2'><LocationOnOutlinedIcon/></span>:
              <span id="addressText" className='font-light text-gray-500 text-lg col-span-4 mx-1'>184 Main Rd E, St Albans VIC 3021, Australia</span>
            </div>
            <div id="contactEmail" className='px-12 flex flex-row my-2 justify-center lg:justify-start'>
              <span id="locLogo" className='w-5 h-5 mx-2'><EmailOutlinedIcon/></span>:
              <span id="addressText" className='font-light text-gray-500 text-lg col-span-4 mx-1'>contact@company.com</span>
            </div>
            <div id="contactNumber" className='px-12 flex flex-row my-2 justify-center lg:justify-start'>
              <span id="locLogo" className='w-5 h-5 mx-2'><LocalPhoneOutlinedIcon/></span>:
              <span id="addressText" className='font-light text-gray-500 text-lg col-span-4 mx-1'>+001 2233 456</span>
            </div>
          </div>
          <div id="socialMediaHandles" className='flex flex-row px-12 my-2 justify-center lg:justify-start'>
            {socialMedia.map((value)=> (
              <div id={value.iconName} className="w-8 h-8 mx-1 text-center">
                <span className='hover:text-gray-500'>{value.icon}</span>
              </div>
            ))}
          </div>
        </div>
        <div id="footLinks" className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 col-span-6 p-5 justify-items-center'>
          <div id="Catagories" className='mx-3 my-7'>
            <div id="Heading" className='mb-8 text-center lg:text-left'>
              <span className='text-xl text-black'>Catagories</span>
            </div>
            <div className="links flex flex-col">
              {catagories.map((value,key)=> (
                <Link to={value.link} className="my-1 text-center md:text-left">
                  <span key={key} className="text-md font-medium text-gray-500 hover:text-black transition-all duration-400">{value.linkName}</span>
                </Link>
              ))}
            </div>
          </div>
          <div id="Information" className='mx-3 my-7'>
            <div id="Heading" className='mb-8 text-center lg:text-left'>
              <span className='text-xl text-black'>Information</span>
            </div>
            <div className="links flex flex-col">
              {information.map((value,key)=> (
                <Link to={value.link} className="my-1 text-center md:text-left">
                  <span key={key} className="text-md font-medium text-gray-500 hover:text-black transition-all duration-400">{value.linkName}</span>
                </Link>
              ))}
            </div>
          </div>
          <div id="usefullLinks" className='mx-3 my-7'>
          <div id="Heading" className='mb-8 text-center lg:text-left'>
              <span className='text-xl text-black'>Usefull Links</span>
            </div>
            <div className="links flex flex-col">
              {uLinks.map((value,key)=> (
                <Link to={value.link} className="my-1 text-center md:text-left">
                  <span key={key} className="text-md font-medium text-gray-500 hover:text-black transition-all duration-400">{value.linkName}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div id="newsletterSignUp" className='col-span-3 p-5'>
          <div id="heading" className='mx-5'>
            <span className='text-black text-2xl '>Newsletter SignUp</span>
          </div>
          <div id="text" className='m-5'>
            <span className='text-gray-500 text-md'>Subscribe to our newsletter and get 10% off your first purchase</span>
          </div>
          <div id="emailForm" className='mx-3 pl-3 rounded-full border-2 border-black flex flex-row items-center'>
            <input type="text" placeholder='Enter your Email' className='w-full h-12 bg-transparent rounded-fullpx-2 placeholder:text-[19px]'/>
            <button className='w-28 bg-black rounded-full h-10 text-white text-lg font-light mr-1'>SignUp</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer