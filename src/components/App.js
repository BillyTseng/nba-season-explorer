import React, {Component} from 'react';
import {Header} from "./Header"
import {Main} from "./Main"

class App extends Component {
    state = {
        userInput: ''
    }

    handleUserInput = (value) => {
        this.setState({userInput: value});
    }

    render() {
        return (
            <div className="App">
                <Header callback={this.handleUserInput}/>
                <Main userInput={this.state.userInput}/>
            </div>
        );
    }
}

export default App;
