import { Validate } from "./Validator";

interface IMovieCreateBody {
    name: string,
    date: string
}

export const validateMovieCreate = ({ name, date }: IMovieCreateBody) => {
    validateMovieName(name);
    validateMovieRelease(date);
}

export const validateMovieName = (name: string) => Validate(name)
    .required("Felhasználónév (name) kötelező")
    .string("Felhasználónévnek (name) szöveg tipúsúnak kell lennie")
    .notEmpty("Felhasználónév (name) nem lehet üres");

export const validateMovieRelease = (release: string) => Validate(release)
    .required("Dátum (date) kötelező")
    .date("Dátum (date) nem valódi");