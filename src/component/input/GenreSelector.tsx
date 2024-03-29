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
        e.target.selectedIndex = 0;
    }

    return (
        <select onChange={handleChange} defaultValue={-1}>
            <option disabled value={-1} >--- Válasszon egy műfajt ---</option>
            {genres.map((i, index) => <option key={i.id} value={index}>{i.name}</option>)}
        </select>
    )
}

export default GenreSelector