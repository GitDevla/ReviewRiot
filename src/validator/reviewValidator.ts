import { Validate } from "./Validator";

interface IReviewCreateBody {
    movieID: string,
    rating: string,
    isPublic: string,
    description: string
}

export const validateReviewCreate = ({ movieID, rating, isPublic, description }: IReviewCreateBody) => {
    Validate(movieID)
        .required("Film azonósitó (movieID) kötelező")
        .number("Film azonósitó (movieID) szám típusunak kell lenni")
        .min(1, "Film azonósitó (movieID) nem lehet kisseb mint 1");
    Validate(rating)
        .required("Értékelés (rating) kötelező")
        .number("Értékelésnek (rating) szám típusunak kell lenni")
        .valueBetween(0, 10, "Értékelésnek (rating) 0 és 10 között kell lennie");
    Validate(isPublic)
        .required("Nyilvános (isPublic) kötelező")
        .bool("Nyilvános (isPublic) logikai érték típúsunak kell lennie");
    Validate(description)
        .nonRequired()?.string("Leírás (description) szöveg típusunak kell lennie")
        .lengthBetween(16, 255, "Leírás (description) hosszának 16 és 255 között kell lennie");
}