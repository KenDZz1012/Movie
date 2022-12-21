import React, { useEffect, useState, useRef, useCallback } from 'react'
import $ from "jquery";
import "magnific-popup"
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import ReactPlayer from 'react-player'

const MovieDetail = ({ singleMovie }) => {
  const [enableMovie, setEnableMovie] = useState(false)
  const vidRef = useRef(null);


  useEffect(() => {
    $('.popup-video').magnificPopup({
      type: 'iframe'
    });

  }, [])
  document.addEventListener('fullscreenchange', (event) => {
    if (document.fullscreenElement) {
      // We’re going fullscreen
    } else {
      var elem = document.getElementsByTagName('video')[0];
      elem.pause()
    }
  })

  function playVideo() {
    setEnableMovie(true)
    var elem = document.getElementsByTagName('video')[0];
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else {
      alert("Full screen not supported");
      return;
    }
    elem.play();
  }
  return (
    <section className="movie-details-area" style={{ backgroundImage: 'url("../img/bg/movie_details_bg.jpg")' }}>
      <div className="container">
        <div className="row align-items-center position-relative">
          <div className="col-xl-3 col-lg-4">
            <div className="movie-details-img">
              <img src={singleMovie?.Poster} alt="" style={{ width: 300 }} />
              <a onClick={playVideo} className="popup-video"><img src="img/images/play_icon.png" alt="" /></a>
            </div>
          </div>
          <div className="col-xl-6 col-lg-8">
            <div className="movie-details-content">
              <h2>{singleMovie?.MovieName}</h2>
              <h4>{singleMovie?.Type == "TVSeries" ? "Season " + singleMovie.Season : ""}</h4>
              <div className="banner-meta">
                <ul>
                  <li className="quality">
                    <span>Pg 18</span>
                    <span>hd</span>
                  </li>
                  <li className="category">
                    {singleMovie?.Category?.length > 0 ?
                      singleMovie?.Category.map((item, index) => {
                        if (index < 2) {
                          return (<a href="/#">{item.CategoryName}{index == 1 ? "" : ","}</a>)
                        }
                      }) :
                      <></>}
                  </li>
                  <li className="release-time">
                    <span><i className="far fa-calendar-alt" /> {singleMovie?.YearProduce}</span>
                    <span><i className="far fa-clock" /> {singleMovie?.RunTime}</span>
                  </li>
                </ul>
                <div style={{ display: "flex" }}>
                  <p>Actor:</p>
                  {singleMovie?.Actor?.length > 0 ?
                    singleMovie?.Actor.map((item, index) => {
                      if (index < 2) {
                        return (<p style={{ marginLeft: 4 }}> {item.FullName}{index == 1 ? "" : ","}</p>)
                      }
                    }) :
                    <></>}
                </div>
                <div style={{ display: "flex" }}>
                  <p>Director:</p>
                  {singleMovie?.Director?.length > 0 ?
                    singleMovie?.Director.map((item, index) => {
                      if (index < 2) {
                        return (<p style={{ marginLeft: 4 }}> {item.FullName}{index == 1 ? "" : ","}</p>)
                      }
                    }) :
                    <></>}
                </div>
              </div>
              <p>{singleMovie?.Description}</p>
              <div className="movie-details-prime">
                <ul style={{ maxWidth: 555 }}>
                  <li className="share"><a href="/#"><i className="fas fa-share-alt" /> Share</a></li>
                  <li className="streaming">
                    <h6>Prime Video</h6>
                    <span>Streaming Channels</span>
                  </li>
                  <li className="watch"><a href={singleMovie?.Trailer} className="popup-video btn">Trailer</a></li>
                  {
                    singleMovie.Type == "SingleMovie" ?
                      <li className="watch"><a onClick={playVideo} className="btn popup-video"><i className="fas fa-play" /> Watch Now</a></li> : <></>
                  }
                </ul>
              </div>
            </div>
          </div>
          <div className="movie-details-btn">
            <a href="/img/poster/movie_details_img.jpg" className="download-btn" download>Download <img src="fonts/download.svg" alt="" /></a>
          </div>
          {
            singleMovie.Type == "SingleMovie" ?
              <video height={0} ref={vidRef} controls={false} mute={enableMovie} autoPlay={enableMovie} src={`http://localhost:8000/api/v1/Movie/GetVideo/Folder=MovieVideo&Movie=${singleMovie?.MovieName}&YearProduce=${singleMovie?.YearProduce}`} width="400">
              </video> : <></>
          }

          {/* <ReactPlayer
            config={{ file: { attributes: { controlsList: 'nosize' } } }}

            url={`http://localhost:8000/api/v1/SingleMovie/GetVideo/Folder=MovieVideo&Movie=${singleMovie?.Movie?._id}&YearProduce=${singleMovie?.YearProduce}`}
            width="100%"
            height="100%"
            controls
          /> */}
        </div>
      </div>
    </section>
  )
}

export default MovieDetail