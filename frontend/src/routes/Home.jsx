import React from 'react'
import Banner from '../components/Banner'
import MovieSection from '../components/MovieSection'
import Recommended from '../components/Recommended'

const Home = () => {
  return (
   <>
    <Banner/>
    <MovieSection title={'Now showing'} status={'ongoing'}/>
    <Recommended />
    <MovieSection title={'Upcoming Movies'} status={'upcoming'}/>
   </>
  )
}

export default Home