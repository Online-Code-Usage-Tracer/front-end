import React, {useEffect, useState} from 'react';
import './FirstChart.css';
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";

export function FirstChart({data, yLabels}: { data: any, yLabels: string[] }) {
    const initial = {mean: 0, max: 0, min: Number.POSITIVE_INFINITY}
    const colors = ['#8884d8', '#82ca9d', '#ad7e25', '#ff0000', '#00ff00', '#0000ff', '#000000', '#ffffff']
    const [analysis, setAnalysis] = useState<any>(initial)

    const getData = () => {
        let result = {...analysis}
        for (let i = 0; i < yLabels.length; i++) {
            const label = yLabels[i]
            if (result[label] === undefined)
                result[label] = {...initial}

            for (let j = 0; j < data.length; j++) {
                const element = data[j]
                result[label].mean += element[label]
                result[label].max = Math.max(result[label].max, element[label])
                result[label].min = Math.min(result[label].min, element[label])
            }

            result[label].mean /= data.length
        }

        return result
    }

    useEffect(() => {
        setAnalysis(getData())
    }, [data.length])

    return (
        <div id={'first-chart'}>
            <LineChart key={`lc_${data.length}`} width={600} height={300} data={data}
                       margin={{top: 5, right: 20, bottom: 5, left: 0}}>
                {
                    yLabels.map((label, index) => {
                        return <Line name={label} type="monotone" dataKey={label} isAnimationActive={false}
                                     stroke={colors.at(index)}/>
                    })
                }
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                <XAxis dataKey={'x'}/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
            </LineChart>
            {
                yLabels.map((label) => {
                        return (
                            <div>
                                <div>Mean {label}: {analysis[label]?.mean}</div>
                                <div>Max {label}: {analysis[label]?.max}</div>
                                <div>Min {label}: {analysis[label]?.min}</div>
                            </div>
                        )
                    }
                )}
        </div>
    )
}