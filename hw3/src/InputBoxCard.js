import React, { Component } from "react";

class InputBoxCard extends Component {
  submitCallback = e => {
    e.preventDefault();
    const name = this.refs.inputItem.value;
    if (name.length === 0) {
      alert("string length must > 0");
      return;
    }
    this.props.addItemCallback(name);
    e.target.reset();
  };
  render() {
    return (
      <form className="input-group mb-3" onSubmit={e => this.submitCallback(e)}>
        <input
          ref="inputItem"
          type="text"
          className="form-control"
          placeholder="new list's title..."
        />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="submit">
            Create
          </button>
        </div>
      </form>
    );
  }
}

export default InputBoxCard;
