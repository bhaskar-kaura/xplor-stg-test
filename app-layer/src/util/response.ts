export const getResponse=(success: boolean, message: string, data?: any, error?: any) =>{
    return {
        success: success,
        message: message,
        data: data,
        error: error
    }
}