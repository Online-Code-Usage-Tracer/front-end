import axios from "axios";

const customAxios = axios.create(
    {
        baseURL: 'http://localhost:8000',
        timeout: 10000
    }
);

export const axiosStart = (url: string, datasetName: string) =>
    customAxios.post(`start/?url=${url}&datasetName=${datasetName}`)

export const axiosIostat = () => customAxios.get('monitor/iostat')

export const axiosBlktrace = () => customAxios.get('monitor/blktrace')