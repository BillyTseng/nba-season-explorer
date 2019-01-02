import React from 'react';
import logo from "../assets/nba-logoman-word-white.svg"

export class Header extends React.Component {

    render() {
        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">NBA Season Explorer</h1>
            </header>
        );
    }
}