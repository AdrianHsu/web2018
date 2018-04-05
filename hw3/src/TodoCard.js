import React, { Component } from "react";
import TodoCardHeader from "./TodoCardHeader.js";
import TodoListBody from "./TodoListBody.js";

class TodoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myname: this.props.children,
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
    // console.log(name);
    const { todoItems } = this.state;

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
  renameCallback = n => {
    this.setState({
      myname: n
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
            myname={this.state.myname}
            addItemCallback={this.addItemCallback}
            parentCallback={this.summaryCallback}
            hideCallback={this.hideCallback}
            renameCallback={this.renameCallback}
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

export default TodoCard;
