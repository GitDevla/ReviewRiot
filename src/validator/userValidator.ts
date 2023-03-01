import { Validate } from "@/validator/Validator"

interface IUserCreateBody {
    username: string,
    password: string,
    email: string
}

export const validateUserRegister = ({ username, email, password }: IUserCreateBody) => {
    validateAuthBody({ username, password });
    Validate(username)
        .lengthBetween(6, 32, "Felhasználónév (username) hosszának 6 és 32 között kell lennie")
    Validate(password)
        .lengthBetween(8, 55, "Jelszó (password) hosszának 8 és 55 között kell lennie")
    Validate(email)
        .required("Email (email) kötelező")
        .email("Email (email) nem email")
}

interface IAuthBody {
    username: string;
    password: string;
}

export const validateAuthBody = ({ username, password }: IAuthBody) => {
    Validate(username)
        .required("Felhasználónév (username) kötelező")
        .string("Felhasználónévnek (username) szöveg típúsúnak kell lennie")
    Validate(password)
        .required("Jelszó (password) kötelező")
        .string("Jelszó (password) szöveg típúsúnak kell lennie")
}

interface IFollowPostBody {
    whom: string,
}

export const followValidator = ({ whom }: IFollowPostBody) => {
    Validate(whom)
        .required("Felhasználó azonósitó (whom) kötelező")
        .number("Felhasználó azonósitó (whom) szám típusúnak kell lennie")
        .min(1, "Felhasználó azonósitó (whom) nem lehet kisseb mint 1");
}