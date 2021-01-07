class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOne = this.handleAddOne.bind(this);
    this.handleRemoveOne = this.handleRemoveOne.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.state = {
      count: props.count,
    };
  }
  componentDidMount() {
    const stringCount = localStorage.getItem('count');
    const count = parseInt(stringCount, 10);

    if(!isNaN(count)){
      this.setState(() => ({ count }))
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count){
      localStorage.setItem('count', this.state.count)
    }
  }
  handleAddOne() {
    this.setState((prevState) => {
      return { count: prevState.count + 1 };
    });
  }
  handleRemoveOne() {
    this.setState((prevState) => {
      return { count: prevState.count - 1 };
    });
  }
  handleReset() {
    this.setState(() => {
      return { count: 0 };
    });
  }
  render() {
    return (
      <div>
        <h1>Count: {this.state.count}</h1>
        <button onClick={this.handleRemoveOne}>-1</button>
        <button onClick={this.handleReset}>reset</button>
        <button onClick={this.handleAddOne}>+1</button>
      </div>
    );
  }
}

Counter.defaultProps = {
  count: 0,
}

ReactDOM.render(<Counter />, document.getElementById("root"));

// let count = 0;
// const addOne = () => {
//     count++;
//     renderCounterApp()
// }
// const minusOne = () => {
//     count--;
//     renderCounterApp()
// }
// const reset = () => {
//     count = 0;
//     renderCounterApp()
// }

// const root = document.getElementById('root')

// const renderCounterApp = () => {
//     const template = (
//         <div>
//             <h1>Count: {count}</h1>\\
//             <button onClick={addOne}>+1</button>
//             <button onClick={reset}>reset</button>
//             <button onClick={minusOne}>-1</button>
//         </div>
//     );

//     ReactDOM.render(template, root)
// };

// renderCounterApp();
