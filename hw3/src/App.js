import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <ReactLogo />
        <TodoCard />
      </div>
    );
  }
}

class TodoCard extends Component {
  render() {
    return (
      <div className="card" style={{ width: 18 + "rem" }}>
        <TodoCardHeader />
        <TodoList />
      </div>
    );
  }
}
class TodoCardHeader extends Component {
  render() {
    return (
      <div className="card-header">
        School Homework
        <button type="button" className="close" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
  }
}
class TodoList extends Component {
  render() {
    return (
      <div className="list-group list-group-flush">
        <TodoItem text="MLDS hw1" />
        <TodoItem text="Web hw3" />
        <TodoItem text="0bj903jb09jb90" />
      </div>
    );
  }
}

class TodoItem extends Component {
  render() {
    return (
      <button className="list-group-item list-group-item-action">
        <s>{this.props.text}</s>
        <TodoItemDeleteBtn />
      </button>
    );
  }
}
class TodoItemDeleteBtn extends Component {
  render() {
    return (
      <button type="button" className="close" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    );
  }
}

const ReactLogo = () => {
  return <img src={logo} className="App-logo" alt="logo" />;
};

export default App;
