import { Radio } from 'antd';
import React from "react"

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

export class HomeVisitorRadioButtons extends React.Component {
    onChange = (e) => {
        // console.log(`radio checked:${e.target.value}`);
        this.props.callback(e.target.value);
    }

    render() {
        return (
            <div>
                <div>
                    <RadioGroup onChange={this.onChange} defaultValue="Both">
                        <RadioButton value="Visitor">Visitor</RadioButton>
                        <RadioButton value="Home">Home</RadioButton>
                        <RadioButton value="Both">Both</RadioButton>
                    </RadioGroup>
                </div>
            </div>
        )
    }
}