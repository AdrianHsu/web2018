

# React-1

> 學習最好ㄉ方式就是照抄寫筆記！！
>
> 



#### Start

```sh
create-react-app test-app
cd test-app
npm start
```



#### 最簡單的 React.Component

```react
// App.js
import React from 'react';

class App extends React.Component {
    render() {
        return <h1> Hello World</h1>
    }
}
export default App
```



#### 利用 React.createElement

```react
import React from 'react';

// class 有 state, 相較之下 stateless function 就沒有
class App extends React.Component {
    render() {
        return React.createElement('h1', null, 'Hello World') // null 是 props, 這邊沒用到
    }
}
export default App
```

####Stateless function component

```react
import React from 'react';

const App = () => <h1> Hello Wolrd </h1>

export default App
```



#### 一定要是一個 enclosing tag

```react
//App.js
import React from 'react';

class App extends React.Component {
    render() {
        return (<div><h1> Hello World</h1><p>aa</p></div>)
    }
}
export default App
```



#### 什麼是 props?

passing data into components using props

註：propTypes 已經被 deprecated 了

``` react
// App.js
class App extends React.Component {
    render() {
        let txt = this.props.txt; //  Component 接收外面傳進來的 props
        return <h1>{txt}</h1>
    }
}
// 設定你傳進來的類型是啥 （properties）
App.propTypes = {
    txt: React.PropTypes.string
    //bla: React.PropTypes.number.isRequired // 這代表一定要設，不能沒給值
}
// 設定 default 參數長怎樣
App.defaultProps = {
    txt: "this is the default prop text"
}

// index.js
import App from './App';

ReactDOM.render(
	<App txt="this is my prop text!" />, // 要傳進去的 props 是 txt=""
    document.getElementById('root')
);

```



#### 什麼是 state?

用 `costructor()` 設定 state, 用 `update()` 改 state, 然後就可在 `render()` 裡面呼叫來改值

```react
class App extends React.Component {
    constructor() {
        super();
        this.state = {
            txt: 'this is state txt'
            cat: 0
        }
    }
    update( e ) {
        // 因為只有 setState txt, 所以 cat 不會被改到
        this.setState({txt: e.target.value})
    }
    render() {
        return (
            <div>
        		<h1>{this.state.txt}, and {this.state.cat}</h1>
                <!-- onChange 是即時的! -->
                <input type="text" onChange={this.update.bind(this)}/>
            </div>
        )
    }
}
```



#### 可以在 component 裡面塞 stateless function 生出的東西



```react
class App extends React.Component {
    constructor() {
        super();
        this.state = {
            txt: 'this is state txt'
        }
    }
    update( e ) {
        this.setState({txt: e.target.value})
    }
    render() {
        return (
            <div>
        		<h1>{this.state.txt}</h1>
                <!-- 把 widget 獨立出來，只留下 update 比較乾淨 -->
                <Widget update={this.update.bind(this)} />
                <!-- 每個 widget 都是指向同一個 this.state.txt, 都可以改他的值 -->
                <!--<Widget update={this.update.bind(this)} /> 
                <Widget update={this.update.bind(this)} />-->
            </div>
        )
    }
}

const Widget = (myprops) =>  <input type="text" onChange={myprops.update}/>
```

#### 使用 props.children

`this.props.children ` accesses the innerHTML or nested components of another component. 

用 props 可以把資料傳進 Component，如果在外面用 myprops.children 則可以拿到 Component 裡面的 props 的值。一個由外傳到內、一個由內傳到外。

```react
class App extends React.Component {
    // 
    render() {
        // 1. 可以讓外面的人 access 到我的 nested data, 也就是 'React' 這幾個字
        //return <Button>React</Button>
        
        // 2. 我們也可以 access "nested component"
        // 做出一個 I <3 You! 的按鈕，button 裡面包的是 span
        return <Button>I <Heart/ > You! </Button> 
    }
}

// 這樣可以拿到 (default) App 裡面的 props 的 nested components, 也就是 'React' 這幾個字 
const Button = (myprops) => <button>{myprops.children}</button>
         

```

```react

class Heart extends React.Component {
    render() {
        return <span> <3 </span>
    }
}
```

#### Synthetic Event System 是幹嘛的？

可以抓到滑鼠點擊、複製文字、剪下貼上文字的行為，e.g. 禁止別人複製我的文章，就可以用到



```react
class App extends React.Component {
    constructor() {
        super();
        this.state = {currentEvent: '尚未有任何狀況發生'}
        this.update = this.update.bind(this) // 初始化
    }
    update(e) {
        // 抓出 e.type，像是 keypress, copy, cut, paste
        // 然後在 <h1> 裡面會即時更新
        this.setState({currentEvent: e.type})
    }
    render() {
        return (
        	<div>
                <textarea
                    onKeyPress={this.update}
                    onCopy={this.update}
                    onCut={this.update}
                    onPaste={this.update}
                    />
                <h1>{this.state.currentEvent}</h1>
            </div>
        )
    }
}
```



#### 取出某個 Component 的 reference

```react
class App extends React.Component {
    constructor() {
        super();
        this.state = {aaa: '', bbb: ''};
    }
    update(e) {
        this.setState({
            aaa: e.target.value, // 這樣是爛的，因為他不知道 a 和 b 是獨立的 input
            bbb: e.target.value
        })
    }
    render() {
        return (
        	<div>
            	<input
                    type="text"
                    onChange={this.update.bind(this)}
                    />
                <h1>{this.state.aaa}</h1>
                <input
                    type="text"
                    onChange={this.update.bind(this)}
                />
                <h1>{this.state.bbb}</h1>
            </div>
        )
    }
}
```



如何解決？

```react
class App extends React.Component {
    constructor() {
        super();
        this.state = {aaa: '', bbb: ''};
    }
    update(e) {
        this.setState({
            aaa: this.refs.aref.value,
            bbb: this.refs.bref.value
        })
    }
    render() {
        return (
        	<div>
            	<input
                    type="text"
                    ref="aref" // 加上這個
                    onChange={this.update.bind(this)}
                    />
                <h1>{this.state.aaa}</h1>
                <input
                    type="text"
                    ref="bref" // 加上這個
                    onChange={this.update.bind(this)}
                />
                <h1>{this.state.bbb}</h1>
            </div>
        )
    }
}
```

另一種解法：用node

```react
class App extends React.Component {
    constructor() {
        super();
        this.state = {aaa: '', bbb: ''};
    }
    update(e) {
        this.setState({
            aaa: this.aref.value,
            bbb: this.bref.value
        })
    }
    render() {
        return (
        	<div>
            	<input
                    type="text"
                    ref= { node => this.aref = node}
                    onChange={this.update.bind(this)}
                    />
                <h1>{this.state.aaa}</h1>
                <input
                    type="text"
                    ref= { node => this.bref = node}
                    onChange={this.update.bind(this)}
                />
                <h1>{this.state.bbb}</h1>
            </div>
        )
    }
}
```

第三種解法：把 input 抓出來變成 class

```react
class App extends React.Component {
  constructor() {
    super();
    this.state = { aaa: "", bbb: "" };
  }
  update(e) {
    this.setState({
      aaa: this.aaa.refs.input1.value,
      bbb: this.bref.value
    });
  }
  render() {
    return (
      <div>
        <MyInput
          ref={component => (this.aaa = component)}
          update={this.update.bind(this)}
        />
        <h1>{this.state.aaa}</h1>
        <input
          type="text"
          ref={node => (this.bref = node)}
          onChange={this.update.bind(this)}
        />
        <h1>{this.state.bbb}</h1>
      </div>
    );
  }
}

class MyInput extends React.Component {
  render() {
    return (
      <div>
        <input type="text" ref="input1" onChange={this.props.update} />
      </div>
    );
  }
}
```



#### Component 的生命周期

用數字加減舉例：

```react
class App extends React.Component {
    constructor() {
        super();
        this.state = {val: 0}
        this.update = this.update.bind(this)
    }
    update() {
        this.setState({val: this.state.val + 1})
    }
    componentWillMount() {
        console.log('willmount') // 只有在一開始第一次 render 前呼叫一次
    }
    componentWillUnmount() {
        console.log('willunmount') // 沒有用到
    }
    componentDidMount() {
        console.log('didmount') // 只有第一次 render 後呼叫一次
    }
    render() {
        console.log('render') // 每次按下去都呼叫
        return <button onClick={this.update}>It's {this.state.val} now</button>
    }
}
```

多開一個 wrapper 把 App 包住，從外面進行 mount, unmount, render 呼叫

```react
// App 的 code 不變，需要注意的是 render() 在裡面跟外面的 Wrapper 都有，一

class Wrapper extends React.Component {
    mount() {
        ReactDOM.render(<App />, document.getElementById('a'));
    }
    unmount() {
      ReactDOM.unmountComponentAtNode(document.getElementById('a'));
    }
    render() {
        return <div> 
            <button onClick={this.mount.bind(this)}>Mount!</button>
            <button onClick={this.unmount.bind(this)}>Unount!</button>
            <div id="a"/>
        </div>
    }
}

export default wrapper;
```



