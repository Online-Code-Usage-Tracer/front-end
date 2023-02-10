import React, {useEffect} from "react";
import './BlktraceCharts.css'
import {useRecoilValue} from "recoil";
import {inputModalDisplayState} from "../../../inputModal/InputModal";
import {CustomBarChart} from "./customBarChart/CustomBarChart";
import {TimelineChart} from "./timelineChart/TimelineChart";
import {PieCharts} from "./pieCharts/PieCharts";
import {axiosIostat} from "../../../../global/ApiCalls";
import {onAxiosError, onAxiosSuccess} from "../../../../global/Errors";

export function BlktraceCharts({blktrace, setBlktrace}: { blktrace: any, setBlktrace: (blktrace: any) => void }) {
    const modalDisplay = useRecoilValue(inputModalDisplayState)

    useEffect(() => {
        if (modalDisplay === 'none') {
            every()
            const interval = setInterval(every, 60 * 1000)
            return () => clearInterval(interval)
        }
    }, [modalDisplay])

    function every() {
        axiosIostat().then(
            res =>
                onAxiosSuccess({
                    res: res, onSuccess: () => setBlktrace(res.data)
                })
            ,
            error =>
                onAxiosError({axiosError: error})
        )
    }

    return (
        <div className={'blktrace-charts'}>
            <PieCharts blktrace={blktrace}/>
            <CustomBarChart name={blktrace.at(1).diagram} data={blktrace.at(1).data.data}
                            analysis={blktrace.at(1).data.analysis} columns={['Read', 'Write']}
                            xLabel={{value: 'I/O Size (KB)', position: 'insideBottom', offset: 2}}/>
            <CustomBarChart name={blktrace.at(3).diagram} data={blktrace.at(3).data}
                            columns={['Distribution of Range (%)']}
                            xLabel={{value: 'Frequency Range', position: 'insideBottom', offset: 2}}/>
            <TimelineChart name={blktrace.at(2).diagram} data={blktrace.at(2).data}/>
        </div>
    )
}