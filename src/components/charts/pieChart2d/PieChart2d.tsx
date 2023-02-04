import React from 'react';
import {Chart} from "react-google-charts";

export function PieChart2d({data}: { data: any }) {
    return (
        <Chart
            chartType="PieChart"
            data={data}
            options={{
                title: "My Daily Activities",
            }}
            width={"100%"}
            height={"400px"}
        />
    )
}