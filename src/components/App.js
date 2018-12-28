import React from 'react';
import AddOption from './AddOption';
import Options from './Options';
import Header from './Header';
import Action from './Action';
import ChoiceModal from './ChoiceModal';

class App extends React.Component {
    state = {
        options: [],
        selectedOption: undefined
    }

    deleteOptionsHandler = () => {
        this.setState(() => ({ options: [] }))
    }

    optionPickHandler = () => {
        const randomNum = Math.floor(Math.random() * Math.floor(this.state.options.length));
        const option = this.state.options[randomNum];
        this.setState(() => ({ selectedOption: option }));
    }

    addOptionHandler = (option) => {
        if (!option) {
            return 'Enter valid value to add item.'
        } else if (this.state.options.includes(option)) {
            return 'This item already exists.'
        }
        this.setState(() => ({
            options: [...this.state.options, option]
        }));
    }

    deleteSingleOptionHandler = (option) => {
        this.setState((prevState) => ({
            options: prevState.options.filter(item => item !== option)
        }))
    }

    closeModal = () => {
        this.setState(() => ({ selectedOption: undefined }));
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

    render() {
        const subtitle = "Not sure what to do? Computer will make a decision for you!";

        return (
            <div>
                <Header subtitle={subtitle} />
                <div className="container">
                    <Action
                        hasOptions={this.state.options.length > 0}
                        optionPickHandler={this.optionPickHandler}
                    />
                    <div className="widget">
                        <Options
                            options={this.state.options}
                            deleteOptionsHandler={this.deleteOptionsHandler}
                            deleteSingleOptionHandler={this.deleteSingleOptionHandler}
                        />
                        <AddOption addOptionHandler={this.addOptionHandler} />
                    </div>
                </div>
                <ChoiceModal
                     selectedOption={this.state.selectedOption}
                     closeModal={this.closeModal}
                />
            </div>
        )
    }
}

// App.defaultProps = {
//     options: ['beef', 'cabbage', 'sour cream']
// }

export default App;