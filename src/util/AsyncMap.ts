export const AsyncMap = async (array: any[], fun: any): Promise<any[]> => {
    return Promise.all(array.map(fun));
}