import React, { useEffect } from 'react'
import Logo from '../../Assets/Images/Logos/logo.png'

const About = () => {
  useEffect(()=> {
    window.scroll(0,0)
  },[])
  return (
    <div id="about" className='flex flex-col p-14 px-16 md:px-28 lg:px-36 mb-[3.9rem]'>
      <div id="heading" className='my-5'>
        <span className='font-extralight text-5xl'>About Us</span>
      </div>
      <div id="text" className='text-justify text-xl font-light my-5'>
        <span className='text-gray-500'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit autem dolore eos natus quae non! Itaque, consequatur, illum maiores nam placeat similique animi perferendis voluptate et voluptatem assumenda distinctio. Rem adipisci, nisi officia sint debitis soluta voluptas amet, sequi assumenda laudantium ipsa et, dolore minus quasi dolorem iure libero! Dolorem harum laborum atque doloremque temporibus optio adipisci quibusdam molestias non tenetur officiis assumenda sit facilis doloribus dolores maxime, ducimus illo deserunt maiores laboriosam possimus! Alias sit atque illum sint aliquid ullam cum mollitia. Voluptas doloremque facilis, numquam modi minima eveniet odit quo laborum, recusandae iure sequi maiores? Quas, iusto!
        </span>
      </div>
      <div id="signature" className='mt-10'>
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center">
          <div id="sign" className='flex flex-col text-center mx-14 my-4'>
            <div>
              <span className="text-4xl font-firaCode text-gray-400">
                AbbasDalal
              </span>
            </div>
            <div>
              <span className='text-gray-700 text-lg font-bold'> Founder </span>
            </div>
          </div>
          <div id="watermark" className='mx-14'>
            <img src={Logo} alt="justbuyit" className="bg-white w-[80%]"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About