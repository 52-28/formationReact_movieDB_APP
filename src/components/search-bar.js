import React, { Component } from "react";
import AutoCompleteText from "../containers/AutoCompleteText";

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      placeHolder: "Tapez votre film...",
      intervalBeforeRequest: 1000,
      lockRequest: false,
      autoCompleteList: []
    };
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-8 input-group">
          <input
            list="autoCompleteChoice"
            type="text"
            className="form-control input-lg"
            onChange={this.handleChange.bind(this)}
            placeholder={this.state.placeHolder}
          />

          <AutoCompleteText autoCompleteList={this.state.autoCompleteList} />
          <span className="input-group-button">
            <button
              className="btn btn-secondary"
              onClick={this.handleOnClick.bind(this)}
            >
              Go!
            </button>
          </span>
        </div>
      </div>
    );
  }

  handleChange(e) {
    this.setState({ searchText: e.target.value });
    if (!this.state.lockRequest) {
      this.setState({ lockRequest: true });
      setTimeout(this.autoComplete(), this.state.intervalBeforeRequest);
    }
  }

  handleOnClick(e) {
    this.search();
  }

  search() {
    this.props.callBack(this.state.searchText);
    this.setState({ lockRequest: false });
  }

  autoComplete() {
    this.props.callBackAuto(this.state.searchText);
    this.setState({ lockRequest: false });
    this.setState({ autoCompleteList: this.props.autoCompleteList });
    console.log("-------------");
    console.log("SearchBar:", this.state.autoCompleteList);
    console.log("--------------");
  }
}
