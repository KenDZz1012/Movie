import React, { useEffect } from 'react'
import $ from "jquery";
import "magnific-popup"

const MovieDetail = ({ singleMovie }) => {
  useEffect(() => {

    $('.popup-video').magnificPopup({
      type: 'iframe'
    });
  }, [])
  return (
    <section className="movie-details-area" style={{ backgroundImage: 'url("../img/bg/movie_details_bg.jpg")' }}>
      <div className="container">
        <div className="row align-items-center position-relative">
          <div className="col-xl-3 col-lg-4">
            <div className="movie-details-img">
              <img src={singleMovie?.Poster} alt="" />
              <a href={singleMovie?.Trailer} className="popup-video"><img src="img/images/play_icon.png" alt="" /></a>
            </div>
          </div>
          <div className="col-xl-6 col-lg-8">
            <div className="movie-details-content">
              <h2>{singleMovie?.Movie?.MovieName}</h2>
              <div className="banner-meta">
                <ul>
                  <li className="quality">
                    <span>Pg 18</span>
                    <span>hd</span>
                  </li>
                  <li className="category">
                    <a href="/#">Romance,</a>
                    <a href="/#">Drama</a>
                  </li>
                  <li className="release-time">
                    <span><i className="far fa-calendar-alt" /> {singleMovie?.YearProduce}</span>
                    <span><i className="far fa-clock" /> {singleMovie?.RunTime}</span>
                  </li>
                </ul>
              </div>
              <p>{singleMovie?.Description}</p>
              <div className="movie-details-prime">
                <ul>
                  <li className="share"><a href="/#"><i className="fas fa-share-alt" /> Share</a></li>
                  <li className="streaming">
                    <h6>Prime Video</h6>
                    <span>Streaming Channels</span>
                  </li>
                  <li className="watch"><a href="https://www.youtube.com/watch?v=R2gbPxeNk2E" className="btn popup-video"><i className="fas fa-play" /> Watch Now</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="movie-details-btn">
            <a href="/img/poster/movie_details_img.jpg" className="download-btn" download>Download <img src="fonts/download.svg" alt="" /></a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MovieDetail