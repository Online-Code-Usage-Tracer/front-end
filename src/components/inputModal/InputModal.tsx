import React, {useState} from "react";
import "./InputModal.css"
import {atom, useRecoilState} from "recoil";
import {CircularProgress} from "@mui/material";
import {axiosStart} from "../../global/ApiCalls";
import {onAxiosError, onAxiosSuccess} from "../../global/Errors";

export const inputModalDisplayState = atom<'none' | 'block'>({
    key: 'inputModalDisplayState',
    default: 'block'
})

const datasets: string[] = ['image_stitching', 'B', 'C']
export const datasetNameState = atom<string>({
    key: 'datasetNameState',
    default: 'A'
})

export const urlState = atom<string>({
    key: 'urlState',
    default: ''
})

export function InputModal() {
    const [modalDisplay, setModalDisplayState] = useRecoilState(inputModalDisplayState)
    const [datasetName, setDatasetName] = useRecoilState(datasetNameState)
    const [url, setUrl] = useRecoilState(urlState)
    const [isLoading, setIsLoading] = useState(false)


    function confirmOnClick() {
        setIsLoading(true)
        axiosStart(url, datasetName).then(
            res =>
                onAxiosSuccess({
                    res: res, onSuccess: () => {
                        setModalDisplayState('none')
                        setIsLoading(false)
                    }
                })
            ,
            error =>
                onAxiosError({
                    axiosError: error,
                    onError: () => setIsLoading(false)
                })
        )
    }

    const onDatasetNameChange = (event: any) => {
        setDatasetName(event.target.value)
    }

    const onUrlChange = (event: any) => {
        setUrl(event.target.value)
    }

    return (
        <div className={'confirmation-modal-div'} style={{display: modalDisplay}} tabIndex={0}>
            <div className={'modal-header'}>Input</div>
            {
                isLoading ?
                    <CircularProgress thickness={3} style={{color: '#3D195B'}}/> :
                    <div id={'input-container'}>
                        <div className={'col-container'}>
                            <label htmlFor={'input-url'}>Github url</label>
                            <input id={'input-url'} placeholder={'Enter Github url'} value={url} onChange={onUrlChange}/>
                        </div>
                        <div className={'col-container'}>
                            <label htmlFor={'dataset-input'}>Dataset</label>
                            <select id={'dataset-input'}
                                    value={datasetName} onChange={onDatasetNameChange}>
                                {datasets.map((dataset: string) => {
                                    return (
                                        <option>{dataset}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
            }
            <button className={'modal-confirm-button'} onClick={confirmOnClick}>
                Confirm
            </button>
        </div>
    )
}