import { GenreModel } from '@/model/GenreModel'
import { MovieModel } from '@/model/MovieModel'
import Router from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import GenreSelector from '../input/GenreSelector'
import style from "@/styles/editForm.module.scss"
import { validateMovieName, validateMovieRelease } from '@/validator/movieValidator'
import { Validate } from '@/validator/Validator'
import Bean from '../Bean'

function MovieEditForm({ movie }: { movie: MovieModel }) {
    const [genres, setGenres] = useState([] as GenreModel[])
    const [errorMessage, setErrorMessage] = useState('');
    const [previewPath, setPreviewPath] = useState(movie?.imagePath)

    const newName = useRef(null as string | null)
    const newImage = useRef(null as File | null);
    const newRelease = useRef(null as string | null);

    const fileInput = useRef(null as HTMLInputElement | null);

    useEffect(() => {
        setGenres(movie.genres);
    }, [movie])

    function handleGenreAdd(e: GenreModel) {
        if (genres.some(i => i.id == e.id)) return;
        setGenres([...genres, e])
    }

    function handleGenreRemove(e: number) {
        setGenres(genres.filter(i => i.id != e));
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        TestInput()
            .then(() => sendRequest())
            .catch(i => setErrorMessage(i.message));
    }

    async function TestInput() {
        if (newName.current)
            validateMovieName(newName.current!)

        if (newRelease.current)
            validateMovieRelease(newRelease.current!)

        if (newImage.current)
            Validate(newImage.current).fileSizeMax(1 * 1024 * 1024, "Megadott kép nagyobb mint 1mb");
    }

    const sendRequest = async () => {
        const body = new FormData();
        if (newImage.current) {
            body.append("file", newImage.current);
        }

        if (!genres.length) body.append("genres", "0")

        genres.forEach(i => {
            body.append("genres", i.id.toString())
        });

        if (newRelease.current) {
            body.append("release", newRelease.current);
        }
        if (newName.current) {
            body.append("name", newName.current);
        }
        const res = await fetch(`/api/movie/${movie.id}/update`, {
            method: "PUT",
            body
        });
        if (!res.ok) throw new Error((await res.json()).error)
        Router.reload();
    };

    async function setImage(file: File) {
        if (!file) return;
        const objectUrl = URL.createObjectURL(file)
        setPreviewPath(objectUrl);
        newImage.current = file;
    }

    return (
        <form className={style.form} onSubmit={handleSubmit} encType="multipart/form-data">
            <div style={{ float: "right", width: "18%", aspectRatio: "640/880" }}>
                <label>Boritókép</label><br />
                <div className={style.image_change} onClick={() => fileInput.current?.click()}>
                    <div className={style.hover_inside}>
                        <label>Kép feltötése</label>
                        <input type="file" ref={fileInput} accept="image/*" onChange={i => setImage(i.target.files![0])} hidden />
                    </div>
                    <img src={previewPath} width={640} height={880} />
                </div>
            </div>
            <div>
                <label>Név: </label><br />
                <input type="text" placeholder='Film név' required defaultValue={movie?.name} onChange={i => newName.current = i.target.value} />
            </div>
            <div>
                <label>Kiadási dátum: </label><br />
                <input type="number" min={1900} max={new Date().getFullYear() + 2} required placeholder='Kiadási dátum' defaultValue={movie?.release.toString()} onChange={i => newRelease.current = i.target.value} />
            </div>
            <div>
                <label>Műfajok: </label><br />
                <GenreSelector onValueChange={handleGenreAdd} /><br />
                {genres.map(i => <Bean onClick={() => handleGenreRemove(i.id)} key={i.id}>Műfaj: {i.name} ❌</Bean>)}
            </div>

            {errorMessage && <p className='error'>{errorMessage}</p>}
            <input type="submit" value="Mentés" />
        </form >
    )
}

export default MovieEditForm