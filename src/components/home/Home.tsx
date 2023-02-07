import React from 'react';
import './Home.css';
import '../inputModal/InputModal.css'
import {Header} from "./header/Header";
import {Charts} from "./charts/Charts";

export function Home() {
    return (
        <div>
            <Header/>
            <Charts/>
        </div>
    );
}