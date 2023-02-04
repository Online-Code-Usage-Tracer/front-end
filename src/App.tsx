import React from 'react';
import './App.css';
import {useRecoilValue} from "recoil";
import {InputModal, inputModalDisplayState} from "./components/inputModal/InputModal";

function App() {
    const inputModalDisplay = useRecoilValue(inputModalDisplayState)

    return (
        <div id={'modals-div'} style={{display: inputModalDisplay}}>
            <InputModal/>
        </div>
    );

}

export default App;