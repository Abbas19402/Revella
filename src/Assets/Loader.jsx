import React from 'react'
import ReactLoading from 'react-loading';

const Loader = () => {
  return (
    <div className='grid justify-items-center my-32'>
        <ReactLoading type='balls' color="black" height={18} width={44} />
    </div>
  )
}

export default Loader