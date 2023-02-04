import React, {useEffect, useState} from 'react';
import './Charts.css';
import {useRecoilValue} from "recoil";
import {inputModalDisplayState} from "../inputModal/InputModal";
import {FirstChart} from "./firstChart/FirstChart";

export function Charts() {
    const modalDisplay = useRecoilValue(inputModalDisplayState)
    const [iostat, setIostat] = useState<any>({1: [], 2: [], 3: [], 4: [], 5: []})
    let a = 0;

    let answer = {
        1:
            [
                {'x': '10:22', 'y': 10.5},
                {'x': '10:23', 'y': 11},
                {'x': '10:24', 'y': 10.5},
                {'x': '10:25', 'y': 20}
            ],
        2:
            [
                {'x': '10:22', 'y': 10.5},
                {'x': '10:23', 'y': 11},
                {'x': '10:24', 'y': 10.5}
            ],
        3:
            [
                {'x': '10:22', 'read': 10.5, 'write': 15.5},
                {'x': '10:23', 'read': 11, write: 15.5},
                {'x': '10:24', 'read': 10.5, write: 15.5}
            ],
        4:
            [
                {x: '10:22', y: 10.5, read: 10.5, write: 15.5},
                {x: '10:23', y: 11, read: 11, write: 15.5},
                {x: '10:24', y: 10.5, read: 10.5, write: 15.5}
            ]
    }

    function every() {
        answer = {...iostat}
        answer[1].push({'x': `10:${30 + a}`, 'y': 10.5+a})
        answer[2].push({'x': `10:${40 + a}`, 'y': 20.5+a})
        answer[3].push({x: `10:${30 + a}`, read: 10.5+2*a, write: 15.5+a})
        answer[4].push({x: `10:${30 + a}`, y: 10.5+a, read: 10.5+2*a, write: 15.5+a})

        ++a
        setIostat(answer)
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
            <FirstChart data={iostat[1]} yLabels={['y']}/>
            <FirstChart data={iostat[2]} yLabels={['y']}/>
            <FirstChart data={iostat[3]} yLabels={['read', 'write']}/>
            <FirstChart data={iostat[4]} yLabels={['y', 'read', 'write']}/>
        </div>
    );
}