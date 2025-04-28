import React from 'react'
import Banner from '../components/Banner'
import MovieSection from '../components/MovieSection'

const Home = () => {
  return (
   <>
    <Banner/>
    <MovieSection title={'Now showing'} status={'ongoing'}/>
    <MovieSection title={'Upcoming Movies'} status={'upcoming'}/>
   </>
  )
}

export default Home