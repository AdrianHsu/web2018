import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

// https://stackoverflow.com/questions/48622893/how-to-make-bootstrap-4-card-deck-with-fixed-width-cards

class App extends Component {
  render() {
    return (
      <div className="App container-fluid">
        <GlobalHeader />

        <InputBoxCard />
        <div className="row justify-content-center">
          <TodoCard />
          <TodoCard />
          <TodoCard />
          <TodoCard />
          <TodoCard />
          <TodoCard />
        </div>
      </div>
    );
  }
}

class GlobalHeader extends Component {
  render() {
    return (
      <div className="media">
        <div className="align-self-center mr-3">
          <ReactLogo />
        </div>
        <h1 class="mt-3">React 待辦事項</h1>

        <div className="media-body">
          <button type="button" className="btn btn-success mt-4 float-right">
            done <span className="badge badge-light">4</span>
          </button>
          <button type="button" className="btn btn-secondary mt-4 float-right">
            ongoing <span className="badge badge-light">4</span>
          </button>
        </div>
      </div>
    );
  }
}
class InputBoxCard extends Component {
  render() {
    return (
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="button">
            Button
          </button>
        </div>
      </div>
    );
  }
}

class TodoCard extends Component {
  render() {
    return (
      <div className="col-auto mb-3">
        <div className="card" style={{ width: 37 + "rem" }}>
          <TodoCardHeader />
          <TodoListBody />
        </div>
      </div>
    );
  }
}
class TodoCardHeader extends Component {
  render() {
    return (
      <div className="card-header">
        <h3 className="card-title">
          School Homework
          <button type="button" className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </h3>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Recipient's username"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button">
              Button
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3">
            <button type="button" className="btn btn-secondary">
              done <span className="badge badge-light">4</span>
            </button>
          </div>
          <div className="col-sm-3">
            <button type="button" className="btn btn-secondary">
              ongoing <span className="badge badge-light">4</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
class TodoListBody extends Component {
  render() {
    return (
      <div className="card-body list-group list-group-flush">
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
