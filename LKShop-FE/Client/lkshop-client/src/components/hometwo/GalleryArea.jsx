import React, { useState, useEffect } from 'react'
import Slider from "react-slick";
import { getListSingleMovie } from '../../helpers/app-backend/singlemovie-backend-helper';
import { getListMovie } from '../../helpers/app-backend/movie-backend-helper'

function PrevArrow(props) {
  const { className, onClick } = props;

  return (
    <button type='button' className={className} onClick={onClick}><span className="slick-prev"><i className="fas fa-caret-left"></i> previous</span></button>
  );
}
function NextArrow(props) {
  const { className, onClick } = props;
  return (
    <button type='button' className={className} onClick={onClick}><span className="slick-next">Next <i className="fas fa-caret-right"></i></span></button>
  );
}
const GalleryArea = () => {
  const [movieSidebar, setMovieSidebar] = useState([])


  const getListSingleMovieTrending = async () => {
    await getListMovie({ status: "UpComing" }).then(res => {
      if (res?.isSuccess) {
        setMovieSidebar(res.data)
        console.log(res.data)

      }
    })
  }
  useEffect(() => {
    // 

    getListSingleMovieTrending()


  }, [])
  const settings = {
    centerMode: true,
    centerPadding: '350px',
    slidesToShow: 1,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    appendArrows: ".slider-nav",
    responsive: [
      {
        breakpoint: 1800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: '220px',
          infinite: true,
        }
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: '180px',
          infinite: true,
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: '160px',
          arrows: false,
          infinite: true,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          centerPadding: '60px',
          arrows: false,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: '0px',
          arrows: false,
        }
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: '0px',
          arrows: false,
        }
      },
    ]

  }

  return (
    <div className="gallery-area position-relative">
      <div className="gallery-bg" />
      <div className="container-fluid p-0 fix">
        <div style={{
          display: "flex",
          justifyContent: "center",
          marginTop: -1,
          marginBottom: 105,
          fontFamily: "'Poppins', sans-serif",
          fontSize: 24,
          color: "#e4d804",
          fontWeight: 700
        }}>Up Coming Movies</div>
        <Slider className="row gallery-active" {...settings}>
          {
            movieSidebar.map(item => (
              <div className="col-12">
                <div className="gallery-item">
                  <img src={item.CoverPoster} alt="" />
                </div>
              </div>
            ))
          }

          {/* <div className="col-12">
            <div className="gallery-item">
              <img src="img/images/gallery_02.jpg" alt="" />
            </div>
          </div>
          <div className="col-12">
            <div className="gallery-item">
              <img src="img/images/gallery_03.jpg" alt="" />
            </div>
          </div>
          <div className="col-12">
            <div className="gallery-item">
              <img src="img/images/gallery_04.jpg" alt="" />
            </div>
          </div> */}
        </Slider>
      </div>
      <div className="slider-nav" />
    </div>
  )
}

export default GalleryArea