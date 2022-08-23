import React from 'react'

const Instagram = () => {
  return (
    <div id='instagramHandle' className='overflow-hidden'>
        <div id="head" className='my-5'>
          <div id="topHeading" className={`text-center flex flex-row items-center justify-center mt-3`}>
              <div className='mx-2'>
              <span className='text-2xl font-firaCode font-bold'>-----</span>
              </div>
              <div className='mx-5'>
                <span className='text-3xl font-semibold'>Trending</span>
              </div>
              <div className='mx-2'>
              <span className='text-2xl font-firaCode font-bold'>-----</span>
              </div>
          </div>
          <div id="subHeading" className='text-center'>
            <span className='font-serif italic font-medium text-gray-400'>Top view in this week</span>
          </div>
        </div>
        <div id="carousel">
            
        </div>
    </div>
  )
}

export default Instagram