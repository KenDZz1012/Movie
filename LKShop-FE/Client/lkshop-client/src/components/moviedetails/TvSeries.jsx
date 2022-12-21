import React from 'react'
import { Link, useHistory } from "react-router-dom";

const TvSeries = ({ movie }) => {
  return (
    <section className="tv-series-area tv-series-bg" style={{ backgroundImage: 'url("../img/bg/tv_series_bg02.jpg")' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="section-title text-center mb-50">
              <span className="sub-title">Best TV Series</span>
              <h2 className="title">New Movie</h2>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          {
            movie.map(item => (
              <div className="col-xl-3 col-lg-4 col-sm-6">
                <div className="movie-item mb-50">
                  <div className="movie-poster">
                    <Link to={`/movie-details-${item._id}`} target="_blank"><img src={item.Poster} alt="" height={420} width={300} /></Link>
                  </div>
                  <div className="movie-content">
                    <div className="top">
                      <h5 className="title"><Link to={`/movie-details-${item._id}`} target="_blank">{item.MovieName}</Link></h5>
                      <span className="date">{item.YearProduce}</span>
                    </div>
                    <div className="bottom">
                      <ul>
                        <li><span className="quality">hd</span></li>
                        <li>
                          <span className="duration"><i className="far fa-clock" />{item.RunTime}</span>
                          <span className="rating"><i className="fas fa-thumbs-up" />{item.Rating}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default TvSeries