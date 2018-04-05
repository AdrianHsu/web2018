import React, { Component } from "react";
import logo from "./img/logo.svg";

class GlobalHeader extends Component {
  render() {
    return (
      <div className="media">
        <div className="align-self-center mr-3">
          <ReactLogo />
        </div>
        <h1 className="mt-3">React To-do List</h1>

        <div className="media-body">
          <button type="button" className="btn btn-success mt-4 float-right">
            done{" "}
            <span className="badge badge-light">{this.props.totalDone}</span>
          </button>
          <button type="button" className="btn btn-secondary mt-4 float-right">
            ongoing{" "}
            <span className="badge badge-light">
              {this.props.totalAlive - this.props.totalDone}
            </span>
          </button>
        </div>
      </div>
    );
  }
}

const ReactLogo = () => {
  return <img src={logo} className="App-logo" alt="logo" />;
};

export default GlobalHeader;
