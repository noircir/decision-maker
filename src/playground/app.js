class App extends React.Component {
    constructor(props) {
        super(props);
        this.deleteOptionsHandler = this.deleteOptionsHandler.bind(this);
        this.optionPickHandler = this.optionPickHandler.bind(this);
        this.addOptionHandler = this.addOptionHandler.bind(this);
        this.deleteSingleOptionHandler = this.deleteSingleOptionHandler.bind(this);
        this.state = {
            options: props.options
        };
    }
    
    // To set up data from a DB.
    componentDidMount() {
        try {
            const options = JSON.parse(localStorage.getItem('options'));
            if (options) {
                this.setState(() => ({ options }));
            }
        } catch (e) {
            // Do nothing
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            const jsonData = JSON.stringify(this.state.options);
            localStorage.setItem('options', jsonData);
        }
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
    }
    
    deleteOptionsHandler() {
        this.setState(() => ({ options: [] }))
    }
    
    optionPickHandler() {
        const choice = Math.floor(Math.random() * Math.floor(this.state.options.length));
        console.log(this.state.options[choice]);
    }

    addOptionHandler(option) {
        if (!option) {
            return 'Enter valid value to add item.'
        } else if (this.state.options.includes(option)) {
            return 'This item already exists.'
        }
        this.setState(() => ({
            options: [...this.state.options, option]
        }));
    }

    deleteSingleOptionHandler (option) {
        this.setState((prevState) => ({
            options: prevState.options.filter(item => item !== option )
        }))
    }

    render() {
        const subtitle = "Tremendous Taste";

        return (
            <div>
                <Header subtitle={subtitle} />
                <Action 
                    hasOptions={this.state.options.length > 0} 
                    optionPickHandler={this.optionPickHandler}
                />
                <Options 
                    options={this.state.options} 
                    deleteOptionsHandler={this.deleteOptionsHandler}
                    deleteSingleOptionHandler={this.deleteSingleOptionHandler}
                />
                <AddOption addOptionHandler={this.addOptionHandler} />
            </div>
        )
    }
}

App.defaultProps = {
    options: ['beef', 'cabbage', 'sour cream']
}

// Smart rendering: title with the help of defaultProps,
// and subtitles with a logical AND that shows a subtitle
// when it's provided, and doesn't show when not.

const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            {props.subtitle && <h2>{props.subtitle}</h2>}
        </div>
    )
}

Header.defaultProps = {
    title: 'Cabbage Rolls'
}

const Action = (props) => {
    return (
        <div>
            <button
                onClick={props.optionPickHandler}
                disabled={!props.hasOptions}
            >
                What should I do?
            </button>
        </div>
    )
}

const Options = (props) => {
    return (
        <div>
            {props.options.length === 0 && <p>Please add an option to get started!</p>}
            {
                props.options.map(option => {
                    return <Option 
                        optionText={option} 
                        key={option}
                        deleteSingleOptionHandler={props.deleteSingleOptionHandler} />
                })
            }
            <button onClick={props.deleteOptionsHandler} >Remove All Options</button>
        </div>
    )
}

const Option = (props) => {
    return (
        <div>
            {props.optionText}
            <button onClick={() => props.deleteSingleOptionHandler(props.optionText)} 
            >
                Remove
            </button>
        </div>
    )
}

class AddOption extends React.Component {
    // Tracking state of error is a smart way to render an error message
    // only when needed.
    constructor(props) {
        super(props);
        this.addOptionHandler = this.addOptionHandler.bind(this);
        this.state = {
            error: null
        }
    }

    addOptionHandler(e) {
        e.preventDefault();
        const chosenOption = e.target.elements.chosenOption.value.trim();
        // The form values validation could have been done in this class,
        // if not for validation of duplicates, which are compared against 
        // the 'options' array in App's state. The App's state cannot be passed down
        // without Redux, so we must send the validation up to the parent.
        // => breaking up the form submission handling into three parts:
        // this parts sends up the validation duty, and waits for a possible error;
        // parent's validation sends down an error or a-OK;
        // this part continues with updating or non-updating local state.
        
        const error = this.props.addOptionHandler(chosenOption);
        this.setState(() => ({ error }))
        if (!error) {
            e.target.elements.chosenOption.value = '';
        }
    }

    render() {
        return (
            <div>
            {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.addOptionHandler} >
                    <input type="text" name="chosenOption" />
                    <button>Add Choice</button>
                </form>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));