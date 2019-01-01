import React from 'react';
import Papa from 'papaparse';
import Chart from "./Chart"
import {HomeVisitorRadioButtons} from "./HomeVisitorRadioButtons"
import {TeamSelector} from "./TeamSelector"
import {DIVISIONS} from "../assets/constant"

export class Main extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            radioState: 'Both',
            data: []
        };

        this.getData = this.getData.bind(this);
    }

    componentWillMount() {
        this.getCsvData();
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
        let objArr = [];
        for (let row of result.data) {
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
        // console.log('handleHomeVisitorRadioButtons: ' + radioState);
    }

    populateTeamSelectors = () => {
        let table = [];
        for (let div of DIVISIONS) {
            table.push(<TeamSelector key={div.name} name={div.name} teams={div.teams}/>);
        }
        return table;
    }

    render() {
        return (
            <div className="main">
                <HomeVisitorRadioButtons callback={this.handleHomeVisitorRadioButtons}/>
                {this.populateTeamSelectors()}
                <Chart data={this.state.data} radioState={this.state.radioState}/>
            </div>
        )
    }
}
