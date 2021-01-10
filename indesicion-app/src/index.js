import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import "normalize.css/normalize.css";
import "./index.scss";
class IndesicionApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleRemoveAll = this.handleRemoveAll.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
    this.handleClearSelectedOptionState = this.handleClearSelectedOptionState.bind(
      this
    );
    this.state = {
      options: [],
      selectedOption: undefined,
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
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem("options", json);
    }
  }
  handleRemoveAll() {
    this.setState(() => ({ options: [] }));
  }
  handleClearSelectedOptionState = () => {
    this.setState(() => ({ selectedOption: undefined }));
  };
  handlePick = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    this.setState(() => ({
      selectedOption: option,
    }));
  };
  handleAddOption = (option) => {
    if (!option) {
      return "Enter valie value to add item";
    } else if (this.state.options.indexOf(option) > -1) {
      return "This option already exists";
    }
    this.setState((prevState) => ({
      options: prevState.options.concat([option]),
    }));
  };

  handleDeleteOption = (deletedOption) => {
    this.setState((prevState) => ({
      options: prevState.options.filter((option) => option !== deletedOption),
    }));
  };

  render() {
    const title = "Indesicion";
    const subtitle = "Put your life in the hands of a computer";
    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <div className="app-container">
          <Action
            hasOptions={this.state.options.length > 0}
            handlePick={this.handlePick}
          />
          <div className="widget">
            <Options
              options={this.state.options}
              handleDeleteOption={this.handleDeleteOption}
              handleRemoveAll={this.handleRemoveAll}
            />
            <AddOption handleAddOption={this.handleAddOption} />
          </div>
        </div>
        <OptionModal
          selectedOption={this.state.selectedOption}
          clearModal={this.handleClearSelectedOptionState}
        />
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
    <div className="header">
      <div className="container">
        <h1 className="header-title">{props.title}</h1>
        <h2 className="header-subtitle">{props.subtitle}</h2>
      </div>
    </div>
  );
};

const Action = (props) => {
  return (
    <div>
      <button
        className="big-button"
        disabled={!props.hasOptions}
        onClick={props.handlePick}
      >
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
      <div className="widget-header">
        <h3 className="widget-title">Your options</h3>
        <button
          className="button button-link widget-title"
          onClick={props.handleRemoveAll}
        >
          Remove All
        </button>
      </div>
      {props.options.length === 0 && (
        <p className="no-tasks-message">insert some things to do!</p>
      )}
      {props.options.map((option, index) => (
        <Option
          key={index}
          optionText={option}
          count={index + 1}
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
    <div className="option">
      <p className="option-text">
        {props.count}.{props.optionText}
      </p>
      <button
        className="button button-link"
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
        {this.state.error && (
          <p className="add-option-error">{this.state.error}</p>
        )}
        <form className="add-option-form" onSubmit={this.addOption}>
          <input
            className="add-option-form-input"
            type="text"
            name="option"
            autoComplete="off"
          />
          <button className="button" onClick={this.clearModal}>
            Add Option
          </button>
        </form>
      </div>
    );
  }
}

const OptionModal = (props) => {
  return (
    <Modal
      closeTimeoutMS={200}
      className="modal"
      isOpen={!!props.selectedOption}
      onRequestClose={props.clearModal}
      contentLabel="selected options"
    >
      <h3 className="modal-title">Selected Option</h3>
      {props.selectedOption && <p className="modal-body">{props.selectedOption}</p>}
      <button className="button" onClick={props.clearModal}>OK</button>
    </Modal>
  );
};
ReactDOM.render(
  <React.StrictMode>
    <IndesicionApp />
  </React.StrictMode>,
  document.getElementById("root")
);
