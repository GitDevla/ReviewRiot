import { Validate } from "@/validator/Validator"

interface IUserCreateBody {
    username: string,
    password: string,
    email: string
}

export const validateUserRegister = ({ username, email, password }: IUserCreateBody) => {
    validateUsername(username);
    validatePassword(password);
    Validate(email)
        .required("Email (email) kötelező")
        .email("Email (email) nem email")
}

interface IAuthBody {
    username: string;
    password: string;
}

export const validateAuthBody = ({ username, password }: IAuthBody) => {
    validateUsername(username)
    validatePassword(password);
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

export const validateUsername = (username: string) =>
    Validate(username)
        .required("Felhasználónév (username) kötelező")
        .string("Felhasználónévnek (username) szöveg típúsúnak kell lennie")
        .lengthBetween(5, 32, "Felhasználónév (username) hosszának 5 és 32 között kell lennie")

export const validatePassword = (password: string) =>
    Validate(password)
        .required("Jelszó (password) kötelező")
        .string("Jelszó (password) szöveg típúsúnak kell lennie")
        .lengthBetween(8, 55, "Jelszó (password) hosszának 8 és 55 között kell lennie")


const size1mb = 1 * 1024 * 1024;
export const validateUserProfilePicture = (img: any) => Validate(img)
    .image("Megadott file nem kép")
    .fileSizeMax(size1mb, "Megadott kép nagyobb mint 1mb");