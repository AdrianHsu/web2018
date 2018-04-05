import React, { Component } from "react";
import editIcon from "./img/edit.png";

class TodoCardHeader extends Component {
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
  removeAll = e => {
    const done = -this.props.done;
    const alive = -this.props.alive;
    this.props.hideCallback();
    this.props.parentCallback(alive, done);
  };
  renameCallback = e => {
    var t = "";
    t = prompt("Please enter title", this.props.myname);
    if (t.length === 0) {
      return;
    }
    this.props.renameCallback(t);
  };

  render() {
    return (
      <div className="card-header">
        <h3 className="card-title">
          {this.props.myname}
          <label className="btn" onClick={this.renameCallback}>
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

export default TodoCardHeader;
