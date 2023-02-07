import React, {useEffect, useState} from 'react';
import './Charts.css';
import {LinearChart} from "./linearChart/LinearChart";
import {iostatType} from "../../../global/Types";
import {useRecoilValue} from "recoil";
import {inputModalDisplayState} from "../../inputModal/InputModal";
import {CircularProgress} from "@mui/material";

export function Charts() {
    const modalDisplay = useRecoilValue(inputModalDisplayState)

    const [iostat, setIostat] = useState<iostatType | undefined>(
        [
            {
                diagram: 'adfghnbv',
                data: [{time: 10, "% CPU": 10}]
            },
            {
                diagram: 'bdsfdgf',
                data: [{time: 10, "% Disk": 10}]
            },
            {
                diagram: 'cdsfdbg',
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
        // axiosIostat().then(
        //     res =>
        //         onAxiosSuccess({
        //             res: res, onSuccess: () => setIostat(res.data)
        //         })
        //     ,
        //     error =>
        //         onAxiosError({axiosError: error})
        // )
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
                    <div id={'charts'}>
                        <LinearChart name={iostat.at(0)!.diagram}
                                     data={iostat.at(0)!.data} yLabels={['% CPU']}/>
                        <LinearChart name={iostat.at(1)!.diagram}
                                     data={iostat.at(1)!.data} yLabels={['% Disk']}/>
                        <LinearChart name={iostat.at(2)!.diagram}
                                     data={iostat.at(2)!.data} yLabels={['Read (MB/s)', 'Write (MB/s)']}/>
                        <LinearChart name={iostat.at(3)!.diagram}
                                     data={iostat.at(3)!.data} yLabels={['Read (MB/s)', 'Write (MB/s)', '% Disk']}/>
                        {/*<PieChart2d data={blktrace[1]}/>*/}
                    </div>
            }
        </div>
    )
}