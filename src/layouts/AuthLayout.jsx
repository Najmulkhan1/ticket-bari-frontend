import React from 'react'
import Navbar from '../components/Common/Navbar'
import { Outlet } from 'react-router'
import Footer from '../components/Common/Footer'

const AuthLayout = () => {
  return (
    <div>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}

export default AuthLayout