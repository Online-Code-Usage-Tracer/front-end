import React, {useEffect, useState} from 'react';
import './Charts.css';
import {useRecoilValue} from "recoil";
import {inputModalDisplayState} from "../inputModal/InputModal";
import {LinearChart} from "./linearChart/LinearChart";
import {PieChart2d} from "./pieChart2d/PieChart2d";

export function Charts() {
    const modalDisplay = useRecoilValue(inputModalDisplayState)
    const [iostat, setIostat] = useState<any>({1: [], 2: [], 3: [], 4: []})
    const [blktrace, setBlktrace] = useState<any>({1: [], 2: [], 3: [], 4: []})
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

    let answer2 = {
        1: [["Task", "Hours per Day"], ['read', 10],
            ['write', 90]],
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
        answer[1].push({'x': `10:${30 + a}`, 'y': 10.5 + a})
        answer[2].push({'x': `10:${40 + a}`, 'y': 20.5 + a})
        answer[3].push({x: `10:${30 + a}`, read: 10.5 + 2 * a, write: 15.5 + a})
        answer[4].push({x: `10:${30 + a}`, y: 10.5 + a, read: 10.5 + 2 * a, write: 15.5 + a})

        answer2 = {...blktrace}
        answer2[1] = [["Task", "Hours per Day"], ['read', 10 + a],
            ['write', 90 - a]]

        ++a
        setBlktrace(answer2)
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
            <LinearChart data={iostat[1]} yLabels={['y']}/>
            <LinearChart data={iostat[2]} yLabels={['y']}/>
            <LinearChart data={iostat[3]} yLabels={['read', 'write']}/>
            <LinearChart data={iostat[4]} yLabels={['y', 'read', 'write']}/>
            <PieChart2d data={blktrace[1]}/>
        </div>
    );
}