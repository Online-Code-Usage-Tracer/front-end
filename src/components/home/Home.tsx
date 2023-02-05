import React, {useEffect, useState} from 'react';
import './Home.css';
import '../inputModal/InputModal.css'
import {useRecoilValue} from "recoil";
import {inputModalDisplayState} from "../inputModal/InputModal";
import {LinearChart} from "./linearChart/LinearChart";
import {axiosIostat} from "../../global/ApiCalls";
import {onAxiosError, onAxiosSuccess} from "../../global/Errors";
import {CircularProgress} from "@mui/material";
import {Header} from "./header/Header";

export function Home() {
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

    const [iostat, setIostat] = useState<iostatType | undefined>(
        [
            {
                diagram: 'a',
                data: [{time: 10, "% CPU": 10}]
            },
            {
                diagram: 'b',
                data: [{time: 10, "% Disk": 10}]
            },
            {
                diagram: 'c',
                data: [{time: 1010, "Read (MB/s)": 10, "Write (MB/s)": 10}]
            },
            {
                diagram: 'string',
                data: [{time: 10, "Read (MB/s)": 10, "Write (MB/s)": 10, "% Disk": 10}]
            }
        ]
    )
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
                iostat === undefined || blktrace === undefined ?
                    <div className={'loading-div'}>
                        <CircularProgress thickness={3} style={{color: '#3D195B'}}/>
                    </div>
                    :
                    <div>
                        <Header/>
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