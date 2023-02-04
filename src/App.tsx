import React from 'react';
import './App.css';
import {useRecoilValue} from "recoil";
import {InputModal, inputModalDisplayState} from "./components/inputModal/InputModal";
import {Charts} from "./components/charts/Charts";

function App() {
    const inputModalDisplay = useRecoilValue(inputModalDisplayState)

    return (
        <div>
            <Charts/>

            <div id={'modals-div'} style={{display: inputModalDisplay}}>
                <InputModal/>
            </div>
        </div>
    );

}

export default App;