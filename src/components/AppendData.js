import {Input, Modal, Button} from 'antd';
import React from "react"
const { TextArea } = Input;

export class AppendData extends React.Component {
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
            <div>
                <Button onClick={this.showModal}>Append More Data...</Button>
                <Modal
                    title="Append Data"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width={900}
                >
                    <p>Please follow the format: Date,Start (ET),Visitor,PTS,Home,PTS</p>
                    <span>For example: </span><br/>
                    <span>10/25/17,07:30:00 PM,New York Knicks,88,Cleveland Cavaliers,117</span><br/>
                    <span>10/25/17,10:30:00 PM,San Antonio Spurs,129,Golden State Warriors,100</span><br/>
                    <div style={{ margin: '24px 0' }} />
                    <TextArea
                        placeholder="paste data here..."
                        autosize
                        value={this.state.userInput}
                        onChange={this.onInputChange}
                    />
                </Modal>
            </div>
        )
    }
}