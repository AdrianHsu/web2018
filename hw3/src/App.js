import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <ReactLogo />
      </div>
    );
  }
}

const ReactLogo = () => {
  return <img src={logo} className="App-logo" alt="logo" />;
};

export default App;
