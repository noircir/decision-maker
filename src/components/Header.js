import React from 'react';

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

export default Header;