import React from "react";
import ReactDOM from "react-dom";

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 100 };
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

ReactDOM.render(<Counter />, document.getElementById("root"));
