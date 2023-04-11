import { MovieModel } from '@/model/MovieModel';
import { ExpectedError, HTTPError } from '@/util/Errors';
import { Fetch } from '@/util/frontend/Fetch';
import React from 'react'
import { useState } from 'react'
import StarRating from '../input/StarRating';
import style from "@/styles/feedCard.module.scss"

function ReviewFormForMovie({ onSubmit = () => { }, movie }: { onSubmit: Function, movie: MovieModel }) {
    const [rating, setRating] = useState(0)
    const [description, setDescription] = useState(null as string | null)
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            let response;
            if (description)
                response = await Fetch.POST('/api/review', { movieID: movie.id, rating, description })
            else
                response = await Fetch.POST('/api/review', { movieID: movie.id, rating })

            if (!response.ok)
                throw new ExpectedError((await response.json()).error);
            setErrorMessage("");
            setRating(0);
            setDescription("");
            onSubmit();
        } catch (error) {
            if (error instanceof ExpectedError || error instanceof HTTPError)
                setErrorMessage(error.message);
            else
                setErrorMessage('Ismeretlen hiba történt');
        }
    };

    return (
        <form className={style.card} onSubmit={handleSubmit}>
            <label>Értékelés:</label><StarRating value={rating} readOnly={false} onClick={e => setRating(e)} /> <br />
            <textarea placeholder='Vélemény (nem kötelező)' value={description! ?? ""} onChange={(e) => setDescription(e.target.value)} />
            <br />
            <input type="submit" value="Értékelés" />
            {errorMessage && <span className='error'>{errorMessage}</span>}
        </form >
    )
}

export default ReviewFormForMovie