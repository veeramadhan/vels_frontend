import React from 'react'
import AboutPage from './about/page'
import HomePage from './main/page'
import Footer from './contact/page'
import Properties from './properties.js/page'

const page = () => {
  return (
    <>
    <HomePage/>
    <AboutPage/>
    <Properties/>
    <Footer/>
    </>
  )
}

export default page