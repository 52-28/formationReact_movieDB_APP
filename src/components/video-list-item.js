import React from "react";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function VideoListItem(props) {
  const { movie } = props;
  //va chercher movie dans props soit props.movie
  //si on avait plusieurs props :
  //const {movie, color, size}= props;

  return (
    <li className="list-group-item" onClick={handleOnCLick}>
      
      <div className="media">
        <div className="media-left">
          <img
            className="media-object img-rounded"
            height="100px"
            width="auto"
            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
          />
        </div>
        <div className="media-body">
          <h5 className="title_list_item">{movie.title}</h5>
        </div>
      </div>
    </li>
  );

  function handleOnCLick() {
    props.callBack(movie);
  }
}
