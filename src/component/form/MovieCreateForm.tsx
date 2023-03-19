import { GenreModel } from '@/model/GenreModel'
import { ExpectedError } from '@/util/Errors';
import { Fetch } from '@/util/frontend/Fetch';
import Router from 'next/router';
import React, { useRef, useState } from 'react'
import GenreSelector from '../GenreSelector'

function MovieCreateForm() {
    const [genres, setGenres] = useState([] as GenreModel[])
    const [errorMessage, setErrorMessage] = useState('');
    const [previewPath, setPreviewPath] = useState("/image/movie/default.jpg")

    const newName = useRef(null as string | null)
    const newImage = useRef(null as File | null);
    const newRelease = useRef(null as string | null);


    function handleGenreAdd(e: GenreModel) {
        setGenres([...genres, e])
    }

    function handleGenreRemove(e: number) {
        setGenres(genres.filter(i => i.id != e));
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        sendRequest().catch(i =>
            setErrorMessage(i.message));
    }

    const sendRequest = async () => {
        const res = await Fetch.POST("/api/movie",
            {
                name: newName.current,
                date: newRelease.current
            }
        )
        const json = await res.json();
        if (!res.ok) throw new ExpectedError(json.error);
        const body = new FormData();
        if (newImage.current) {
            body.append("file", newImage.current);
        }
        genres.forEach(i => {
            body.append("genres", i.id.toString())
        });

        await fetch(`/api/movie/${json.id}/update`, {
            method: "PUT",
            body
        });
        Router.push("/settings");

    };

    async function setImage(file: File) {
        const objectUrl = URL.createObjectURL(file)
        setPreviewPath(objectUrl);
        newImage.current = file;
    }

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div>
                <label>Név: </label>
                <input type="text" placeholder='Film név' onChange={i => newName.current = i.target.value} />
            </div>
            <div>
                <label>Kiadási dátum: </label>
                <input type="number" min={1900} max={new Date().getFullYear() + 2} placeholder='Kiadási dátum' onChange={i => newRelease.current = i.target.value} />
            </div>
            <div>
                <label>Műfajok: </label>
                <GenreSelector onValueChange={handleGenreAdd} />
                {genres.map(i => <div className={"genreTag"} key={i.id}>{i.name}<button onClick={() => handleGenreRemove(i.id)}>X</button></div>)}
            </div>
            <div>
                <label>Boritókép: </label>
                <input type="file" accept="image/*" onChange={i => setImage(i.target.files![0])} /><br />
                <img src={previewPath} width={320} height={440} />
            </div>
            {errorMessage && <p className='error'>{errorMessage}</p>}
            <input type="submit" value="Mentés" />
        </form>
    )
}

export default MovieCreateForm