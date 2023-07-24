import React, { useEffect, useState } from "react";
import "magnific-popup";
import $ from "jquery";
import { getListSingleMovie } from "../../helpers/app-backend/singlemovie-backend-helper";
import { getListTVSeason } from "../../helpers/app-backend/tvseason-backend-helper";
import { Link, useHistory } from "react-router-dom";
import { getListMovie } from "../../helpers/app-backend/movie-backend-helper";
import { getClientById } from "../../helpers/app-backend/client-backend-helper";
const LastWatchMovie = () => {
  const [newMovie, setNewMovie] = useState([]);
  const getListNewSingleMovie = async () => {
    await getClientById(
      JSON.parse(localStorage.getItem("LKCLientInfo"))._id
    ).then((res) => {
      console.log(res);
      if (res?.isSuccess) {
        let newArr = [
          ...new Map(
            res.data.LastWatchMovie.map((item) => [item["_id"], item])
          ).values(),
        ];
        console.log(newArr);

        setNewMovie(newArr);
        $(".popup-video").magnificPopup({
          type: "iframe",
        });
      }
    });
  };

  useEffect(() => {
    getListNewSingleMovie();
  }, []);

  return (
    <section
      className="top-rated-movie tr-movie-bg2"
      style={{ backgroundImage: 'url("img/bg/tr_movies_bg.jpg")' }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="section-title title-style-three text-center mb-70">
              {/* <span className="sub-title">New Update Movies</span> */}
              <h5 className="title">Watch It Again</h5>
            </div>
          </div>
        </div>
        <div className="row movie-item-row">
          {newMovie.map((item) => (
            <div className="">
              <div className="movie-item movie-item-two">
                <div className="movie-poster">
                  <img src={item?.Poster} alt="" height={273} width={195} />
                  <ul className="overlay-btn">
                    <li>
                      <a href={item?.Trailer} className="popup-video btn">
                        Trailer
                      </a>
                    </li>
                    <li>
                      <Link
                        to={`/movie-details-${item?._id}`}
                        className="btn"
                        target="_blank"
                      >
                        Watch Now
                      </Link>
                    </li>
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
                  <h5 className="title">
                    <Link to={`/movie-details-${item?._id}`} target="_blank">
                      {item?.MovieName}
                    </Link>
                  </h5>
                  {item?.Category?.length > 0 ? (
                    item?.Category?.map((item, index) => {
                      if (index < 2) {
                        return (
                          <span className="rel"> {item?.CategoryName}</span>
                        );
                      }
                    })
                  ) : (
                    <></>
                  )}
                  <div className="movie-content-bottom">
                    <ul>
                      <li
                        className="tag"
                        style={{ display: "flex", marginRight: 0 }}
                      >
                        <a href="/#">HD</a>
                        <a href="/#">{item?.Country}</a>
                      </li>
                      <li>
                        <span className="like">
                          <i className="fas fa-thumbs-up" /> {item?.Rating}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LastWatchMovie;
