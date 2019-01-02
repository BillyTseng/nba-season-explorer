import React from 'react';
import logo from "../assets/nba-logoman-word-white.svg"
import { Icon, Modal, Input } from 'antd';

const { TextArea } = Input;

export class Header extends React.Component {
    state = {
        visible: false,
        userInput: ''
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = () => {
        this.props.callback(this.state.userInput);
        this.setState({
            visible: false,
            userInput: ''
        });
    }

    handleCancel = () => {
        this.setState({
            visible: false,
            userInput: ''
        });
    }

    onInputChange = (e) => {
        this.setState({
            userInput: e.target.value
        });
    }

    render() {
        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">NBA Season Explorer</h1>

                <a className="App-add" onClick={this.showModal}>
                    <Icon type="file-add" />{' '}Append More Data...
                </a>
                <Modal
                    title="Append Data"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width={900}
                >
                    <TextArea
                        placeholder="paste data here..."
                        autosize
                        value={this.state.userInput}
                        onChange={this.onInputChange}
                    />
                </Modal>
            </header>
        );
    }
}