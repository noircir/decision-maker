import React from 'react';

const Option = (props) => {
    return (
        <div>
            {props.optionText}
            <button onClick={() => props.deleteSingleOptionHandler(props.optionText)}
            >
                Remove
            </button>
        </div>
    );
};

export default Option;