import React from 'react';
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries, DiscreteColorLegend} from 'react-vis';

const Chart = (props) => {

    const ITEMS = [
        'Golden State Warriors',
    ];

    const dataArr = [];
    for (let row of props.data) {
        if (props.radioState === 'Both') {
            if (row.home.name === 'Golden State Warriors') {
                dataArr.push({x: row.date, y: parseInt(row.home.pts)});
            } else if (row.visitor.name === 'Golden State Warriors') {
                dataArr.push({x: row.date, y: parseInt(row.visitor.pts)});
            }
        } else if (props.radioState === 'Home') {
            if (row.home.name === 'Golden State Warriors') {
                dataArr.push({x: row.date, y: parseInt(row.home.pts)});
            }
        } else { // Visitor
            if (row.visitor.name === 'Golden State Warriors') {
                dataArr.push({x: row.date, y: parseInt(row.visitor.pts)});
            }
        }
    }

    return (
        <div>
            <DiscreteColorLegend orientation="horizontal" items={ITEMS} />
            <XYPlot
                margin={{bottom: 70}}
                xType="ordinal"
                width={990}
                height={500}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis title="Date" tickLabelAngle={-45}/>
                <YAxis title="Points" />
                <LineSeries
                    data={dataArr}
                />
            </XYPlot>
        </div>
    );
}

export default Chart;