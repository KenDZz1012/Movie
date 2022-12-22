import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { Breadcrumb } from '../components/movie/Breadcrumb'
import MovieArea from '../components/movie/MovieArea'
import Newsletter from '../components/movie/Newsletter'
import MovieIndex from '../components/movie'
import HeaderTwo from '../components/HeaderTwo'
const Movie = ({ match }) => {
  return (
    <div>
      <HeaderTwo />
      <main>
        <MovieIndex match={match} />
      </main>
      <Footer />
    </div>
  )
}

export default Movie