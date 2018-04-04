import React from "react";
import ReactDOM from "react-dom";

// const App = () => (
//   <div>
//     <h1> Hi h1 Title </h1>
//     <p>test pa</p>
//   </div>
// );

// class App extends React.Component {
//   //
//   render() {
//     //return <MyButton>React</MyButton>
//     // 做出一個 I <3 You! 的按鈕，button 裡面包的是 span
//     return (
//       <MyButton>
//         I <Heart /> You!{" "}
//       </MyButton>
//     );
//   }
// }

// // 這樣可以拿到 (default) App 裡面的 props 的 nested components
// const MyButton = myprops => <button>{myprops.children}</button>;

// class Heart extends React.Component {
//   render() {
//     return <span> love </span>;
//   }
// }

// class App extends React.Component {
//   constructor() {
//     super();
//     this.state = { aaa: "", bbb: "" };
//   }
//   update(e) {
//     this.setState({
//       aaa: this.aaa.refs.input1.value,
//       bbb: this.bref.value
//     });
//   }
//   render() {
//     return (
//       <div>
//         <MyInput
//           ref={component => (this.aaa = component)}
//           update={this.update.bind(this)}
//         />
//         <h1>{this.state.aaa}</h1>
//         <input
//           type="text"
//           ref={node => (this.bref = node)}
//           onChange={this.update.bind(this)}
//         />
//         <h1>{this.state.bbb}</h1>
//       </div>
//     );
//   }
// }

// class MyInput extends React.Component {
//   render() {
//     return (
//       <div>
//         <input type="text" ref="input1" onChange={this.props.update} />
//       </div>
//     );
//   }
// }

// export default App;

// class App extends React.Component {
//   constructor() {
//     super();
//     this.state = { val: 0 };
//     this.update = this.update.bind(this);
//   }
//   update() {
//     this.setState({ val: this.state.val + 1 });
//   }
//   componentWillMount() {
//     console.log("willmount"); // 只有在一開始第一次 render 前呼叫一次
//   }
//   componentWillUnmount() {
//     console.log("willunmount"); // 沒有用到
//   }
//   componentDidMount() {
//     console.log("didmount"); // 只有第一次 render 後呼叫一次
//   }
//   render() {
//     console.log("render"); // 每次按下去都呼叫
//     return <button onClick={this.update}>It's {this.state.val} now</button>;
//   }
// }
// class Wrapper extends React.Component {
//   mount() {
//     ReactDOM.render(<App />, document.getElementById("a"));
//   }
//   unmount() {
//     ReactDOM.unmountComponentAtNode(document.getElementById("a"));
//   }
//   render() {
//     return (
//       <div>
//         <button onClick={this.mount.bind(this)}>Mount!</button>
//         <button onClick={this.unmount.bind(this)}>Unount!</button>
//         <div id="a" />
//       </div>
//     );
//   }
// }

// class App extends React.Component {
//   constructor() {
//     super();
//     this.state = { items: [] }; // 1.
//   }
//   componentWillMount() {
//     //2.
//     fetch("https://swapi.co/api/people/?format=json")
//       .then(response => response.json())
//       .then(({ results: items }) => this.setState({ items }));
//   }
//   filter(e) {
//     // 6. 可做出 search 功能，輸入 L 查到包含 L 的字
//     this.setState({ filter: e.target.value });
//   }
//   render() {
//     let items = this.state.items;
//     if (this.state.filter) {
//       // 5.
//       items = items.filter(item =>
//         item.name
//           .toLowerCase() // includes 包含的
//           .includes(this.state.filter.toLowerCase())
//       );
//     }
//     return (
//       <div>
//         <input type="text" onChange={this.filter.bind(this)} />
//         {items.map(item => <Person key={item.name} person={item} />)}
//       </div>
//     );
//   }
// }

// const Person = props => <h4>{props.person.name}</h4>;

const HOC = InnerComponent =>
  class extends React.Component {
    constructor() {
      super();
      this.state = { count: 0 };
    }
    update() {
      this.setState({ count: this.state.count + 1 });
    }
    componentWillMound() {
      console.log("will mount");
    }
    render() {
      return (
        <InnerComponent
          {...this.props} // 啥意思？
          {...this.state}
          update={this.update.bind(this)}
        />
      );
    }
  };

class App extends React.Component {
  render() {
    return (
      <div>
        <Button>button</Button>
        <LabelHOC>label</LabelHOC>
      </div>
    );
  }
}

const Button = HOC(props => (
  <button onClick={props.update}>
    {props.children} - {props.count}
  </button>
));

class Label extends React.Component {
  componentWillMount() {
    console.log("label will mount");
  }
  render() {
    return (
      <label onMouseMove={this.props.update}>
        {this.props.children} - {this.props.count}
      </label>
    );
  }
}

const LabelHOC = HOC(Label);
export default App;
