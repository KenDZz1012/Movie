import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Menu from './MovieMenu';

function SearchArea({ movies, size, totalPage }) {
  const [items, setItems] = useState(Menu);

  const filterItem = (categItem) => {
    const updatesItems = Menu.filter((curElem) => {

      return curElem.category === categItem;

    })

    setItems(updatesItems);
  }
  return (
    <section className="movie-area movie-bg" style={{ backgroundImage: 'url("../img/bg/movie_bg.jpg")' }}>
      <div className="container">
        <div className="row align-items-end mb-60">
          <div className="col-lg-6">
            <div className="section-title text-center text-lg-left">
              <span className="sub-title">ONLINE STREAMING</span>
              <h2 className="title">New Release Movies</h2>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="movie-page-meta">
              <div className="tr-movie-menu-active text-center">
                <button className="active" data-filter="cat-three" onClick={() => filterItem('Animation')}>Animation</button>
                <button data-filter=".cat-one" onClick={() => filterItem('Movies')}>Movies</button>
                <button data-filter=".cat-two" onClick={() => filterItem('Anime')}>Anime</button>

              </div>
              <form className="movie-filter-form">
                <select className="custom-select">
                  <option value={0}>English</option>
                  <option value={1}>Blueray</option>
                  <option value={2}>4k Movie</option>
                  <option value={3}>Hd Movie</option>
                </select>
              </form>
            </div>
          </div>
        </div>
        <div className="row tr-movie-active">
          {
            movies.length > 0 ? movies?.map((elem) => {

              return (


                <div className="col-xl-3 col-lg-4 col-sm-6 grid-item grid-sizer cat-two" key={elem?._id}>
                  <div className="movie-item mb-60">
                    <div className="movie-poster">
                      <Link to={`/movie-details-${elem._id}`} target="_blank"><img src={elem?.Poster} alt="" height={420} width={300} /></Link>
                    </div>
                    <div className="movie-content">
                      <div className="top">
                        <h5 className="title"><Link to={`/movie-details-${elem._id}`} target="_blank">{elem?.MovieName}</Link></h5>
                        <span className="date">{elem?.YearProduce}</span>
                      </div>
                      <div className="bottom">
                        <ul>
                          <li><span className="quality"></span></li>
                          <li>
                            <span className="duration"><i className="far fa-clock" />{elem?.RunTime}</span>
                            <span className="rating"><i className="fas fa-thumbs-up" />{elem?.Rating}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }) : <></>

          }

        </div>
        <div className="row">
          <div className="col-12">
            <div className="pagination-wrap mt-30">
              <nav>
                <ul>{[...Array(totalPage)].map((e, i) => {
                  return <li><a href="/#">{i+1}</a></li>
                })}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section >
  )
}

export default SearchArea