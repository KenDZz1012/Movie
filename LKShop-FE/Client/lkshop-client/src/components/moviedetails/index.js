import React, { useEffect, useState } from 'react'
import "magnific-popup";
import $ from "jquery";
import EpipsodeArea from './EpipsodeArea';
import MovieDetail from './MovieDetail';
import TvSeries from './TvSeries';
import { getSingleMovieById, updateSingleMovie } from '../../helpers/app-backend/singlemovie-backend-helper';
import { getListMovie, getMovieById } from '../../helpers/app-backend/movie-backend-helper'
import { getListTVEpisode } from '../../helpers/app-backend/tvepisode-backend-helper'

export default function MovieDetailIndex({ match }) {
    const [singleMovie, setSingleMovie] = useState({})
    const [episode, setEpisode] = useState([])
    const [newMovie, setNewMovie] = useState([])
    const fetchSingleMovieById = async () => {
        await getMovieById(match.params.movieId).then(async (res) => {
            setSingleMovie(res.data)
            const formData = new FormData()
            // formData.append('MovieName', res.data.MovieName);

            formData.append('ViewCount', res.data.ViewCount + 1);
            updateSingleMovie(res.data._id, formData)
            if (res.data.Type == "TVSeries") {
                await getListTVEpisode(res.data._id).then(response => {
                    setEpisode(response.data)
                })
            }
        })
    }
    const getListNewSingleMovie = async () => {
        await getListMovie({ size: 10, sort: "-CreatedTime", Status: "Done" }).then(res => {
            if (res?.isSuccess) {
                setNewMovie(res.data)
                $('.popup-video').magnificPopup({
                    type: 'iframe'
                });
            }
        })
    }

    useEffect(() => {
        fetchSingleMovieById()
        getListNewSingleMovie()
    }, [])

    return (
        <React.Fragment>
            <MovieDetail singleMovie={singleMovie} />
            {
                singleMovie?.Type == "TVSeries" ? <EpipsodeArea singleMovie={singleMovie} episodes={episode} /> : <></>
            }
            <TvSeries movie={newMovie} />
        </React.Fragment>
    )

}