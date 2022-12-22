import React, { useEffect, useState } from 'react'
import "magnific-popup";
import $ from "jquery";
import { getClientById, updateClient } from '../../helpers/app-backend/client-backend-helper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const EpipsodeArea = ({ singleMovie, episodes }) => {
  const [enableMovie, setEnableMovie] = useState(false)
  const [movieWatched, setMovieWatched] = useState([])
  const fetchClient = async () => {
    let lastWatched = []
    await getClientById(JSON.parse(localStorage.getItem("LKCLientInfo"))._id).then(res => {
      res.data.LastWatchMovie.map(item => {
        lastWatched.push(item._id)
      })
      setMovieWatched(lastWatched)
    })
  }
  useEffect(() => {
    fetchClient()
    $('.popup-video').magnificPopup({
      type: 'iframe'
    });


  }, [])
  async function playVideo(index) {
    await getClientById(JSON.parse(localStorage.getItem("LKCLientInfo"))._id).then(async (res) => {
      if (res.data.IsPayment == true) {
        setEnableMovie(true)
        var elem = document.getElementsByTagName('video')[index];
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
        let LastWatch = movieWatched
        LastWatch.push(singleMovie._id)
        const formData = new FormData()
        formData.append("LastWatchMovieString", LastWatch)
        await updateClient(JSON.parse(localStorage.getItem("LKCLientInfo"))._id, formData)
      }
      else {
        toast.error("Buy our service to watch movie");

      }
    })
  }
  return (
    <section className="episode-area episode-bg" style={{ backgroundImage: 'url("../img/bg/episode_bg.jpg")' }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="movie-episode-wrap">
              <div className="episode-top-wrap">
                <div className="section-title">
                  <span className="sub-title">ONLINE STREAMING</span>
                  <h2 className="title">Watch Full Episode</h2>
                </div>
                <div className="total-views-count">
                  <p>2.7 million <i className="far fa-eye" /></p>
                </div>
              </div>
              <ToastContainer />
              <div className="episode-watch-wrap">
                <div className="accordion" id="accordionExample">
                  <div className="card">
                    <div className="card-header" id="headingOne">
                      <button className="btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        <span className="season">Season {singleMovie?.Season}</span>
                        <span className="video-count">{episodes.length} Episodes</span>
                      </button>
                    </div>
                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                      <div className="card-body">
                        <ul>
                          {episodes.map((item, index) => (
                            <li>
                              <a onClick={() => { playVideo(index) }} className="popup-video" ><i className="fas fa-play" /> Episode {item.Episode} - {item.EpisodeName}</a> <span className="duration"><i className="far fa-clock" /> {item.RunTime}</span>
                              <video height={0} controls={false} mute={enableMovie} autoPlay={enableMovie} src={`http://localhost:8000/api/v1/TVEpisode/GetVideo/Folder=TVVideo&Movie=${singleMovie?._id}&Episode=${item?.Episode}`} width="400">
                              </video>
                            </li>

                          )

                          )}
                          {/* <li><a href="https://www.youtube.com/watch?v=R2gbPxeNk2E" className="popup-video"><i className="fas fa-play" /> Episode 2 - Meaner Than Evil</a> <span className="duration"><i className="far fa-clock" /> 28 Min</span></li>
                          <li><a href="https://www.youtube.com/watch?v=R2gbPxeNk2E" className="popup-video"><i className="fas fa-play" /> Episode 3 - I Killed a Man Today</a> <span className="duration"><i className="far fa-clock" /> 28 Min</span></li>
                          <li><a href="https://www.youtube.com/watch?v=R2gbPxeNk2E" className="popup-video"><i className="fas fa-play" /> Episode 4 - Cowboys and Dreamers</a> <span className="duration"><i className="far fa-clock" /> 28 Min</span></li>
                          <li><a href="https://www.youtube.com/watch?v=R2gbPxeNk2E" className="popup-video"><i className="fas fa-play" /> Episode 5 - Freight Trains and Monsters</a> <span className="duration"><i className="far fa-clock" /> 28 Min</span></li> */}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    {/* <div className="card-header" id="headingTwo">
                      <button className="btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        <span className="season">Season 1</span>
                        <span className="video-count">5 Full Episodes</span>
                      </button>
                    </div> */}
                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                      <div className="card-body">
                        <ul>
                          <li><a href="https://www.youtube.com/watch?v=R2gbPxeNk2E" className="popup-video"><i className="fas fa-play" /> Episode 1 - The World Is Purple</a> <span className="duration"><i className="far fa-clock" /> 28 Min</span>
                          </li>
                          <li><a href="https://www.youtube.com/watch?v=R2gbPxeNk2E" className="popup-video"><i className="fas fa-play" /> Episode 2 - Meaner Than Evil</a> <span className="duration"><i className="far fa-clock" /> 28 Min</span></li>
                          <li><a href="https://www.youtube.com/watch?v=R2gbPxeNk2E" className="popup-video"><i className="fas fa-play" /> Episode 3 - I Killed a Man Today</a> <span className="duration"><i className="far fa-clock" /> 28 Min</span>
                          </li>
                          <li><a href="https://www.youtube.com/watch?v=R2gbPxeNk2E" className="popup-video"><i className="fas fa-play" /> Episode 4 - Cowboys and Dreamers</a> <span className="duration"><i className="far fa-clock" /> 28 Min</span>
                          </li>
                          <li><a href="https://www.youtube.com/watch?v=R2gbPxeNk2E" className="popup-video"><i className="fas fa-play" /> Episode 5 - Freight Trains and Monsters</a> <span className="duration"><i className="far fa-clock" /> 28 Min</span></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="row">
          <div className="col-12">
            <div className="movie-history-wrap">
              <h3 className="title">About <span>History</span></h3>
              <p>Lorem ipsum dolor sit amet, consecetur adipiscing elseddo eiusmod tempor.There are many variations of passages of lorem
                Ipsum available, but the majority have suffered alteration in some injected humour.There are many variations of passages
                of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised
                words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure
                there isn't anything errassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to
                repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of
                over 200 Latin words, combined with a handful</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EpipsodeArea