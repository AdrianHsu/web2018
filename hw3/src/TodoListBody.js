import React, { Component } from "react";
import TodoItem from "./TodoItem.js";

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
export default TodoListBody;
