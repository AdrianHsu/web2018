# react-2

http://www.react.express/environment

[Link](https://egghead.io/lessons/react-build-a-jsx-live-compiler-as-a-react-component)



## React.Children



```react
class App extends React.Component {
    
    render() {
        return (
        	<Parent>
            	<div className="childA"></div> // this is JSX
                <div className="childB"></div>
            </Parent>
        )
    }
}

class Parent extends React.Component {
    render(){
        // let items = this.props.children.map(child => child);
        
        // let items = React.Children.map(this.props.children, child => child);
        
        // let items = React.Children.toArray(this.props.children)
        
        let items = React.Children.forEach(this.props.children, child => console.log(
        	child.rops.className));
        console.log(items)
        return null
    }
}
```

## React JSX compiler 

輸入：

``` react
const App = (props) => {
  var myStyle = {
    backgroundColor: '#000',
    height: 10  
  }
  return (
    <div style={myStyle}>
       <a href="#"
          onClick={update}>
         this is the text
       </a>
    </div>
  )
}
```

輸出：

```react
"use strict";

var App = function App(props) {
  var myStyle = {
    backgroundColor: '#000',
    height: 10
  };
  return React.createElement(
    "div",
    { style: myStyle },
    React.createElement(
      "a",
      { href: "#",
        onClick: update },
      "this is the text"
    )
  );
}; 
```

