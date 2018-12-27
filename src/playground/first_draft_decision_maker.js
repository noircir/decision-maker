console.log('App.js is running!');

const app = {
    title: 'Decision Maker App',
    subtitle: 'Unsure? Computer will decide for you!',
    options: [],
    visible: false
}

const onFormSubmitHandler = (e) => {
    e.preventDefault();
    // 'decisionOption' comes from the name attribute of the input
    const newOption = e.target.elements.decisionOption.value;

    if (newOption) {
        app.options.push(newOption);
        e.target.elements.decisionOption.value = '';
        renderApp();
    }
};

const onDeleteHandler = () => {
    app.options = [];
    renderApp();
};

const numbers = [5, 6, 7];

const onMakeDecisionHandler = () => {
    const choice = Math.floor(Math.random() * Math.floor(app.options.length));
    console.log(choice);
    console.log(app.options[choice]);
}

const toggleHandler = () => {
    app.visible = !app.visible;
    renderApp();
}


const renderApp = () => {
    const template = (
        <div>
            <h1>{app.title}</h1>
            {app.subtitle && <p>{app.subtitle}</p>}
            {app.options.length > 0 ? 'Here are your options' : 'No options'}
            <p>{app.options.length}</p>
            <button disabled={app.options.length === 0} onClick={onMakeDecisionHandler}>What should I do?</button>
            <button onClick={onDeleteHandler} >Delete all</button>
            <ol>
                {app.options.map(option => <li key={option}>{option}</li>)}
            </ol>
            <form onSubmit={onFormSubmitHandler} >
                <input type="text" name="decisionOption" />
                <button>Add Option</button>
            </form>

            <h3>Visibility Toggle</h3>
            <button onClick={toggleHandler}>{app.visible ? "Hide" : "Show"}</button>
            {app.visible && <div> SECRET TEXT </div>}
        </div>);

    ReactDOM.render(template, appRoot);
}

const appRoot = document.getElementById('app');

renderApp();