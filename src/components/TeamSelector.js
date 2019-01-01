import React from "react"
import {TreeSelect} from 'antd';
import {DIVISIONS} from "../assets/constant"

const SHOW_PARENT = TreeSelect.SHOW_PARENT;

const treeData = [];

export class TeamSelector extends React.Component {
    state = {
        value: ['Golden State Warriors'],
    }

    onChange = (value) => {
        console.log('onChange ', value);
        this.setState({value});
    }

    componentWillMount() {
        for (let div of DIVISIONS) {
            const divName = div.name;
            let children = [];
            for (let teamName of div.teams) {
                children.push({title: teamName, value: teamName, key: teamName});
            }
            treeData.push({title: divName, value: divName, key: divName, children: children});
        }
    }

    render() {
        const tProps = {
            treeData,
            value: this.state.value,
            onChange: this.onChange,
            treeCheckable: true,
            showCheckedStrategy: SHOW_PARENT,
            searchPlaceholder: 'Please select team',
            style: {
                width: 900,
            },
        };
        return <TreeSelect {...tProps} />;
    }
}
