import React, { Component } from "react";
import SearchBar from "../components/search-bar";
import VideoList from "../containers/video-list";
import axios from "axios";
import VideoDetail from "../components/video-detail";
import Video from "../components/video";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/style.css";

const API_END_POINT = "https://api.themoviedb.org/3/";
const POPULAR_MOVIES_URL =
  "discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=images";
const API_KEY = "api_key=98f9d891f28ec2b9848c6342977da6e4";
const SEARCH_URL = "search/movie?language=fr&include_adult=false";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { movieList: {}, currentMovie: {}, autoCompleteList: {} };
  }

  UNSAFE_componentWillMount() {
    this.initMovies();
  }

  initMovies() {
    axios
      .get(`${API_END_POINT}${POPULAR_MOVIES_URL}&${API_KEY}`)
      .then(response => {
        this.setState(
          {
            movieList: response.data.results.slice(1, 6),
            currentMovie: response.data.results[0]
          },
          function() {
            this.applyVideoToCurrentMovie();
          }
        );
      });
  }

  applyVideoToCurrentMovie() {
    axios
      .get(
        `${API_END_POINT}movie/${this.state.currentMovie.id}?append_to_response=videos&include_adult=false&${API_KEY}`
      )
      .then(
        function(response) {
          const youtubeKey = response.data.videos.results[0].key;
          let newCurrentMovieState = this.state.currentMovie;
          newCurrentMovieState.videoId = youtubeKey;
          this.setState({ currentMovie: newCurrentMovieState });
        }.bind(this)
      );
  }

  onClickListItem(movie) {
    this.setState({ currentMovie: movie }, function() {
      this.applyVideoToCurrentMovie();
      this.setRecommandations();
    });
  }

  setRecommandations() {
    axios
      .get(
        `${API_END_POINT}movie/${this.state.currentMovie.id}/recommendations?&${API_KEY}&language=fr`
      )
      .then(response => {
        this.setState({
          movieList: response.data.results.slice(0, 5)
        });
      });
  }

  onClickSearch(searchText) {
    if (searchText) {
      axios
        .get(`${API_END_POINT}${SEARCH_URL}&${API_KEY}&query=${searchText}`)
        .then(response => {
          if (response.data && response.data.results[0]) {
            if (response.data.results[0].id !== this.state.currentMovie.id) {
              this.setState({ currentMovie: response.data.results[0] }, () => {
                this.applyVideoToCurrentMovie();
                this.setRecommandations();
              });
            }
          }
        });
    }
  }

  autoComplete(autoComplete) {
    if (autoComplete) {
      axios
        .get(`${API_END_POINT}${SEARCH_URL}&${API_KEY}&query=${autoComplete}`)
        .then(response => {
          if (response.data && response.data.results[0]) {
            if (response.data.results[0].id !== this.state.currentMovie.id) {
              this.setState({
                autoCompleteList: response.data.results.slice(0, 10)
              });
            }
          }
        });
    }
  }

  render() {
    const renderVideoList = () => {
      if (this.state.movieList.length >= 5) {
        return (
          <VideoList
            movieList={this.state.movieList}
            callBack={this.onClickListItem.bind(this)}
          />
        );
      }
    };
    return (
      <div>
        <div className="search_bar">
          <SearchBar
            callBack={this.onClickSearch.bind(this)}
            callBackAuto={this.autoComplete.bind(this)}
            autoCompleteList={this.state.autoCompleteList}
          />
        </div>
        <div className="row">
          <div className="col-12  col-md-7 col-lg-8">
            <Video videoId={this.state.currentMovie.videoId} />
            <VideoDetail
              title={this.state.currentMovie.title}
              description={this.state.currentMovie.overview}
            />
          </div>
          <div className="col-12  col-md-5 col-lg-4">{renderVideoList()}</div>
        </div>
      </div>
    );
  }
}
