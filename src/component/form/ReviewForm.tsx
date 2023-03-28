import { MovieModel } from '@/model/MovieModel';
import { ExpectedError, HTTPError } from '@/util/Errors';
import { Fetch } from '@/util/frontend/Fetch';
import React, { ChangeEvent, useEffect, useRef } from 'react'
import { useState } from 'react'
import StarRating from '../StarRating';
import style from "@/styles/feedCard.module.scss"

function ReviewForm({ onSubmit = () => { } }) {
    const [rating, setRating] = useState(0)
    const [description, setDescription] = useState(null as string | null)
    const [errorMessage, setErrorMessage] = useState('');
    const [movies, setMovies] = useState([] as MovieModel[]);
    const selectedMovieId = useRef(0 as number);

    useEffect(() => {
        async function fetchAllMovies() {
            const response = await fetch(`/api/movie?page=0&max=-1&order=name`);
            const data = await response.json();
            setMovies(data.movies);
        }
        fetchAllMovies();
    }, [])


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            let response;
            if (description)
                response = await Fetch.POST('/api/review', { movieID: selectedMovieId.current, rating, description, isPublic: true })
            else
                response = await Fetch.POST('/api/review', { movieID: selectedMovieId.current, rating, isPublic: true })

            if (!response.ok)
                throw new ExpectedError((await response.json()).error);
            setErrorMessage("");
            setRating(0);
            setDescription("");
            selectedMovieId.current = 0;
            onSubmit();
        } catch (error) {
            if (error instanceof ExpectedError || error instanceof HTTPError)
                setErrorMessage(error.message);
            else
                setErrorMessage('Ismeretlen hiba történt');
        }
    };

    async function handleOptionSelect(e: ChangeEvent<HTMLSelectElement>) {
        selectedMovieId.current = parseInt(e.target.value);
    }

    return (
        <form className={style.card} onSubmit={handleSubmit}>
            <label>Ezt a filmet láttam: </label>
            <select onChange={handleOptionSelect} required>
                <option disabled selected>--- Válasszon egy filmet ---</option>
                {movies.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
            </select><br />
            <label>Értékelés:</label><StarRating value={rating} readOnly={false} onClick={e => setRating(e)} /> <br />
            <textarea placeholder='Vélemény (nem kötelező)' value={description!} onChange={(e) => setDescription(e.target.value)} />
            <br />
            <input type="submit" value="Értékelés" />
            {errorMessage && <span className='error'>{errorMessage}</span>}
        </form >
    )
}

export default ReviewForm
