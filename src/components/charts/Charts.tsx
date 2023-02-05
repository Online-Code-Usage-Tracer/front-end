import React, {useEffect, useState} from 'react';
import './Charts.css';
import {useRecoilValue} from "recoil";
import {inputModalDisplayState} from "../inputModal/InputModal";
import {LinearChart} from "./linearChart/LinearChart";
import {PieChart2d} from "./pieChart2d/PieChart2d";
import {axiosIostat} from "../../global/ApiCalls";
import {onAxiosError, onAxiosSuccess} from "../../global/Errors";
import {CircularProgress} from "@mui/material";

export function Charts() {
    const modalDisplay = useRecoilValue(inputModalDisplayState)
    type iostatType = [
        {
            diagram: string,
            data: { time: number, "% CPU": number }[]
        },
        {
            diagram: string,
            data: { time: number, "% Disk": number }[]
        },
        {
            diagram: string,
            data: { time: number, "Read (MB/s)": number, "Write (MB/s)": number }[]
        },
        {
            diagram: string,
            data: { time: number, "Read (MB/s)": number, "Write (MB/s)": number, "% Disk": number }[]
        }
    ]

    const [iostat, setIostat] = useState<iostatType | undefined>(undefined)
    const [blktrace, setBlktrace] = useState<any>({1: [], 2: [], 3: [], 4: []})

    function every() {
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

    useEffect(() => {
        if (modalDisplay === 'none') {
            every()
            const interval = setInterval(every, 3 * 1000)
            return () => clearInterval(interval)
        }
    }, [modalDisplay])

    return (
        <div>
            {
                iostat === undefined ?
                    <CircularProgress/> :
                    <div>
                        <LinearChart data={iostat?.at(0)} yLabels={['% CPU']}/>
                        <LinearChart data={iostat?.at(1)} yLabels={['% Disk']}/>
                        <LinearChart data={iostat?.at(2)} yLabels={['Read (MB/s)', 'Write (MB/s)']}/>
                        <LinearChart data={iostat?.at(3)} yLabels={['Read (MB/s)', 'Write (MB/s)', '% Disk']}/>
                        {/*<PieChart2d data={blktrace[1]}/>*/}
                    </div>
            }
        </div>
    );
}