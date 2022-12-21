import React, { useEffect, useState } from 'react'
import "magnific-popup";
import $ from "jquery";
import EpipsodeArea from './EpipsodeArea';
import MovieDetail from './MovieDetail';
import TvSeries from './TvSeries';
import { getSingleMovieById } from '../../helpers/app-backend/singlemovie-backend-helper';

export default function MovieDetailIndex({ match }) {
    const [singleMovie, setSingleMovie] = useState({})
    const fetchSingleMovieById = async () => {
        await getSingleMovieById(match.params.movieId).then(res => {
            setSingleMovie(res.data)
        })
    }
    useEffect(() => {
        fetchSingleMovieById()
    })

    return (
        <React.Fragment>
            <MovieDetail singleMovie={singleMovie} />
            <TvSeries />
        </React.Fragment>
    )

}