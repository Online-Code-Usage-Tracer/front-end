import React, {useEffect, useState} from 'react';
import './LinearChart.css';
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import {iostatDataType1, iostatDataType2, iostatDataType3, iostatDataType4} from "../../../../global/Types";

export function LinearChart({
                                name,
                                data,
                                yLabels
                            }: {
    name: string,
    data: iostatDataType1 | iostatDataType2 | iostatDataType3 | iostatDataType4,
    yLabels: string[]
}) {
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
                // @ts-ignore
                result[label].mean += element[label]
                // @ts-ignore
                result[label].max = Math.max(result[label].max, element[label])
                // @ts-ignore
                result[label].min = Math.min(result[label].min, element[label])
            }

            result[label].mean /= data.length
        }

        return result
    }

    useEffect(() => {
        setAnalysis(getData())
    }, [data.length])

    function getAnalysis() {
        return (
            <div className={'linear-chart-analysis-container'}>
                {yLabels.map((label) => {
                    return (
                        [
                            <div className={'analysis-label'}>{label}</div>,
                            <div className={'analysis-values'}>
                                <div className={'analysis'}>Mean: {analysis[label]?.mean}</div>
                                <div>Max: {analysis[label]?.max}</div>
                                <div>Min: {analysis[label]?.min}</div>
                            </div>
                        ]
                    )
                })}
            </div>
        )
    }

    return (
        <div className={'linear-chart'}>
            <div className={'chart-name'}>{name}</div>
            <div className={'chart-main-part-container'}>
                <LineChart className={'line-chart'} key={`lc_${data.length}`} width={700} height={400} data={data}>
                    {
                        yLabels.map((label, index) => {
                            return <Line name={label} type="monotone" dataKey={label} isAnimationActive={false}
                                         stroke={colors.at(index)}/>
                        })
                    }
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                    <XAxis dataKey={'x'} stroke={'rgba(206,25,67,0.83)'}/>
                    <YAxis stroke={'rgba(206,25,67,0.83)'}/>
                    <Tooltip/>
                    <Legend/>
                </LineChart>
                {getAnalysis()}
            </div>
        </div>
    )
}