import React from "react";
import './TimelineChart.css'
import {blktraceDataType3} from "../../../../../global/Types";
import {Chart} from "react-google-charts";

export function TimelineChart({
                                  name,
                                  data
                              }: { name: string, data: blktraceDataType3 }) {

    const convertDataToShow = () => {
        const returnData: any = [
            [
                {type: "string", id: "Program Run"},
                {type: "string", id: "Type"},
                {type: "date", id: "Start"},
                {type: "date", id: "End"},
            ]
        ]
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            const start_year = parseInt(element["Start Time"].split('/')[2])
            const start_month = parseInt(element["Start Time"].split('/')[1])
            const start_day = parseInt(element["Start Time"].split('/')[0])
            const start_hour = parseInt(element["Start Time"].split(' ')[1].split(':')[0])
            const start_minute = parseInt(element["Start Time"].split(' ')[1].split(':')[1])
            const start_second = parseInt(element["Start Time"].split(' ')[1].split(':')[2])

            const end_year = parseInt(element["End Time"].split('/')[2])
            const end_month = parseInt(element["End Time"].split('/')[1])
            const end_day = parseInt(element["End Time"].split('/')[0])
            const end_hour = parseInt(element["End Time"].split(' ')[1].split(':')[0])
            const end_minute = parseInt(element["End Time"].split(' ')[1].split(':')[1])
            const end_second = parseInt(element["End Time"].split(' ')[1].split(':')[2])

            returnData.push([
                "Program Run",
                element["Data"],
                new Date(start_year, start_month, start_day, start_hour, start_minute, start_second),
                new Date(end_year, end_month, end_day, end_hour, end_minute, end_second)
            ])
        }

        return returnData
    }

    const options = {
        timeline: {
            showRowLabels: false,
            groupByRowLabel: true,
            barLabelStyle: {
                fontSize: 20
            }
        }
    };

    return (
        <div className={'timeline-chart'}>
            <div className={'timeline-chart-name'}>{name}</div>
            <Chart
                chartType="Timeline"
                data={convertDataToShow()}
                width="500"
                height={"150px"}
                options={options}
            />
        </div>
    )
}