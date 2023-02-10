import React, {useEffect, useState} from 'react';
import './Charts.css';
import {blktraceType, iostatType} from "../../../global/Types";
import {CircularProgress} from "@mui/material";
import {IostatCharts} from "./iostatCharts/IostatCharts";
import {BlktraceCharts} from "./blktraceCharts/BlktraceCharts";
import {axiosBlktrace, axiosIostat} from "../../../global/ApiCalls";
import {onAxiosError, onAxiosSuccess} from "../../../global/Errors";
import {useRecoilValue} from "recoil";
import {inputModalDisplayState} from "../../inputModal/InputModal";

export function Charts() {
    const inputModalDisplay = useRecoilValue(inputModalDisplayState)

    const [iostat, setIostat] = useState<iostatType | undefined>(undefined)
    //     [
    //         {
    //             "diagram": "Processor Utility",
    //             "data": [
    //                 {
    //                     "time": 34.74632525444031,
    //                     "% CPU": 19.26
    //                 }
    //             ]
    //         },
    //         {
    //             "diagram": "Disk Utiliy",
    //             "data": [
    //                 {
    //                     "time": 34.74632525444031,
    //                     "% Disk": 3.77
    //                 }
    //             ]
    //         },
    //         {
    //             "diagram": "Bandwidth",
    //             "data": [
    //                 {
    //                     "time": 34.74632525444031,
    //                     "Read (MB/s)": 0.9,
    //                     "Write (MB/s)": 1.04
    //                 }
    //             ]
    //         },
    //         {
    //             "diagram": "Disk Utiliy vs Bandwidth",
    //             "data": [
    //                 {
    //                     "time": 34.74632525444031,
    //                     "Read (MB/s)": 0.9,
    //                     "Write (MB/s)": 1.04,
    //                     "% Disk": 3.77
    //                 }
    //             ]
    //         }
    //     ]
    // )

    const [blktrace, setBlktrace] = useState<blktraceType | undefined>(undefined)
    // [
    //         {
    //             "diagram": "Read/Write",
    //             "data": {
    //                 "Read": 340440,
    //                 "Write": 992
    //             }
    //         },
    //         {
    //             "diagram": "Distribution of I/O Sizes",
    //             "data": {
    //                 "data": {
    //                     "Read": {
    //                         "1-4": 1411,
    //                         "5-8": 286,
    //                         "9-12": 151,
    //                         "13-16": 287,
    //                         "17-20": 162,
    //                         "21-24": 148,
    //                         "25-48": 551,
    //                         "49-64": 221,
    //                         "65-128": 1065,
    //                         ">128": 13
    //                     },
    //                     "Write": {
    //                         "1-4": 15,
    //                         "5-8": 3,
    //                         "9-12": 0,
    //                         "13-16": 0,
    //                         "17-20": 0,
    //                         "21-24": 1,
    //                         "25-48": 0,
    //                         "49-64": 0,
    //                         "65-128": 2,
    //                         ">128": 1
    //                     }
    //                 },
    //                 "analysis": {
    //                     "Min": {
    //                         "Read": 4,
    //                         "Write": 4
    //                     },
    //                     "Max": {
    //                         "Read": 672,
    //                         "Write": 164
    //                     },
    //                     "Avg": {
    //                         "Read": 39.63213038416764,
    //                         "Write": 22.545454545454547
    //                     }
    //                 }
    //             }
    //         },
    //         {
    //             "diagram": "Read/Write-Intensive",
    //             "data": [
    //                 {
    //                     "Start Time": "10/02/2023 02:04:26",
    //                     "End Time": "10/02/2023 02:04:44",
    //                     "Data": "Read"
    //                 },
    //                 {
    //                     "Start Time": "10/02/2023 02:04:44",
    //                     "End Time": "10/02/2023 02:04:76",
    //                     "Data": "Write"
    //                 }
    //             ]
    //         },
    //         {
    //             "diagram": "Access Frequency Distribution (Total R/W)",
    //             "data": {
    //                 "1-2": 341360,
    //                 "3-4": 8,
    //                 "5-6": 0,
    //                 "7-8": 0,
    //                 "9-10": 0,
    //                 "11-12": 0,
    //                 ">12": 0
    //             }
    //         }
    //     ]
    // )

    useEffect(() => {
        if (inputModalDisplay === 'none') {
            everyBlktrace()
            const interval = setInterval(everyBlktrace, 60 * 1000)
            return () => clearInterval(interval)
        }
    }, [inputModalDisplay])

    function everyBlktrace() {
        axiosBlktrace().then(
            res =>
                onAxiosSuccess({
                    res: res, onSuccess: () => setBlktrace(res.data)
                })
            ,
            error =>
                onAxiosError({axiosError: error})
        )
    }

    useEffect(() => {
        if (inputModalDisplay === 'none') {
            everyIostat()
            const interval = setInterval(everyIostat, 60 * 1000)
            return () => clearInterval(interval)
        }
    }, [inputModalDisplay])

    function everyIostat() {
        axiosIostat().then(
            res =>
                onAxiosSuccess({
                    res: res, onSuccess: () => setIostat(res.data)
                })
            ,
            error =>
                onAxiosError({axiosError: error})
        )
    }

    return (
        <div>
            {
                iostat === undefined || blktrace === undefined ?
                    <div className={'loading-div'}>
                        <CircularProgress thickness={3} style={{color: '#3D195B'}}/>
                    </div>
                    :
                    <div>
                        <IostatCharts iostat={iostat}/>
                        <BlktraceCharts blktrace={blktrace}/>
                    </div>
            }
        </div>
    )
}