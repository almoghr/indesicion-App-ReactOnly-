class VisibilityToggle extends React.Component {
  constructor(props) {
    super(props);
    this.handleVisibilityToggle = this.handleVisibilityToggle.bind(this);
    this.state = {
      visibility: false
    };
  }
  handleVisibilityToggle() {
    this.setState((prevState) => {
      return { visibility: !prevState.visibility };
    });
  }
  render() {
    return (
      <div>
        <h1>Visibility Toggle</h1>
        <button onClick={this.handleVisibilityToggle}>{this.state.visibility ? "Hide" : "Show"}</button>
        <p>{this.state.visibility ? "hello this is the visibilty toggling app" : ""}</p>
      </div>
    );
  }
}
ReactDOM.render(<VisibilityToggle />, document.getElementById('root'))
// let isVisible = false;
// const isVisibleToggle = () => {
//     isVisible = !isVisible
//     render()
// }
// const render = () => {
//     const jsx = (
//         <div>
//             <h1>Visibility Toggle</h1>
//             <button onClick={isVisibleToggle}>{isVisible ? 'Hide' : 'Show'}</button>
//             <p>{isVisible ? 'hello this is the visibilty toggling app' : ''}</p>
//         </div>
//     )
//     const root = document.getElementById('root');
//     ReactDOM.render(jsx, root)
// }

// render()
