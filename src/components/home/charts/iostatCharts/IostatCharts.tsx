import React from "react";
import './IostatCharts.css'
import {LinearChart} from "./linearChart/LinearChart";
import {iostatType} from "../../../../global/Types";

export function IostatCharts({iostat}: { iostat: iostatType }) {
    return (
        <div className={'iostat-charts'}>
            <LinearChart name={iostat.at(0)!.diagram}
                         data={iostat.at(0)!.data} yLabels={['% CPU']}/>
            <LinearChart name={iostat.at(1)!.diagram}
                         data={iostat.at(1)!.data} yLabels={['% Disk']}/>
            <LinearChart name={iostat.at(2)!.diagram}
                         data={iostat.at(2)!.data} yLabels={['Read (MB/s)', 'Write (MB/s)']}/>
            <LinearChart name={iostat.at(3)!.diagram}
                         data={iostat.at(3)!.data} yLabels={['Read (MB/s)', 'Write (MB/s)', '% Disk']}/>
        </div>
    )
}