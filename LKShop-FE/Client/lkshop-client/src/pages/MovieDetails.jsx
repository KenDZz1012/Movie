import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import EpipsodeArea from '../components/moviedetails/EpipsodeArea'
import MovieDetail from '../components/moviedetails/MovieDetail'
import TvSeries from '../components/moviedetails/TvSeries'
import MovieDetailIndex from '../components/moviedetails'
const MovieDetails = ({ match }) => {

  return (
    <div>
      <Header />
      <main>
        <MovieDetailIndex 
          match={match}
        />
      </main>
      <Footer />
    </div>
  )
}

export default MovieDetails