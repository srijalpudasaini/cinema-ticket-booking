import React from 'react'
import Banner from '../components/Banner'
import MovieSection from '../components/MovieSection'

const Home = () => {
  return (
   <>
    <Banner/>
    <MovieSection title={'Now showing'}/>
    <MovieSection title={'Upcoming Movies'}/>
   </>
  )
}

export default Home