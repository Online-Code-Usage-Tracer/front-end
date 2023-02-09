export type iostatDataType1 = { time: number, "% CPU": number }[]
export type iostatDataType2 = { time: number, "% Disk": number }[]
export type iostatDataType3 = { time: number, "Read (MB/s)": number, "Write (MB/s)": number }[]
export type iostatDataType4 = { time: number, "Read (MB/s)": number, "Write (MB/s)": number, "% Disk": number }[]

export type iostatType = [
    {
        diagram: string,
        data: iostatDataType1
    },
    {
        diagram: string,
        data: iostatDataType2
    },
    {
        diagram: string,
        data: iostatDataType3
    },
    {
        diagram: string,
        data: iostatDataType4
    }
]


export type blktraceDataType1 = {
    Read: number,
    Write: number
}
export type analysisType = {
    Min: {
        Read: number,
        Write: number
    },
    Max: {
        Read: number,
        Write: number
    },
    Avg: {
        Read: number,
        Write: number
    }
}
export type blktraceDataType2Data = {
    Read: {
        "1-4": number,
        "5-8": number,
        "9-12": number,
        "13-16": number,
        "17-20": number,
        "21-24": number,
        "25-48": number,
        "49-64": number,
        "65-128": number,
        ">128": number
    },
    Write: {
        "1-4": number,
        "5-8": number,
        "9-12": number,
        "13-16": number,
        "17-20": number,
        "21-24": number,
        "25-48": number,
        "49-64": number,
        "65-128": number,
        ">128": number
    }
}
export type blktraceDataType2 = {
    data: blktraceDataType2Data,
    analysis: analysisType
}
export type blktraceDataType3 = {
    "Start Time": string,
    "End Time": string,
    "Data": string
}[]
export type blktraceDataType4 = {
    "1-2": number,
    "3-4": number,
    "5-6": number,
    "7-8": number,
    "9-10": number,
    "11-12": number,
    ">12": number
}

export type blktraceType = [
    {
        diagram: string,
        data: blktraceDataType1
    },
    {
        diagram: string,
        data: blktraceDataType2
    },
    {
        diagram: string,
        data: blktraceDataType3
    },
    {
        diagram: string,
        data: blktraceDataType4
    }
]