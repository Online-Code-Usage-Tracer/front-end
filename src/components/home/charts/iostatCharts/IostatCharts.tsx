import React, {useEffect} from "react";
import './IostatCharts.css'
import {LinearChart} from "./linearChart/LinearChart";
import {useRecoilValue} from "recoil";
import {inputModalDisplayState} from "../../../inputModal/InputModal";
import {iostatType} from "../../../../global/Types";

export function IostatCharts({iostat, setIostat}: { iostat: iostatType, setIostat: (iostat: iostatType) => void }) {
    const modalDisplay = useRecoilValue(inputModalDisplayState)

    useEffect(() => {
        if (modalDisplay === 'none') {
            every()
            const interval = setInterval(every, 3 * 1000)
            return () => clearInterval(interval)
        }
    }, [modalDisplay])

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

    return (
        <div className={'iostat-charts'}>
            <LinearChart name={iostat.at(0)!.diagram}
                         data={iostat.at(0)!.data} yLabels={['% CPU']}/>
            <LinearChart name={iostat.at(1)!.diagram}
                         data={iostat.at(1)!.data} yLabels={['% Disk']}/>
            <LinearChart name={iostat.at(2)!.diagram}
                         data={iostat.at(2)!.data} yLabels={['Read (MB/s)', 'Write (MB/s)']}/>
            <LinearChart name={iostat.at(3)!.diagram}
                         data={iostat.at(3)!.data} yLabels={['Read (MB/s)', 'Write (MB/s)', '% Disk']}/>
        </div>
    )
}