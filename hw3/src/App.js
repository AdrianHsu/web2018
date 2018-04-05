import React, { Component } from "react";
import logo from "./logo.svg";
import editIcon from "./edit.png";
import "./App.css";

// https://stackoverflow.com/questions/48622893/how-to-make-bootstrap-4-card-deck-with-fixed-width-cards

class App extends Component {
  render() {
    return (
      <div className="App container-fluid">
        <GlobalHeader />
        <InputBoxCard />
        <TodoBoard />
      </div>
    );
  }
}
class TodoBoard extends Component {
  render() {
    // 原本想使用 card-group 或是 card-deck，但不支援 rwd 所以改用 row
    return (
      <div className="row justify-content-center">
        <TodoCard />
        {/* <TodoCard />
        <TodoCard />
        <TodoCard />
        <TodoCard />
        <TodoCard /> */}
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
        <h1 className="mt-3">React To-do List</h1>

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
        />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="button">
            Create
          </button>
        </div>
      </div>
    );
  }
}

class TodoCard extends Component {
  render() {
    var todoItems = [
      { id: 1, data: "MLDS hw1" },
      { id: 2, data: "Web hw3" },
      { id: 3, data: "NASA hw4" }
    ];
    return (
      <div className="col-auto mb-3">
        <div className="card" style={{ width: 37 + "rem" }}>
          <TodoCardHeader />
          <TodoListBody items={todoItems} />
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
          <label className="btn">
            <img src={editIcon} alt="edit" />
          </label>
          <button type="button" className="close">
            <span>&times;</span>
          </button>
        </h3>

        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Recipient's username"
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button">
              Button
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <button type="button" className="btn btn-secondary">
              ongoing <span className="badge badge-light">4</span>
            </button>
          </div>
          <div className="col">
            <button type="button" className="btn btn-success">
              done <span className="badge badge-light">4</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
class TodoListBody extends Component {
  render() {
    var displayItems = this.props.items.map(item => {
      // data 傳進去就變成 props.children
      return <TodoItem key={item.id}>{item.data}</TodoItem>;
    });
    return (
      <div className="card-body list-group list-group-flush">
        {displayItems}
      </div>
    );
  }
}

class TodoItem extends Component {
  render() {
    return (
      <button className="list-group-item list-group-item-action">
        {this.props.children}
        <TodoItemDeleteBtn />
      </button>
    );
  }
}
class TodoItemDeleteBtn extends Component {
  render() {
    return (
      <button type="button" className="close">
        <span>&times;</span>
      </button>
    );
  }
}

const ReactLogo = () => {
  return <img src={logo} className="App-logo" alt="logo" />;
};

export default App;
