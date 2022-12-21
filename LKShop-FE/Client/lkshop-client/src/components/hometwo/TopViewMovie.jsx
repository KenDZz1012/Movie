import React, { useEffect, useState } from 'react'
import "magnific-popup";
import $ from "jquery";
import { getListSingleMovie } from '../../helpers/app-backend/singlemovie-backend-helper';
import { getListTVSeason } from '../../helpers/app-backend/tvseason-backend-helper'
import { Link, useHistory } from "react-router-dom";

const TopViewMovie = () => {

    const [newMovie, setNewMovie] = useState([])
    const [tvSeason, setTvSeason] = useState([])
    const getListNewSingleMovie = async () => {
        await getListSingleMovie({ size: 5, sort: "-ViewCount", Status: "Done" }).then(res => {
            if (res?.isSuccess) {
                setNewMovie(res.data)
                $('.popup-video').magnificPopup({
                    type: 'iframe'
                });
            }
        })
    }

    const getListTV = async () => {
        await getListTVSeason({ size: 5, sort: "- ViewCount", Status: "Done" }).then(res => {
            if (res?.isSuccess) {
                setTvSeason(res.data)
                $('.popup-video').magnificPopup({
                    type: 'iframe'
                });
            }
        })
    }
    useEffect(() => {

        getListNewSingleMovie()
        getListTV()
    }, [])


    return (

        <section className="top-rated-movie tr-movie-bg2" style={{ backgroundImage: 'url("img/bg/tr_movies_bg.jpg")' }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="section-title title-style-three text-center mb-70">
                            {/* <span className="sub-title">New Update Movies</span> */}
                            <h2 className="title">Top View Movies</h2>
                        </div>
                    </div>
                </div>
                <div className="row movie-item-row">

                    {newMovie.map(item => (
                        <div className="custom-col-">
                            <div className="movie-item movie-item-two">
                                <div className="movie-poster">
                                    <img src={item.Poster} alt="" height={273} />
                                    <ul className="overlay-btn">
                                        <li><a href={item.Trailer} className="popup-video btn">Trailer</a></li>
                                        <li><Link to={`/movie-details-${item._id}`} target="_blank" className='btn'>Watch Now</Link></li>
                                    </ul>
                                </div>
                                <div className="movie-content">
                                    <div className="rating">
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                    </div>
                                    <h5 className="title"><Link to={`/movie-details-${item._id}`} target="_blank">{item.Movie.MovieName}</Link></h5>
                                    {item.Movie.Category.length > 0 ?
                                        item.Movie.Category.map((item, index) => {
                                            if (index < 2) {
                                                return (<span className="rel"> {item.CategoryName}</span>)
                                            }
                                        }) :
                                        <></>}
                                    <div className="movie-content-bottom">
                                        <ul>
                                            <li className="tag" style={{ display: 'flex', marginRight: 0 }}>
                                                <a href="/#">HD</a>
                                                <a href="/#">{item.Movie.Country}</a>
                                            </li>
                                            <li>
                                                <span className="like"><i className="fas fa-thumbs-up" /> {item.Rating}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {tvSeason.map(item => (
                        <div className="custom-col-">
                            <div className="movie-item movie-item-two">
                                <div className="movie-poster">
                                    <img src={item.Poster} alt="" height={273} />
                                    <ul className="overlay-btn">
                                        <li><a href={item.Trailer} className="popup-video btn">Trailer</a></li>
                                        <li><Link to={`/movie-details-${item._id}`} target="_blank" className='btn'>Watch Now</Link></li>
                                    </ul>
                                </div>
                                <div className="movie-content">
                                    <div className="rating">
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                    </div>
                                    <h5 className="title"><Link to={`/movie-details-${item._id}`} target="_blank">{item.Movie.MovieName}</Link></h5>
                                    {item.Movie.Category.length > 0 ?
                                        item.Movie.Category.map((item, index) => {
                                            if (index < 2) {
                                                return (<span className="rel"> {item.CategoryName}</span>)
                                            }
                                        }) :
                                        <></>}
                                    <div className="movie-content-bottom">
                                        <ul>
                                            <li className="tag" style={{ display: 'flex', marginRight: 0 }}>
                                                <a href="/#">HD</a>
                                                <a href="/#">{item.Movie.Country}</a>
                                            </li>
                                            <li>
                                                <span className="like"><i className="fas fa-thumbs-up" /> {item.Rating}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </section >
    )
}

export default TopViewMovie