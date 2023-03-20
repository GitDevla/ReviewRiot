import { BadRequestError } from "@/util/Errors";
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


const size1mb = 1 * 1024 * 1024;
export const validateMovieCoverPhoto = (img: any) => {
    if (!img.headers["content-type"].startsWith("image"))
        throw new BadRequestError("Megadott file nem kép")
    if (img.size > size1mb)
        throw new BadRequestError("Megadott kép nagyobb mint 1mb")
}