let isVisible = false;
const isVisibleToggle = () => {
    isVisible = !isVisible
    render()
}
const render = () => {
    const jsx = (
        <div>
            <h1>Visibility Toggle</h1>
            <button onClick={isVisibleToggle}>{isVisible ? 'Hide' : 'Show'}</button>
            <p>{isVisible ? 'hello this is the visibilty toggling app' : ''}</p>
        </div>
    )
    const root = document.getElementById('root');
    ReactDOM.render(jsx, root)
}

render()