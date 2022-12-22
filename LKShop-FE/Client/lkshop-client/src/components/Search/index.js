import React, { useEffect, useState } from 'react'
import "magnific-popup";
import $ from "jquery";
import SearchArea from './MovieArea';
import { Breadcrumb } from './Breadcrumb';
import Newsletter from './Newsletter';
import { getSingleMovieById, updateSingleMovie } from '../../helpers/app-backend/singlemovie-backend-helper';
import { getListMovie, getMovieById, searchMovie, searchMovieByCategory } from '../../helpers/app-backend/movie-backend-helper'
import { getListTVEpisode } from '../../helpers/app-backend/tvepisode-backend-helper'

export default function MovieIndex({ match }) {
    let page = match.params.page
    let movieName = match.params.movieName
    const [singleMovie, setSingleMovie] = useState({})
    const [size, setSize] = useState(2)
    const [totalPage, setTotalPage] = useState(0)
    const fetchSingleMovieByName = async (movieName, page) => {
        await searchMovie({ MovieName: movieName, skip: (page - 1) * size, size: size }).then(async (res) => {
            setSingleMovie(res.data)

        })
    }
    const fetchAll = async () => {
        await searchMovie({ MovieName: movieName }).then(res => {
            setTotalPage(Math.ceil(res.data.length / size))
        })
    }
    useEffect(() => {
        fetchAll()
        fetchSingleMovieByName(movieName, page)
    }, [])

    return (
        <React.Fragment>
            <Breadcrumb />
            <SearchArea movies={singleMovie} size={size} totalPage={totalPage} page={page} movieName={match.params.movieName} getListMovie={fetchSingleMovieByName} />
            <Newsletter />
        </React.Fragment>
    )

}
