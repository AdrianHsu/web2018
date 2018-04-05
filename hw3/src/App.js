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
          placeholder="new list's title..."
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
  constructor(props) {
    super(props);
    this.state = {
      newTitle: null,
      undone: 3,
      done: 0,
      keyNum: 3,
      todoItems: [
        { key: "id" + 1, checked: false, msg: "dinner" },
        { key: "id" + 2, checked: false, msg: "jogging" },
        { key: "id" + 3, checked: false, msg: "sleep" }
      ]
    };
  }

  addItemCallback = name => {
    console.log(name);
    const { todoItems } = this.state;

    this.setState({ newTitle: name });
    this.setState({ undone: this.state.undone + 1 });
    this.setState({ keyNum: this.state.keyNum + 1 });
    todoItems.push({
      key: "id" + this.state.keyNum,
      checked: false,
      msg: name
    });
    this.setState({ todoItems });
  };

  render() {
    return (
      <div className="col-auto mb-3">
        <div className="card" style={{ width: 37 + "rem" }}>
          <TodoCardHeader
            undone={this.state.undone}
            done={this.state.done}
            parentCallback={this.addItemCallback}
          />
          <TodoListBody
            todoItems={this.state.todoItems}
            undone={this.state.undone}
            done={this.state.done}
          />
        </div>
      </div>
    );
  }
}
class TodoCardHeader extends Component {
  submitCallback = e => {
    e.preventDefault();
    const name = this.refs.inputItem.value;
    // console.log(name);
    this.props.parentCallback(name);
    e.target.reset();
  };

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

        <form
          className="input-group mb-3"
          onSubmit={e => this.submitCallback(e)}
        >
          <input
            ref="inputItem"
            type="text"
            className="form-control"
            placeholder="new task name..."
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="submit">
              Submit
            </button>
          </div>
        </form>
        <div className="row">
          <div className="col">
            <button type="button" className="btn btn-secondary">
              ongoing{" "}
              <span className="badge badge-light">{this.props.undone}</span>
            </button>
          </div>
          <div className="col">
            <button type="button" className="btn btn-success">
              done <span className="badge badge-light">{this.props.done}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
class TodoListBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      undone: this.props.undone,
      done: this.props.done,
      todoItems: this.props.todoItems
    };
  }
  render() {
    var todoItems = this.state.todoItems.map(item => (
      <TodoItem
        key={item.key}
        checked={item.checked}
        undone={this.state.undone}
        done={this.state.done}
      >
        {item.msg}
      </TodoItem>
    ));

    return (
      <div className="card-body list-group list-group-flush">{todoItems}</div>
    );
  }
}

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: this.props.key,
      checked: this.props.checked
    };
  }
  update = e => {
    this.setState({ checked: !this.state.checked });
    // console.log(this.state.checked);
  };
  render() {
    return (
      <button
        className="list-group-item list-group-item-action"
        onClick={this.update}
      >
        {this.props.children}
        <button type="button" className="close">
          <span>&times;</span>
        </button>
      </button>
    );
  }
}

const ReactLogo = () => {
  return <img src={logo} className="App-logo" alt="logo" />;
};

export default App;
