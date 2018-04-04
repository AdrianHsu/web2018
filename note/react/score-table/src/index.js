import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const schoolRecord = {
  name: "Adrian",
  records: [
    { subject: "Math", score: 100 },
    { subject: "Chinese", score: 98 },
    { subject: "English", score: 99 }
  ]
};

ReactDOM.render(
  // <App myRecord={schoolRecord} />, // version 1.
  <App scoreCard={schoolRecord} />, // version 2.
  document.getElementById("root")
);
