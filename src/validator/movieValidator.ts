import { Validate } from "./Validator";

interface IMovieCreateBody {
    name: string,
    date: string
}

export const validateMovieCreate = ({ name, date }: IMovieCreateBody) => {
    Validate(name)
        .required("Felhasználónév (name) kötelező")
        .string("Felhasználónévnek (name) szöveg tipúsúnak kell lennie")
        .notEmpty("Felhasználónév (name) nem lehet üres");
    Validate(date)
        .required("Dátum (date) kötelező")
        .date("Dátum (date) nem valódi");
}