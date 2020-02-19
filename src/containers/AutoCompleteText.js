import React from "react";
import AutoCompleteItems from "../components/AutoCompleteItems";

export default function AutoCompleteText(props) {
  const { autoCompleteList } = props;
  console.log("-------------");
  console.log("", autoCompleteList[0]);
  console.log("--------------");
  if (autoCompleteList[0]) {
    return (
      <datalist id="autoCompleteChoice">
        {autoCompleteList.map(movie => {
          return <AutoCompleteItems movie={movie} />;
        })}
      </datalist>
    );
  } else return null;
}
