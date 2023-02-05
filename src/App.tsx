import React from 'react';
import './App.css';
import {useRecoilValue} from "recoil";
import {InputModal, inputModalDisplayState} from "./components/inputModal/InputModal";
import {Home} from "./components/home/Home";

function App() {
    const inputModalDisplay = useRecoilValue(inputModalDisplayState)

    return (
        <div>
            <Home/>

            <div id={'modals-div'} style={{display: inputModalDisplay}}>
                <InputModal/>
            </div>
        </div>
    );

}

export default App;