import React from 'react';
import './Header.css';
import {useRecoilValue} from "recoil";
import {datasetNameState, nameState, urlState} from "../../inputModal/InputModal";
import {AvatarGenerator} from "random-avatar-generator";

export function Header() {
    const name = useRecoilValue(nameState)
    const datasetName = useRecoilValue(datasetNameState)
    const url = useRecoilValue(urlState)

    const generator = new AvatarGenerator();

    return (
        <div id={'home-bar'}>
            <div id={'left'}>
                <img id={'avatar'} alt={'random avatar'} src={generator.generateRandomAvatar(name)}/>
                <div id={'company-name'}>Online Code Usage Tracer</div>
            </div>
            <div id={'bar-name'}>Welcome {name} 😉</div>
            <div id={'bar-description'}>Running {url} on {datasetName}</div>
        </div>
    )
}