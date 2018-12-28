import React from 'react';

const Action = (props) => (
    <div>
        <button className="big-button"
            onClick={props.optionPickHandler}
            disabled={!props.hasOptions}
        >
            Make a decision for me!
            </button>
    </div>
)


export default Action;