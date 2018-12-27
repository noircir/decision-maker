let count = 0;

const addOneHandler = () => {
    count = count + 1;
    // every time the counter changes, re-render
    renderCounter();
}

const subtractOneHandler = () => {
    count = count - 1;
    renderCounter();
}

const resetHandler = () => {
    count = 0;
    renderCounter();
}

const appRoot = document.getElementById('app');

// function definition
const renderCounter = () => {

    const template2 = (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={addOneHandler} >+1</button>
            <button onClick={subtractOneHandler} >-1</button>
            <button onClick={resetHandler} >reset</button>
        </div>
    );

    ReactDOM.render(template2, appRoot);

}

// function intialization
renderCounter();