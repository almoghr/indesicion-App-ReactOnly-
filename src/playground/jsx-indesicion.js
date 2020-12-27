const app = {
    title: "hi",
    subtitle: "this is some par",
    options: [],
  };
  
  const onFormSubmit = (e) => {
    e.preventDefault();
    const option = e.target.elements.option.value;
    if (option) {
      app.options.push(option);
      e.target.elements.option.value = "";
      render();
    }
  };
  
  const removeOptions = () => {
    app.options = [];
    render();
  };
  
  const onMakeDecision = () => {
    const randomNum = Math.floor(Math.random() * app.options.length);
    const option = app.options[randomNum];
    alert(option)
  };
  const root = document.getElementById("root");
  const render = () => {
    const template = (
      <div>
        <h1>{app.title}</h1>
        {app.subtitle && <p>{app.subtitle}</p>}
        {app.options && app.options.length > 0 ? (
          <p>here are your options</p>
        ) : (
          <p>no options</p>
        )}
        <p>{app.options.length}</p>
        <button disabled={app.options.length === 0} onClick={onMakeDecision}>What should I do?</button>
        <button onClick={removeOptions}>Remove All</button>
        <ol>
          {app.options.map((option, index) => (
            <li key={index}>{option}</li>
          ))}
        </ol>
        <form onSubmit={onFormSubmit}>
          <input type="text" name="option" />
          <button>Add Option</button>
        </form>
      </div>
    );
    ReactDOM.render(template, root);
  };
  render();
  