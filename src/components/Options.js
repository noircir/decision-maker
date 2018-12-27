import React from 'react';
import Option from './Option';

const Options = (props) => (
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

export default Options;