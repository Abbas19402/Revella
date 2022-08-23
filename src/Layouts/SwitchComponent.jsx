import React from 'react'
import { Routes , Route } from 'react-router-dom'
import MainPage from '../Pages/MainPage'
import About from '../Pages/Navigation/About'
import Contact from '../Pages/Navigation/Contact'
import Product from '../Pages/UI/Product'
import Buy from "../Pages/UI/Buy"
import Login from '../Pages/UI/Login'
import Wishlist from '../Pages/UI/Wishlist'
import PaySuccess from '../Pages/UI/PaySuccess'

const SwitchComponent = () => {
  return (
    <div className='h-full'>
      <Routes>
        <Route exact path='/login' element = {< Login />}/>
        <Route exact path='/' element = {< MainPage />}/>
        <Route exact path='/about' element = {< About />}/>
        <Route exact path='/contact' element = {< Contact />}/>
        <Route exact path="/product" element = {< Product />}/>
        <Route exact path="/buy" element = {< Buy />}/>
        <Route exact path="/wish" element = {< Wishlist />}/>
        <Route exact path="/pays" element = {< PaySuccess />}/>
      </Routes>
    </div>
  )
}

export default SwitchComponent