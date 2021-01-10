class IndesicionApp extends React.Component {
    constructor(props) {
      super(props);
      this.handleAddOption = this.handleAddOption.bind(this);
      this.handlePick = this.handlePick.bind(this);
      this.handleRemoveAll = this.handleRemoveAll.bind(this);
      this.handleDeleteOption = this.handleDeleteOption.bind(this);
      this.state = {
        options: [],
      };
    }
    componentDidMount() {
      try {
        const json = localStorage.getItem("options");
        const options = JSON.parse(json);
        if (options) {
          this.setState(() => ({ options }));
        }
      } catch (e) {}
      console.log("mounted");
    }
    componentDidUpdate(prevProps, prevState) {
      if (prevState.options.length !== this.state.options.length) {
        const json = JSON.stringify(this.state.options);
        localStorage.setItem("options", json);
        console.log("saving data");
      }
    }
    handleRemoveAll() {
      this.setState(() => ({ options: [] }));
    }
  
    handlePick() {
      const randomNum = Math.floor(Math.random() * this.state.options.length);
      const option = this.state.options[randomNum];
      alert(option);
    }
    handleAddOption(option) {
      if (!option) {
        return "Enter valie value to add item";
      } else if (this.state.options.indexOf(option) > -1) {
        return "This option already exists";
      }
      this.setState((prevState) => ({
        options: prevState.options.concat([option]),
      }));
    }
  
    handleDeleteOption(deletedOption) {
      this.setState((prevState) => ({
        options: prevState.options.filter((option) => option !== deletedOption),
      }));
    }
  
    render() {
      const title = "Indesicion";
      const subtitle = "Put your life in the hands of a computer";
      return (
        <div>
          <Header title={title} subtitle={subtitle} />
          <Action
            hasOptions={this.state.options.length > 0}
            handlePick={this.handlePick}
          />
          <Options
            options={this.state.options}
            handleDeleteOption={this.handleDeleteOption}
            handleRemoveAll={this.handleRemoveAll}
          />
          <AddOption handleAddOption={this.handleAddOption} />
        </div>
      );
    }
  }
  // class Header extends React.Component {
  //   render() {
  //     return (
  //       <div>
  //         <h1>{this.props.title}</h1>
  //         <h2>{this.props.subtitle}</h2>
  //       </div>
  //     );
  //   }
  // }
  
  const Header = (props) => {
    return (
      <div>
        <h1>{props.title}</h1>
        <h2>{props.subtitle}</h2>
      </div>
    );
  };
  
  const Action = (props) => {
    return (
      <div>
        <button disabled={!props.hasOptions} onClick={props.handlePick}>
          What should I do?
        </button>
      </div>
    );
  };
  // class Action extends React.Component {
  //   render() {
  //     return (
  //       <div>
  //         <button
  //           disabled={!this.props.hasOptions}
  //           onClick={this.props.handlePick}
  //         >
  //           What should I do?
  //         </button>
  //       </div>
  //     );
  //   }
  // }
  
  const Options = (props) => {
    return (
      <div>
      
      <button onClick={props.handleRemoveAll}>Remove All</button>
      {props.options.length === 0 && <p>insert some things to do!</p>}
        {props.options.map((option, index) => (
          <Option
            key={index}
            optionText={option}
            handleDeleteOption={props.handleDeleteOption}
          />
        ))}
      </div>
    );
  };
  // class Options extends React.Component {
  //   render() {
  //     return (
  //       <div>
  //         <button onClick={this.props.handleRemoveAll}>Remove All</button>
  //         {this.props.options.map((option, index) => (
  //           <Option key={index} optionText={option} />
  //         ))}
  //         <Option />
  //       </div>
  //     );
  //   }
  // }
  
  const Option = (props) => {
    return (
      <div>
        {props.optionText}
        <button
          onClick={() => {
            props.handleDeleteOption(props.optionText);
          }}
        >
          Remove
        </button>
      </div>
    );
  };
  // class Option extends React.Component {
  //   render() {
  //     return <div>{this.props.optionText}</div>;
  //   }
  // }
  
  class AddOption extends React.Component {
    constructor(props) {
      super(props);
      this.addOption = this.addOption.bind(this);
      this.state = {
        error: undefined,
      };
    }
    addOption(e) {
      e.preventDefault();
      const option = e.target.elements.option.value.trim();
      const error = this.props.handleAddOption(option);
      this.setState(() => ({ error }));
      if (!error) {
        e.target.elements.option.value = "";
      }
    }
    render() {
      return (
        <div>
          {this.state.error && <p>{this.state.error}</p>}
          <form onSubmit={this.addOption}>
            <input type="text" name="option" autoComplete="off" />
            <button>Add Option</button>
          </form>
        </div>
      );
    }
  }
  
  ReactDOM.render(<IndesicionApp />, document.getElementById("root"));
  