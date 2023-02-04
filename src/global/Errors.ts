import {AxiosResponse} from "axios";
import {enqueueSnackbar} from "notistack";

export function onAxiosSuccess({
                                   res,
                                   myError,
                                   onSuccess,
                                   onError,
                                   onSuccessReturnValue,
                                   onErrorReturnValue
                               }: {
    res: AxiosResponse, myError?: string,
    onSuccess?: () => void, onError?: () => void, onSuccessReturnValue?: any, onErrorReturnValue?: any
}) {

    if (res.status === 200) {
        if (onSuccess)
            onSuccess()

        return onSuccessReturnValue
    } else
        return onAxiosError({
            axiosError: res,
            myError: myError,
            onError: onError,
            onErrorReturnValue: onErrorReturnValue
        });
}

export function onAxiosError({
                                 axiosError,
                                 myError,
                                 onError,
                                 onErrorReturnValue
                             }: { axiosError: any, myError?: string, onError?: () => void, onErrorReturnValue?: any }) {
    console.log('axiosError:')
    console.log(axiosError)
    console.log('axiosError.response:')
    console.log(axiosError.response)

    if (!axiosError.response || !axiosError.response.data)
        enqueueSnackbar('خطا در ارتباط با سرور', {variant: 'error'})
    else
        enqueueSnackbar(axiosError.response.data.userMessage, {variant: 'error'})

    return onMyError({
        myError: myError,
        onError: onError,
        onErrorReturnValue: onErrorReturnValue
    })
}

export function onMyError({
                              myError,
                              onError,
                              onErrorReturnValue
                          }: { myError?: string, onError?: () => void, onErrorReturnValue?: any }) {
    if (myError)
        enqueueSnackbar(myError, {variant: 'error'})

    if (onError)
        onError()

    return onErrorReturnValue
}

export function onInfo(information: string) {
    enqueueSnackbar(information, {variant: 'info'})
}

export function onS(information: string) {
    enqueueSnackbar(information, {variant: 'success'})
}