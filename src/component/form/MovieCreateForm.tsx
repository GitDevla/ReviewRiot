import { GenreModel } from '@/model/GenreModel'
import { ExpectedError } from '@/util/Errors';
import { Fetch } from '@/util/frontend/Fetch';
import { validateMovieName, validateMovieRelease } from '@/validator/movieValidator';
import { Validate } from '@/validator/Validator';
import Router from 'next/router';
import React, { useRef, useState } from 'react'
import GenreSelector from '../input/GenreSelector'
import style from "@/styles/editForm.module.scss"
import Bean from '../Bean';
import router from 'next/router';


function MovieCreateForm() {
    const [genres, setGenres] = useState([] as GenreModel[])
    const [errorMessage, setErrorMessage] = useState('');
    const [previewPath, setPreviewPath] = useState("/image/movie/default.jpg")

    const newName = useRef(null as string | null)
    const newImage = useRef(null as File | null);
    const newRelease = useRef(null as string | null);
    const fileInput = useRef(null as HTMLInputElement | null);


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
            Validate(newImage.current).fileSizeMax(2 * 1024 * 1024, "A kép túl nagy, 1 megabájt alatt legyen, jelenlegi méret: " + Math.round(newImage.current.size / 1024 / 1024 * 10) / 10 + "Mb");
    }

    const sendRequest = async () => {
        let res = await Fetch.POST("/api/movie",
            {
                name: newName.current,
                date: newRelease.current
            }
        )
        let json = await res.json();
        if (!res.ok) throw new ExpectedError(json.error);
        let newId = json.id;
        const body = new FormData();
        if (newImage.current) {
            body.append("file", newImage.current);
        }
        genres.forEach(i => {
            body.append("genres", i.id.toString())
        });

        res = await fetch(`/api/movie/${newId}/update`, {
            method: "PUT",
            body
        });
        json = await res.json();
        if (!res.ok) throw new ExpectedError(json.error);

        Router.push("/settings/movies/" + newId);
    };

    async function setImage(file: File) {
        const objectUrl = URL.createObjectURL(file)
        setPreviewPath(objectUrl);
        newImage.current = file;
    }

    return (
        <form className={style.form} onSubmit={handleSubmit} encType="multipart/form-data">
            <div className='image_change movieCover'>
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
                <input type="text" placeholder='Film név' required onChange={i => newName.current = i.target.value} />
            </div>
            <div>
                <label>Kiadási dátum: </label><br />
                <input type="number" min={1900} required max={new Date().getFullYear() + 2} placeholder='Kiadási dátum' onChange={i => newRelease.current = i.target.value} />
            </div>
            <div>
                <label>Műfajok: </label><br />
                <GenreSelector onValueChange={handleGenreAdd} /><br />
                {genres.map(i => <Bean onClick={() => handleGenreRemove(i.id)} key={i.id}>Műfaj: {i.name} ❌</Bean>)}
            </div>
            {errorMessage && <p className='error'>{errorMessage}</p>}
            <input type="submit" value="Mentés" />
            <input type="reset" onClick={() => router.back()} value="Mégse" />
        </form>
    )
}

export default MovieCreateForm