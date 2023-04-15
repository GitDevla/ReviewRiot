import { MovieModel } from '@/model/MovieModel';
import { ExpectedError, HTTPError } from '@/util/Errors';
import { Fetch } from '@/util/frontend/Fetch';
import React, { ChangeEvent, useEffect, useRef } from 'react'
import { useState } from 'react'
import StarRating from '../input/StarRating';
import style from "@/styles/feedCard.module.scss"
import styleList from "@/styles/prettyList.module.scss"

function ReviewForm({ onSubmit = () => { } }) {
    const [rating, setRating] = useState(0)
    const [description, setDescription] = useState(null as string | null)
    const [errorMessage, setErrorMessage] = useState('');
    const [movies, setMovies] = useState([] as MovieModel[]);
    const selectedMovieId = useRef(0 as number);
    const selectorDOM = useRef(null as HTMLSelectElement | null);

    useEffect(() => {
        async function fetchAllMovies() {
            const response = await fetch(`/api/movie?onlyName=true`);
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
                response = await Fetch.POST('/api/review', { movieID: selectedMovieId.current, rating, description })
            else
                response = await Fetch.POST('/api/review', { movieID: selectedMovieId.current, rating })

            if (!response.ok)
                throw new ExpectedError((await response.json()).error);
            setErrorMessage("");
            setRating(0);
            setDescription("");
            selectedMovieId.current = 0;
            selectorDOM.current!.selectedIndex = 0
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
            <select defaultValue="" className={styleList.select} ref={selectorDOM} style={{ border: "1px solid var(--fg)" }} onChange={handleOptionSelect} required>
                <option disabled value="">--- Válasszon egy filmet ---</option>
                {movies.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
            </select><br />
            <label>Értékelés:</label><StarRating value={rating} readOnly={false} onClick={e => setRating(e)} /> <br />
            <textarea placeholder='Vélemény (nem kötelező)' minLength={16} maxLength={255} value={description ?? ""} onChange={(e) => setDescription(e.target.value)} />
            <br />
            <input type="submit" value="Értékelés" />
            {errorMessage && <span className='error'>{errorMessage}</span>}
        </form >
    )
}

export default ReviewForm
