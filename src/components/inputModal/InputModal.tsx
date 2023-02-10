import React, {useState} from "react";
import "./InputModal.css"
import {atom, useRecoilState} from "recoil";
import {CircularProgress} from "@mui/material";
import {onMyError} from "../../global/Errors";

export const inputModalDisplayState = atom<'none' | 'block'>({
    key: 'inputModalDisplayState',
    default: 'block'
})

const datasets: string[] = ['image_stitching', 'B', 'C']
export const datasetNameState = atom<string>({
    key: 'datasetNameState',
    default: datasets.at(0)
})

export const urlState = atom<string>({
    key: 'urlState',
    default: ''
})

export const nameState = atom<string>({
    key: 'nameState',
    default: ''
})

export function InputModal() {
    const [inputModalDisplay, setInputModalDisplay] = useRecoilState(inputModalDisplayState)
    const [datasetName, setDatasetName] = useRecoilState(datasetNameState)
    const [url, setUrl] = useRecoilState(urlState)
    const [name, setName] = useRecoilState(nameState)
    const [isLoading, setIsLoading] = useState(false)


    function confirmOnClick() {
        setIsLoading(true)

        if (name === '' || url === '') {
            onMyError({
                myError: 'Please fill all the fields',
                onError: () => setIsLoading(false)
            })
            return
        }

        setInputModalDisplay('none')
        setIsLoading(false)
        // axiosStart(url, datasetName).then(
        //     res =>
        //         onAxiosSuccess({
        //             res: res, onSuccess: () => {
        //                 setInputModalDisplay('none')
        //                 setIsLoading(false)
        //             }
        //         })
        //     ,
        //     error =>
        //         onAxiosError({
        //             axiosError: error,
        //             onError: () => setIsLoading(false)
        //         })
        // )
    }

    const onDatasetNameChange = (event: any) => {
        setDatasetName(event.target.value)
    }

    const onUrlChange = (event: any) => {
        setUrl(event.target.value)
    }

    const onNameChange = (event: any) => {
        setName(event.target.value)
    }

    return (
        <div className={'confirmation-modal-div'} style={{display: inputModalDisplay}} tabIndex={0}>
            <div className={'modal-header'}>Input</div>
            {
                isLoading ?
                    <div className={'loading-div'}>
                        <CircularProgress thickness={3} style={{color: '#3D195B'}}/>
                    </div>
                    :
                    <div id={'input-container'}>
                        <label htmlFor={'name-input'}>Please enter your name</label>
                        <input className={'inputs'} placeholder={'Amir Mohammad Fakhimi'} value={name}
                               onChange={onNameChange}/>
                        <label htmlFor={'input-url'}>Github url</label>
                        <input id={'input-url'} className={'inputs'}
                               placeholder={'https://github.com/Online-Code-Usage-Tracer/front-end'} value={url}
                               onChange={onUrlChange}/>
                        <label htmlFor={'dataset-input'}>Dataset</label>
                        <select id={'dataset-input'} className={'inputs'}
                                value={datasetName} onChange={onDatasetNameChange}>
                            {datasets.map((dataset: string) => {
                                return (
                                    <option>{dataset}</option>
                                )
                            })}
                        </select>
                    </div>
            }
            <button className={'modal-confirm-button'} onClick={confirmOnClick}>
                Confirm
            </button>
        </div>
    )
}