const APP_NAME = `ttravel`

export const addLocalStorageItem = (name: string, value: string):void => {
    localStorage.setItem(`${APP_NAME}-${name}`, value);
};

export const removeLocalStorageItem =(name: string):void => {
    localStorage.removeItem(`${APP_NAME}-${name}`);
};

export const getLocalStorageItem = (name: string): string => {
    const result = localStorage.getItem(`${APP_NAME}-${name}`);
    if (result) return result;
    else return '';
};

export const addLocalStorageJSON = (name: string, data: any) => {
    localStorage.setItem(`${APP_NAME}-${name}`, JSON.stringify(data));
};

export const getLocalStorageJSON = (name: string) => {
    const data: any = localStorage.getItem(`${APP_NAME}-${name}`);
    return JSON.parse(data);
};

export const getCamelCase = (name: string): string => {
    return `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
}