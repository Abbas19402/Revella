import React , { useEffect } from 'react'
import { useNavigate } from 'react-router'

const PaySuccess = () => {
    const navigate = useNavigate()
    useEffect(()=> {
        setTimeout(()=> {
            navigate('/')
        },3000)
    },[])
    return (
        <div className='h-[60vh] w-screen bg-white overflow-hidden text-center py-16'>
            <span className='text-[43px] font-firaCode text-green-800 font-thin tracking-tight'>Payment Successfull</span>
        </div>
    )
}

export default PaySuccess