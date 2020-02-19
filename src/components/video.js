import React from "react";

const BASE_URL = "https://www.youtube.com/embed/";

export default function Video({ videoId }) {
  return (
    <div
      className="embed-responsive embed-responsive-16by9"
      style={{ height: "50vh" }}
    >
      <iframe
        className="embed-responsive-item"
        src={`${BASE_URL}${videoId}`}
        allowFullScreen
        title="un titre"
      ></iframe>
    </div>
  );
}
