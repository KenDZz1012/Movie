import React, { useEffect, useState } from 'react'
import "magnific-popup";
import $ from "jquery";
import SearchArea from './MovieArea';
import { Breadcrumb } from './Breadcrumb';
import Newsletter from './Newsletter';
import { getSingleMovieById, updateSingleMovie } from '../../helpers/app-backend/singlemovie-backend-helper';
import { getListMovie, getMovieById, searchMovie } from '../../helpers/app-backend/movie-backend-helper'
import { getListTVEpisode } from '../../helpers/app-backend/tvepisode-backend-helper'

export default function SearchIndex({ match }) {

    const [singleMovie, setSingleMovie] = useState({})
    const [size, setSize] = useState(2)
    const [totalPage, setTotalPage] = useState(0)
    const fetchSingleMovieByName = async () => {
        await searchMovie({ MovieName: match.params.movieName, skip: 0, size: size }).then(async (res) => {
            setSingleMovie(res.data)

        })
    }
    const fetchAll = async () => {
        await getListMovie().then(res => {
            setTotalPage(Math.ceil(res.data.length / size))
        })
    }
    useEffect(() => {
        fetchAll()
        fetchSingleMovieByName()
    }, [])

    return (
        <React.Fragment>
            <Breadcrumb />
            <SearchArea movies={singleMovie} size={size} totalPage={totalPage} />
            <Newsletter />
        </React.Fragment>
    )

}
