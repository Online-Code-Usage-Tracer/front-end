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