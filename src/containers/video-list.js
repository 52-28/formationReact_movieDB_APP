import React from "react";
import VideoListItems from "../components/video-list-item";

export default function VideoList(props) {
  const { movieList } = props;
  return (
    <div>
      <ul>
        {movieList.map(movie => {
          return (
            <VideoListItems
              key={movie.id}
              movie={movie}
              callBack={receiveCallBack}
            />
          );
        })}
      </ul>
    </div>
  );

  function receiveCallBack(movie) {
    props.callBack(movie);
  }
}
