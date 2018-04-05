import React, { Component } from "react";
import logo from "./logo.svg";
import editIcon from "./edit.png";
import "./App.css";

// https://stackoverflow.com/questions/48622893/how-to-make-bootstrap-4-card-deck-with-fixed-width-cards

class App extends Component {
  constructor() {
    super();
    this.state = {
      totalAlive: 0,
      totalDone: 0
    };
  }
  summaryCallback = (tmp, num) => {
    this.setState({
      totalDone: this.state.totalDone + num,
      totalAlive: this.state.totalAlive + tmp
    });
  };
  render() {
    return (
      <div className="App container-fluid">
        <GlobalHeader
          totalAlive={this.state.totalAlive}
          totalDone={this.state.totalDone}
        />
        <InputBoxCard />
        <TodoBoard parentCallback={this.summaryCallback} />
      </div>
    );
  }
}
class TodoBoard extends Component {
  summaryCallback = (tmp, num) => {
    this.props.parentCallback(tmp, num);
  };

  render() {
    // 原本想使用 card-group 或是 card-deck，但不支援 rwd 所以改用 row
    return (
      <div className="row justify-content-center">
        <TodoCard parentCallback={this.summaryCallback} />
        <TodoCard parentCallback={this.summaryCallback} />

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
      alive: 0,
      done: 0,
      keyNum: 0,
      mystyle: {
        display: "show"
      },
      todoItems: []
    };
  }

  addItemCallback = name => {
    console.log(name);
    const { todoItems } = this.state;

    // to prevent from async => call a function after the state value has updated
    this.setState({
      newTitle: name,
      alive: this.state.alive + 1,
      keyNum: this.state.keyNum + 1
    });
    todoItems.push({
      key: "id" + this.state.keyNum,
      checked: -1,
      msg: name
    });
    this.setState({ todoItems });
    this.props.parentCallback(1, 0);
  };

  summaryCallback = (tmp, num) => {
    this.setState({
      done: this.state.done + num,
      alive: this.state.alive + tmp
    });
    this.props.parentCallback(tmp, num);
  };
  hideCallback = () => {
    this.setState({
      mystyle: {
        display: "none"
      }
    });
  };

  render() {
    const ms = this.state.mystyle;
    return (
      <div className="col-auto mb-3" style={ms}>
        <div className="card" style={{ width: 37 + "rem" }}>
          <TodoCardHeader
            alive={this.state.alive}
            done={this.state.done}
            addItemCallback={this.addItemCallback}
            parentCallback={this.summaryCallback}
            hideCallback={this.hideCallback}
          />
          <TodoListBody
            todoItems={this.state.todoItems}
            parentCallback={this.summaryCallback}
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
    this.props.addItemCallback(name);
    e.target.reset();
  };
  removeAll = e => {
    const done = -this.props.done;
    const alive = -this.props.alive;
    this.props.hideCallback();
    this.props.parentCallback(alive, done);
  };

  render() {
    return (
      <div className="card-header">
        <h3 className="card-title">
          School Homework
          <label className="btn">
            <img src={editIcon} alt="edit" />
          </label>
          <button type="button" className="close" onClick={this.removeAll}>
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
              <span className="badge badge-light">
                {this.props.alive - this.props.done}
              </span>
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
  summaryCallback = (tmp, num) => {
    this.props.parentCallback(tmp, num);
  };

  render() {
    var todoItems = this.props.todoItems.map(item => (
      <TodoItem
        key={item.key}
        checked={item.checked}
        parentCallback={this.summaryCallback}
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
      checked: this.props.checked,
      myclass: "list-group-item list-group-item-action",
      mystyle: {
        display: "show"
      },
      text: this.props.children
    };
  }
  update = e => {
    this.setState({ checked: this.state.checked === 1 ? -1 : 1 }, () => {
      var c = this.state.checked;
      if (c === 1) {
        this.setState({
          myclass:
            "list-group-item list-group-item-action list-group-item-success",
          text: <s>{this.props.children}</s>
        });
      } else {
        this.setState({
          myclass: "list-group-item list-group-item-action",
          text: this.props.children
        });
      }
      this.props.parentCallback(0, c);
    });
  };

  removeOne = e => {
    // 不管怎樣先把他變成 ongoing
    this.setState(
      {
        mystyle: {
          display: "none"
        }
      },
      () => {
        var c = this.state.checked === 1 ? -1 : 0;
        this.props.parentCallback(-1, c);
      }
    );
  };

  render() {
    const mc = this.state.myclass;
    const ms = this.state.mystyle;
    return (
      <div className="row" style={ms}>
        <div className="col">
          <button className={mc} onClick={this.update}>
            {this.state.text}
          </button>
        </div>
        <div className="col-lg-1">
          <button type="button" className="close" onClick={this.removeOne}>
            <span>&times;</span>
          </button>
        </div>
      </div>
    );
  }
}

const ReactLogo = () => {
  return <img src={logo} className="App-logo" alt="logo" />;
};

export default App;
