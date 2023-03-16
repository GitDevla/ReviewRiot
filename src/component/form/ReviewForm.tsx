import { MovieModel } from '@/model/MovieModel';
import { ExpectedError, HTTPError } from '@/util/Errors';
import { Fetch } from '@/util/frontend/Fetch';
import React, { ChangeEvent, useEffect, useRef } from 'react'
import { useState } from 'react'

function ReviewForm() {
    const [rating, setRating] = useState(0)
    const [description, setDescription] = useState('')
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
            const response = await Fetch.POST('/api/review', { movieID: selectedMovieId.current, rating, description, isPublic: true })
            if (!response.ok)
                throw new ExpectedError((await response.json()).error);
            setErrorMessage("");
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
        <form onSubmit={handleSubmit}>
            <select name="" id="" onChange={handleOptionSelect} required>
                {movies.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
            </select>
            <input type="range" min={0} max={10} value={rating} onChange={e => setRating(parseInt(e.target.value))} />
            <label>{rating}/10</label>
            <textarea placeholder='Vélemény' value={description} onChange={(e) => setDescription(e.target.value)} />
            <input type="submit" value="Értékelés" />
            {errorMessage && <p className='error'>{errorMessage}</p>}
        </form >
    )
}

export default ReviewForm
