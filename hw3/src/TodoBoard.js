import React, { Component } from "react";
import TodoCard from "./TodoCard.js";

class TodoBoard extends Component {
  summaryCallback = (tmp, num) => {
    this.props.parentCallback(tmp, num);
  };

  render() {
    var todoCards = this.props.todoCards.map(item => (
      <TodoCard key={item.key} parentCallback={this.summaryCallback}>
        {item.msg}
      </TodoCard>
    ));
    // 原本想使用 card-group 或是 card-deck，但不支援 rwd 所以改用 row
    return <div className="row justify-content-center">{todoCards}</div>;
  }
}

export default TodoBoard;
