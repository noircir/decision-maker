import React from 'react';

const Header = (props) => (
    <div className="header">
        <h1 className="header__title">{props.title}</h1>
        {props.subtitle && <h2 className="header__subtitle">{props.subtitle}</h2>}
    </div>
)

Header.defaultProps = {
    title: 'Decision Maker'
}

export default Header;