import React from "react";
import './PieChart.css'
import {Chart} from "react-google-charts";
import {blktraceDataType1} from "../../../../../../global/Types";

export function PieChart({
                             data,
                             is3D,
                         }: { data: blktraceDataType1, is3D: boolean }) {
    // @ts-ignore
    const convertDataToShow = () => [Object.keys(data), ...Object.keys(data).map(key => [key, data[key]])]
    const options = {
        is3D: is3D,
        chartArea: {width: 500, height: 300},
        legend: {textStyle: {fontSize: 15}}
    }

    return (
        <Chart className={'exact-pie-chart'}
               chartType={"PieChart"}
               data={convertDataToShow()}
               options={options}
        />
    )
}