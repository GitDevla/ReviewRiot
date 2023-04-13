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
    .required("Film név (name) kötelező")
    .string("Film névnek (name) szöveg tipúsúnak kell lennie")
    .notEmpty("Film név (name) nem lehet üres");

export const validateMovieRelease = (release: string) => Validate(release)
    .required("Dátum (date) kötelező")
    .date("Dátum (date) nem valódi");


const size2mb = 2 * 1024 * 1024;
export const validateMovieCoverPhoto = (img: any) => Validate(img)
    .image("Megadott file nem kép")
    .fileSizeMax(size2mb, "Megadott kép nagyobb mint 2mb");