import MovieCard from '@/component/card/MovieCard';
import { GenreModel } from '@/model/GenreModel';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import Layout from '@/component/Layout';
import Title from '@/component/Title';
import GenreSelector from '@/component/input/GenreSelector';
import RateLimitedInput from '@/component/input/RateLimitedInput';
import { MovieWithDataModel } from '@/interface/MovieWithData';
import style from "@/styles/prettyList.module.scss";
import Bean from '@/component/Bean';
import { Fetch } from '@/util/frontend/Fetch';

function MoviesPage() {
    const [movies, setMovies] = useState([] as MovieWithDataModel[]);
    const [loading, setLoading] = useState(false);
    const [genres, setGenres] = useState([] as GenreModel[])
    const page = useRef(0);
    const flag = useRef(true);

    const sort = useRef("name");
    const filterName = useRef("");
    const filterGenre = useRef([] as GenreModel[]);
    let maxPerPage = useRef(0)

    useEffect(() => {
        function optimalPerPage() {
            const width = document.getElementsByClassName("content")[0].clientWidth;
            const height = window.innerHeight;
            const max = width * 0.15;
            const min = 150;
            const cardwidth = (max < min ? min : max) + 30;
            const cardHeight = cardwidth / 640 * 880;
            const perRow = width / cardwidth;
            const perCol = height / cardHeight;
            return Math.floor(perRow * perCol);
        }
        maxPerPage.current = optimalPerPage();
        fetchMovies()
        window.addEventListener('scroll', handleScrollMovie);

        return () => {
            window.removeEventListener('scroll', handleScrollMovie);
        };
    }, []);


    async function fetchMovies() {
        setLoading(true);
        const genreFilter = filterGenre.current.map(i => i.id);
        const response = await Fetch.GET(`/api/movie?page=${page.current}&max=${maxPerPage.current}&order=${sort.current}&filterName=${filterName.current}&filterGenres=${genreFilter}`);
        const data = await response.json();
        if (data.movies.length < maxPerPage.current) window.removeEventListener('scroll', handleScrollMovie);
        setMovies((prevMovies) => [...prevMovies, ...(data.movies)]);
        setLoading(false);
        flag.current = true;
        page.current += 1;
    }

    function handleScrollMovie() {
        const offset = 900;

        if (
            window.innerHeight + document.documentElement.scrollTop > document.documentElement.offsetHeight - offset
        ) {
            if (flag.current && !loading) {
                flag.current = false;
                fetchMovies();
            }
        }
    }

    async function handleFilterChange() {
        setMovies([]);
        page.current = 0;
        fetchMovies();
    }

    async function handleSortChange(e: ChangeEvent<HTMLSelectElement>) {
        sort.current = e.target.value
        handleFilterChange();
    }

    function handleGenreAdd(e: GenreModel) {
        if (genres.some(i => i.id == e.id)) return;
        filterGenre.current = [...genres, e];
        setGenres(filterGenre.current);
        handleFilterChange();
    }

    function handleGenreRemove(e: number) {
        filterGenre.current = genres.filter(i => i.id != e);
        setGenres(filterGenre.current);
        handleFilterChange()
    }

    function handleNameRemove() {
        filterName.current = "";
        handleFilterChange()
    }

    return (
        <Layout>
            <Title>Filmek</Title>
            <div>
                <div className='grid grid-col-3'>
                    <span className={style.filter}>
                        <label>Rendezés</label><br />
                        <select name="sort" onChange={handleSortChange}>
                            <option value="name" defaultChecked>Név növekvő</option>
                            <option value="dname">Név csökkenő</option>
                            <option value="new">Új</option>
                            <option value="old">Régi</option>
                            <option value="top">Népszerűek</option>
                            <option value="hot">Felkapottak</option>
                        </select>
                    </span>
                    <span className={style.filter}>
                        <label>Név</label><br />
                        <RateLimitedInput value={filterName} timeout={300} onChange={handleFilterChange} />
                    </span>
                    <span className={style.filter}>
                        <label>Műfajok </label><br />
                        <GenreSelector onValueChange={handleGenreAdd} />
                    </span>
                </div>
                <div style={{ minHeight: "2.5rem" }}>
                    <span>Filterek:</span>
                    {(!genres.length && !filterName.current) && "Nincs"}
                    {genres.map(i => <Bean onClick={() => handleGenreRemove(i.id)} key={i.id}>Műfaj: {i.name} ❌</Bean>)}
                    {filterName.current && <Bean onClick={() => handleNameRemove()}>Név: {filterName.current} ❌</Bean>}
                </div>
            </div>
            <div className='movie_grid'>
                {movies.map(i => <MovieCard key={i.id} movie={i} />)}
                {loading && <div>Loading...</div>}
            </div >
        </Layout>

    );
}

export default MoviesPage