import React from 'react'
import Hero from './pages/hero/Hero'
import AboutMe from './pages/AboutMe'
import Expertise from './pages/Expertise'
import Project from './pages/Project'
import NewContact from './pages/NewContact'
import Footer from './pages/Footer'
const Full = () => {
  return (
    <div className='w-screen overflow-x-hidden'>
      <Hero/>
     <AboutMe/>
     <Expertise/>
     <Project/>
     <NewContact/>
     <Footer/>
    </div>
  )
}

export default Full
