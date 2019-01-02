import React from 'react';
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries, DiscreteColorLegend} from 'react-vis';
import {DIVISIONS} from "../assets/constant"


const convertDivisionToTeams = (arr) => {
    for (let div of DIVISIONS) {
        if (arr.includes(div.name)) {
            let idx = arr.indexOf(div.name);
            arr.splice(idx, 1, ...div.teams);
        }
    }
    return arr;
}

const Chart = (props) => {

    const teamStatesArr = convertDivisionToTeams(props.teamStates);

    let legendItems = [];
    let dataArr = [];
    let idx = 0;

    for (let teamName of teamStatesArr) {
        legendItems.push(teamName);
        let childArr =[];

        props.data.sort(function(a, b){
            return new Date(a.date) - new Date(b.date);
        });

        for (let i = 0; i < props.data.length; i++) {
            let row = props.data[i];
            if (i > 0 && props.data[i].date === props.data[i - 1].date && props.data[i].externalData) {
                childArr.pop();
            }
            if (props.radioState === 'Both') {
                if (row.home.name === teamName) {
                    childArr.push({x: new Date(row.date), y: parseInt(row.home.pts)});
                } else if (row.visitor.name === teamName) {
                    childArr.push({x: new Date(row.date), y: parseInt(row.visitor.pts)});
                }
            } else if (props.radioState === 'Home') {
                if (row.home.name === teamName) {
                    childArr.push({x: new Date(row.date), y: parseInt(row.home.pts)});
                }
            } else { // Visitor
                if (row.visitor.name === teamName) {
                    childArr.push({x: new Date(row.date), y: parseInt(row.visitor.pts)});
                }
            }
        }

        dataArr.push({key: idx++, data: childArr});
    }

    return (
        <div>
            <DiscreteColorLegend orientation="horizontal" items={legendItems} />
            <XYPlot
                margin={{bottom: 70}}
                xType="time"
                width={990}
                height={450}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis title="Date" tickLabelAngle={-45}/>
                <YAxis title="Points" />
                {dataArr.map(props => (
                    <LineSeries {...props} />
                ))}
            </XYPlot>
        </div>
    );
}

export default Chart;