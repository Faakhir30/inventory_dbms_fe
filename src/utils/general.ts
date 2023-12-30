export const isSuccessful = (status: number) => {
    return status>=200 && status<400
}