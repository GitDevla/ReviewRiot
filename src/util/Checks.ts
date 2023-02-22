export const isEmptyString = (s: string): boolean => {
    return !s || s.trim() == "";
}

export const lengthBetween = (s: string, min: number, max: number): boolean => {
    return s.length <= max && s.length >= min;
}

export const validateEmail = (email: string) => {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
};

export const validateDate = (date: string) => {
    return new Date(date).toDateString() != "Invalid Date";
}