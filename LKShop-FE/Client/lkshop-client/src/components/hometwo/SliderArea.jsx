import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "magnific-popup";
import $ from "jquery";
import 'animate.css';
import { getListSingleMovie } from '../../helpers/app-backend/singlemovie-backend-helper';
import { Link, useHistory } from "react-router-dom";
import { getListMovie } from '../../helpers/app-backend/movie-backend-helper'

const SliderArea = () => {
  const [movieSidebar, setMovieSidebar] = useState([])


  const getListSingleMovieTrending = async () => {
    await getListMovie({ IsTrending: true, Status: "Done" }).then(res => {
      if (res?.isSuccess) {
        setMovieSidebar(res.data)
        console.log(res.data)
        $('.popup-video').magnificPopup({
          type: 'iframe'
        });
      }
    })
  }
  useEffect(() => {
    // 

    getListSingleMovieTrending()


  }, [])
  const settings = {

    slidesToShow: 1,
    speed: 500,
    arrows: false,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1800,
        settings: {
          autoplay: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          speed: 500,
          infinite: true,
        }
      },
      {
        breakpoint: 1500,
        settings: {
          autoplay: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          speed: 500,
          infinite: true,
        }
      },
      {
        breakpoint: 1200,
        settings: {
          autoplay: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          speed: 500,
          arrows: false,
          infinite: true,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          speed: 500,
          arrows: false,
          autoplay: true,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          speed: 500,
          slidesToScroll: 1,
          arrows: false,
        }
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          speed: 500,
          autoplay: true,
          arrows: false,
        }
      },
    ]

  }

  return (

    <section className="slider-area slider-bg" style={{ backgroundImage: 'url("../../img/banner/s_slider_bg.jpg")' }}>
      <div style={{
        display: "flex",
        justifyContent: "center",
        marginTop: -90,
        marginBottom: 150,
        fontFamily: "'Poppins', sans-serif",
        fontSize: 24,
        color: "#e4d804",
        fontWeight: 700
      }}>ON TRENDING</div>
      <Slider className="slider-active" {...settings}>
        {
          movieSidebar.map(item => (
            <div className="slider-item">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-lg-6 order-0 order-lg-2">

                    <div className="slider-img text-center text-lg-right animate__animated animate__fadeInRight" data-delay="1s" >

                      <img src={item.CoverPoster} alt="" style={{ border: "1px solid yellow" }} />

                    </div>


                  </div>
                  <div className="col-lg-6">

                    <div className="banner-content">

                      <h6 className="sub-title" data-delay=".2s">Movie</h6>

                      <h2 className="title animate__animated animate__fadeInUp" data-delay=".4s">{item.MovieName}</h2>


                      <div className="banner-meta animate__animated animate__fadeInUp" data-delay=".6s">
                        <ul>
                          <li className="quality">
                            <span>Pg 18</span>
                            <span>hd</span>
                          </li>
                          <li className="category">

                            {item.Category.length > 0 ?
                              item.Category.map((item, index) => {
                                if (index < 2) {
                                  return (<a href="/#" style={{ padding: 2, border: "1px solid #ccc" }}>{item.CategoryName}</a>)
                                }
                              }) :
                              <></>}
                          </li>

                          <li className="release-time">
                            <span><i className="far fa-calendar-alt" /> {item.YearProduce}</span>
                            <span><i className="far fa-clock" /> {item.RunTime}</span>
                          </li>
                        </ul>
                      </div>


                      <Link to={`/movie-details-${item._id}`} className='btn' target="_blank"><i className="fas fa-play" /> Watch Now</Link>

                      <a href="https://www.youtube.com/watch?v=8ugaeA-nMTc?autoplay=1" className="banner-btn btn popup-video" data-delay=".1s"><i className="fas fa-play" /> Trailer</a>


                    </div>

                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </Slider>
    </section >
  )
}

export default SliderArea