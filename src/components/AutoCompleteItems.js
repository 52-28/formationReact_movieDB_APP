import React, { Fragment } from "react";

export default function AutoCompleteItems(props) {
  const { movie } = props;
  return (
    <Fragment>
      <option>{movie.title}</option>
    </Fragment>
  );
}
