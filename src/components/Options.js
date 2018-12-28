import React from 'react';
import Option from './Option';

const Options = (props) => (
    <div>
        <div className="widget-header">
            <h3 className="widget-header__h3">Your Options</h3>
            <button
                className="button button--link"
                onClick={props.deleteOptionsHandler}
            >
                Remove All Options
            </button>
        </div>
        {props.options.length === 0 && <p className="message">Please add an option to get started!</p>}
        {
            props.options.map((option, index) => {
                return <Option
                    optionText={option}
                    key={option}
                    count={index + 1}
                    deleteSingleOptionHandler={props.deleteSingleOptionHandler} />
            })
        }
    </div>
)

export default Options;