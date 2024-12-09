import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Outlet } from 'react-router'
import ScrollTop from '../../components/ScrollTop'

const Layout = () => {
  return (
    <>
        <Header/>
        <Outlet/>
        <Footer/>
        <ScrollTop/>
    </>
  )
}

export default Layout