import React from 'react';
import Papa from 'papaparse';
import Chart from "./Chart"
import {HomeVisitorRadioButtons} from "./HomeVisitorRadioButtons"
import {TeamSelector} from "./TeamSelector"
import {AppendData} from "./AppendData"
import {Row, Col} from "antd"

export class Main extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            radioState: 'Both',
            data: [],
            teamStates: ['Golden State Warriors'],
        };

        this.getData = this.getData.bind(this);
    }

    componentWillMount() {
        this.getCsvData();
    }

    componentDidUpdate() {
        // if (this.props.userInput.length > 0 && this.state.updateFlag) {
        //     let appendArr = this.parseUserInput(this.props.userInput);
        //     appendArr = this.convertArrToObject(appendArr);
        //     let targetArr = [...this.state.data, ...appendArr];
        //
        //     this.setState({
        //         data: targetArr,
        //         updateFlag: false
        //     });
        // }
    }

    updateData = (userInput) => {
        let appendArr = this.parseUserInput(userInput);
        appendArr = this.convertArrToObject(appendArr);
        let targetArr = [...this.state.data, ...appendArr];

        this.setState({
            data: targetArr,
        });
    }

    parseUserInput = (str) => {
        let arr = str.split('\n');
        let retArr = [];

        for (let item of arr) {
            retArr.push(item.split(','));
        }
        return retArr;
    }

    convertArrToObject = (arr) => {
        let objArr = [];
        for (let row of arr) {
            if (row[0] !== 'Date') {
                objArr.push({
                    date: row[0],
                    visitor: {
                        name: row[2],
                        pts: row[3]
                    },
                    home: {
                        name: row[4],
                        pts: row[5]
                    },
                });
            }
        }

        return objArr;
    }

    fetchCsv() {
        return fetch('nba.csv').then(function (response) {
            let reader = response.body.getReader();
            let decoder = new TextDecoder('utf-8');

            return reader.read().then(function (result) {
                return decoder.decode(result.value);
            });
        });
    }

    getData(result) {
        let objArr = this.convertArrToObject(result.data);
        this.setState({data: objArr});
    }

    async getCsvData() {
        let csvData = await this.fetchCsv();

        Papa.parse(csvData, {
            complete: this.getData
        });
    }

    handleHomeVisitorRadioButtons = (radioState) => {
        this.setState({radioState: radioState});
    }

    handleTeamStates = (teamStates) => {
        this.setState({teamStates: teamStates});
    }

    render() {
        return (
            <div className="main">
                <div style={{ margin: '24px 0' }} />
                <Row>
                    <Col span={5} offset={7}>
                        <AppendData callback={this.updateData}/>
                    </Col>
                    <Col span={5}>
                        <HomeVisitorRadioButtons callback={this.handleHomeVisitorRadioButtons}/>
                    </Col>
                </Row>
                <div style={{ margin: '24px 0' }} />
                <TeamSelector callback={this.handleTeamStates}/>
                <Chart data={this.state.data} radioState={this.state.radioState} teamStates={this.state.teamStates}/>
            </div>
        )
    }
}
