import React, { Component } from "react";
import "./App.css";
import TodoBoard from "./TodoBoard.js";
import GlobalHeader from "./GlobalHeader.js";
import InputBoxCard from "./InputBoxCard.js";

// https://stackoverflow.com/questions/48622893/how-to-make-bootstrap-4-card-deck-with-fixed-width-cards
class App extends Component {
  constructor() {
    super();
    this.state = {
      totalAlive: 0,
      totalDone: 0,
      keyNum: 0,
      todoCards: []
    };
  }
  summaryCallback = (tmp, num) => {
    this.setState({
      totalDone: this.state.totalDone + num,
      totalAlive: this.state.totalAlive + tmp
    });
  };
  addItemCallback = name => {
    // console.log(name);
    const { todoCards } = this.state;

    this.setState({
      keyNum: this.state.keyNum + 1
    });
    todoCards.push({
      key: "id" + this.state.keyNum,
      msg: name
    });
    this.setState({ todoCards });
  };
  render() {
    return (
      <div className="App container-fluid">
        <GlobalHeader
          totalAlive={this.state.totalAlive}
          totalDone={this.state.totalDone}
        />
        <InputBoxCard addItemCallback={this.addItemCallback} />
        <TodoBoard
          parentCallback={this.summaryCallback}
          todoCards={this.state.todoCards}
        />
      </div>
    );
  }
}

export default App;
