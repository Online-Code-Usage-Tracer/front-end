import React from "react";
import './CustomBarChart.css'
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from 'recharts';
import {analysisType, blktraceDataType2Data, blktraceDataType4} from "../../../../../global/Types";
import {colors} from "../../../../../global/General";

export function CustomBarChart({
                                   name,
                                   data,
                                   analysis,
                                   columns,
                                   xLabel,
                               }: {
    name: string, data: blktraceDataType2Data | blktraceDataType4, analysis?: analysisType, columns: string[],
    xLabel?: object
}) {

    const newData: any = []
    const convertDataToShow = () => {
        if ('Read' in data) {
            let i = 0
            for (const key in data.Read) {
                newData[i] = {
                    name: key,
                    // @ts-ignore
                    Read: data.Read[key],
                    // @ts-ignore
                    Write: data.Write[key],
                }

                i += 1
            }

            return newData
        } else {
            let i = 0
            for (const key in data) {
                newData[i] = {
                    name: key,
                    // @ts-ignore
                    'Distribution of Range (%)': data[key]
                }

                i += 1
            }

            return newData
        }
    }

    const getName = (name: string) => {
        if ('Read' in data) {
            return name + ' Frequency (%)'
        }
        return name
    }

    function getAnalysis() {
        if (!analysis) return null

        const myAnalysis = {Read: {}, Write: {}}
        for (const key of Object.keys(analysis).sort()) {
            // @ts-ignore
            myAnalysis.Read = {
                ...myAnalysis.Read,
                // @ts-ignore
                [key]: analysis[key].Read
            }

            myAnalysis.Write = {
                ...myAnalysis.Write,
                // @ts-ignore
                [key]: analysis[key].Write
            }
        }

        return (
            <div className={'linear-chart-analysis-container'}>
                {Object.keys(myAnalysis).map((label) => {
                    return (
                        [
                            <div className={'analysis-label'}>% {label}</div>,
                            <div className={'analysis-values'}>
                                {/*@ts-ignore*/}
                                <div className={'analysis'}>Avg: {(myAnalysis[label]?.Avg)?.toFixed(2)}</div>
                                {/*@ts-ignore*/}
                                <div>Max: {(myAnalysis[label]?.Max)?.toFixed(2)}</div>
                                {/*@ts-ignore*/}
                                <div>Min: {(myAnalysis[label]?.Min)?.toFixed(2)}</div>
                            </div>
                        ]
                    )
                })}
            </div>
        )
    }

    return (
        <div className={'bar-chart'}>
            <div className={'bar-chart-name'}>{name}</div>
            <BarChart key={`lc_${newData.length}`}
                      width={600}
                      height={500}
                      data={convertDataToShow()}
                      margin={{
                          top: 10,
                          right: 0,
                          left: 40,
                          bottom: 10,
                      }}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey={"name"} label={xLabel} height={50}/>
                <YAxis/>
                <Tooltip/>
                <Legend verticalAlign="top" align="center" height={36} iconType="circle"/>
                {
                    columns.map((column, index) => {
                        return <Bar name={getName(column)} dataKey={column} fill={colors.at(index)}
                                    isAnimationActive={false}/>
                    })
                }
            </BarChart>
            {getAnalysis()}
        </div>
    )
}