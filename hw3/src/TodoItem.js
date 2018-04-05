import React, { Component } from "react";
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

export default TodoItem;
