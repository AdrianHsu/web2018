import React, { Component } from "react";
// version 1.
// class App extends Component {
//   render() {
//     return (
//       <div>
//         <table border="2px">
//           <caption>{this.props.myRecord.name}</caption>
//           <thead>
//             <tr>
//               <th>Subject</th>
//               <th>Score</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <th> {this.props.myRecord.records[0]["subject"]} </th>
//               <th> {this.props.myRecord.records[0]["score"]} </th>
//             </tr>
//             <tr>
//               <th> {this.props.myRecord.records[1]["subject"]} </th>
//               <th> {this.props.myRecord.records[1]["score"]} </th>
//             </tr>
//             <tr>
//               <th> {this.props.myRecord.records[2]["subject"]} </th>
//               <th> {this.props.myRecord.records[2]["score"]} </th>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     );
//   }
// }

// version 2.
class App extends Component {
  render() {
    return <ScoreCard scoreCard={this.props.scoreCard} />;
  }
}
class ScoreCard extends Component {
  // top level component
  render() {
    return (
      <table border="2px">
        <Caption name={this.props.scoreCard.name} />
        <thead>
          <tr>
            <th>Subject</th>
            <th>Score</th>
          </tr>
        </thead>
        <SubjectList records={this.props.scoreCard.records} />
      </table>
    );
  }
}
class Caption extends Component {
  // table caption
  render() {
    return <caption>{this.props.name}</caption>;
  }
}
class SubjectList extends Component {
  // table body
  render() {
    return (
      <tbody>
        <Subject record={this.props.records[0]} />
        <Subject record={this.props.records[1]} />
        <Subject record={this.props.records[2]} />
      </tbody>
    );
  }
}
class Subject extends Component {
  // table row
  render() {
    return (
      <tr>
        <th> {this.props.record["subject"]} </th>
        <th> {this.props.record["score"]} </th>
      </tr>
    );
  }
}

export default App;
