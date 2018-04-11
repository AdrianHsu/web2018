import React from "react";

import CalcButton from "./CalcButton";

// 計算機 App
class CalcApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // TODO
      displayResult: 0,
      currentOperator: 0, // null, ÷, x, -, +, =
      currentBuffer: 0,
      changing: 0
    };
  }

  resetState() {
    // TODO
    this.setState({
      displayResult: 0,
      currentOperator: 0,
      currentBuffer: 0,
      changing: 0
    });
  }

  showNotImplemented() {
    console.warn("This function is not implemented yet.");
  }
  setNum(num) {
    console.log(num);
    if (num === 0 && this.state.displayResult === 0) {
      return;
    }
    if (this.state.changing === 1) {
      this.setState({
        changing: 0,
        displayResult: num
      });

      return;
    }
    this.setState({ displayResult: this.state.displayResult * 10 + num });
  }
  doOperation(op) {
    console.log(op);
    if (this.state.changing === 1) {
      this.setState({ currentOperator: op });
      return;
    }
    // only first time
    if (this.state.displayResult === 0 && this.state.currentOperator === 0) {
      this.setState({
        currentOperator: op,
        changing: 1
      });
      return;
    }

    var res = 0;
    // null, ÷, x, -, +, =
    if (this.state.currentOperator === 5) {
      res = this.state.displayResult;
    } else if (this.state.currentOperator === 4) {
      res = this.state.currentBuffer + this.state.displayResult;
    } else if (this.state.currentOperator === 3) {
      res = this.state.currentBuffer - this.state.displayResult;
    } else if (this.state.currentOperator === 2) {
      res = this.state.currentBuffer * this.state.displayResult;
    } else if (this.state.currentOperator === 1) {
      res = this.state.currentBuffer / this.state.displayResult;
    } else if (this.state.currentOperator === 0) {
      res = this.state.displayResult;
    }
    this.setState(
      {
        displayResult: res
      },
      () => {
        console.log("op: " + op);
        console.log("currentOperator: " + this.state.currentOperator);
        this.setState({
          currentOperator: op,
          currentBuffer: this.state.displayResult,
          changing: 1
        });
      }
    );
  }

  render() {
    return (
      <div className="calc-app">
        <div className="calc-container">
          <div className="calc-output">
            <div className="calc-display">{this.state.displayResult}</div>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.resetState.bind(this)}>AC</CalcButton>
            <CalcButton onClick={this.showNotImplemented.bind(this)}>
              +/-
            </CalcButton>
            <CalcButton onClick={this.showNotImplemented.bind(this)}>
              %
            </CalcButton>
            <CalcButton
              className="calc-operator"
              onClick={this.doOperation.bind(this, 1)}
            >
              ÷
            </CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton
              className="calc-number"
              onClick={this.setNum.bind(this, 7)}
            >
              7
            </CalcButton>
            <CalcButton
              className="calc-number"
              onClick={this.setNum.bind(this, 8)}
            >
              8
            </CalcButton>
            <CalcButton
              className="calc-number"
              onClick={this.setNum.bind(this, 9)}
            >
              9
            </CalcButton>
            <CalcButton
              className="calc-operator"
              onClick={this.doOperation.bind(this, 2)}
            >
              x
            </CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton
              className="calc-number"
              onClick={this.setNum.bind(this, 4)}
            >
              4
            </CalcButton>
            <CalcButton
              className="calc-number"
              onClick={this.setNum.bind(this, 5)}
            >
              5
            </CalcButton>
            <CalcButton
              className="calc-number"
              onClick={this.setNum.bind(this, 6)}
            >
              6
            </CalcButton>
            <CalcButton
              className="calc-operator"
              onClick={this.doOperation.bind(this, 3)}
            >
              -
            </CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton
              className="calc-number"
              onClick={this.setNum.bind(this, 1)}
            >
              1
            </CalcButton>
            <CalcButton
              className="calc-number"
              onClick={this.setNum.bind(this, 2)}
            >
              2
            </CalcButton>
            <CalcButton
              className="calc-number"
              onClick={this.setNum.bind(this, 3)}
            >
              3
            </CalcButton>
            <CalcButton
              className="calc-operator"
              onClick={this.doOperation.bind(this, 4)}
            >
              +
            </CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton
              className="bigger-btn"
              onClick={this.setNum.bind(this, 0)}
            >
              0
            </CalcButton>
            <CalcButton className="calc-number">.</CalcButton>
            <CalcButton
              className="calc-operator"
              onClick={this.doOperation.bind(this, 5)}
            >
              =
            </CalcButton>
          </div>
        </div>
      </div>
    );
  }
}

export default CalcApp;
