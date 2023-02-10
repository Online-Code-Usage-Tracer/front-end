import React from "react";
import './BlktraceCharts.css'
import {CustomBarChart} from "./customBarChart/CustomBarChart";
import {TimelineChart} from "./timelineChart/TimelineChart";
import {PieCharts} from "./pieCharts/PieCharts";

export function BlktraceCharts({blktrace}: { blktrace: any }) {
    return (
        <div className={'blktrace-charts'}>
            <PieCharts blktrace={blktrace}/>
            <CustomBarChart name={blktrace.at(1).diagram} data={blktrace.at(1).data.data}
                            analysis={blktrace.at(1).data.analysis} columns={['Read', 'Write']}
                            xLabel={{value: 'I/O Size (KB)', position: 'insideBottom', offset: 2}}/>
            <CustomBarChart name={blktrace.at(3).diagram} data={blktrace.at(3).data}
                            columns={['Distribution of Range (%)']}
                            xLabel={{value: 'Frequency Range', position: 'insideBottom', offset: 2}}/>
            <TimelineChart name={blktrace.at(2).diagram} data={blktrace.at(2).data}/>
        </div>
    )
}