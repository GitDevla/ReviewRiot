import { GenreModel } from '@/model/GenreModel'
import React, { ChangeEvent, useEffect, useState } from 'react'

function GenreSelector({ onValueChange }: { onValueChange: Function }) {
    const [genres, setGenres] = useState([] as GenreModel[])

    useEffect(() => {
        async function fetchGenres() {
            const response = await fetch(`/api/genre`);
            const data = await response.json();
            setGenres(data.genres);
        }
        fetchGenres();
    }, [])

    function handleChange(e: ChangeEvent<HTMLSelectElement>) {
        onValueChange(genres[parseInt(e.target.value)])
    }

    return (
        <select onChange={handleChange}>
            {genres.map((i, index) => <option key={i.id} value={index}>{i.name}</option>)}
        </select>
    )
}

export default GenreSelector