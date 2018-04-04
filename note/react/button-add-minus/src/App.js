import React, { Component } from "react";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Counter val={this.props.val} />
      </div>
    );
  }
}

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.val };
  }
  incNum() {
    this.setState({ value: this.state.value + 1 });
  }
  decNum() {
    this.setState({ value: this.state.value - 1 });
  }
  render() {
    return (
      <div>
        <h1>{this.state.value}</h1>
        <button onClick={e => this.incNum(e)}>{"+"}</button>
        <button onClick={e => this.decNum(e)}>{"-"}</button>
      </div>
    );
  }
}

export default App;
