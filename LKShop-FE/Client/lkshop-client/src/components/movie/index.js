import React, { useEffect, useState } from 'react'
import "magnific-popup";
import $ from "jquery";
import MovieArea from "./MovieArea";
import { Breadcrumb } from './Breadcrumb';
import Newsletter from './Newsletter';
import { getSingleMovieById, updateSingleMovie } from '../../helpers/app-backend/singlemovie-backend-helper';
import { getListMovie, getMovieById, searchMovieByCategory } from '../../helpers/app-backend/movie-backend-helper'
import { getListTVEpisode } from '../../helpers/app-backend/tvepisode-backend-helper'
import { getListCategory } from '../../helpers/app-backend/category-backend-helper'

export default function SearchIndex({ match }) {
    let page = match.params.page
    let category = match.params.Category
    const [singleMovie, setSingleMovie] = useState({})
    const [size, setSize] = useState(2)
    const [totalPage, setTotalPage] = useState(0)
    const [catId, setCateId] = useState("")
    const fetchCategory = async () => {
        await getListCategory({ CategoryName: category }).then(res => {
            setCateId(res.data[0]._id)
            fetchSingleMovieByName(res.data[0]._id, page)
            fetchAll(res.data[0]._id,)
        })
    }
    const fetchSingleMovieByName = async (category, page) => {
        await searchMovieByCategory({ Category: category, skip: (page - 1) * size, size: size }).then(async (res) => {
            setSingleMovie(res.data)

        })
    }
    const fetchAll = async (category) => {
        await searchMovieByCategory({ Category: category }).then(res => {
            setTotalPage(Math.ceil(res.data.length / size))
        })
    }
    useEffect(() => {
        fetchCategory()

    }, [])

    return (
        <React.Fragment>
            <Breadcrumb />
            <MovieArea movies={singleMovie} size={size} totalPage={totalPage} page={page} category={category} getListMovie={fetchSingleMovieByName} catId={catId} />
            <Newsletter />
        </React.Fragment>
    )

}
