import React from 'react';

class AddOption extends React.Component {
    // Tracking state of error is a smart way to render an error message
    // only when needed.
    state = {
        error: null
    }

    addOptionHandler = (e) => {
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
    };

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

export default AddOption;