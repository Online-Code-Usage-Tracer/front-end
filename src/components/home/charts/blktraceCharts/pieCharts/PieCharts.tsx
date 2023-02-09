import React from "react";
import './PieCharts.css'
import {PieChart} from "./PieChart/PieChart";

export function PieCharts({blktrace}: { blktrace: any }) {
    return (
        <div className={'pie-charts-container'}>
            <div className={'pie-chart-name'}>{blktrace.at(0).diagram}</div>
            <div className={'two-pie-charts'}>
                <PieChart data={blktrace.at(0).data} is3D={false}/>
                <PieChart data={blktrace.at(0).data} is3D={true}/>
            </div>
        </div>
    )
}