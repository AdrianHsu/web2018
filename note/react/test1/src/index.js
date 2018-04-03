import React from "react";
import ReactDOM from "react-dom";

class ScoreCard extends React.Component {
  render() {
    const schoolRecord = this.props.scoreCard;
    const record = schoolRecord.records;
    const name = schoolRecord.name;
    // (par1, par2) => this.tick(par1, par2)
    // (record) => (這堆東東)
    const tbody = record.map(record => (
      <tr>
        <td>{record.subject}</td>
        <td>{record.score}</td>
      </tr>
    ));
    return (
      <table border="2px">
        <caption> {name} score</caption>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>{tbody}</tbody>
      </table>
    );
  }
}

const schoolRecord = {
  name: "Ric",
  records: [
    { subject: "Math", score: 100 },
    { subject: "Chinese", score: 87 },
    { subject: "DLRB", score: 77 }
  ]
};

// ReactDOM.render(
//   <ScoreCard scoreCard={schoolRecord} />,
//   document.getElementById("root")
// );

// function tick() {
//   const element = (
//     <div>
//       <h1>Hello, world!</h1>
//       <h2>It is {new Date().toLocaleTimeString()}.</h2>
//     </div>
//   );
//   ReactDOM.render(element, document.getElementById("root"));
// }

// setInterval(tick, 1000);

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }
  // render 結束後再呼叫
  componentDidMount() {
    // (param1, param2) => this.blabal(param1, param2)
    this.timerID = setInterval(() => this.tick(), 1000);
  }
  // 沒用到，在 render 前呼叫的
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  tick() {
    this.setState({ date: new Date() });
  }
  render() {
    return (
      <div>
        <h1>Hello, world!!!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>{" "}
      </div>
    );
  }
}
ReactDOM.render(<Clock />, document.getElementById("root"));
