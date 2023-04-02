import MovieCard from '@/component/card/MovieCard';
import { GenreModel } from '@/model/GenreModel';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import Layout from '@/component/Layout';
import Title from '@/component/Title';
import GenreSelector from '@/component/GenreSelector';
import RateLimitedInput from '@/component/RateLimitedInput';
import { MovieWithDataModel } from '@/interface/MovieWithData';

function MoviesPage() {
    const [movies, setMovies] = useState([] as MovieWithDataModel[]);
    const [loading, setLoading] = useState(false);
    const [genres, setGenres] = useState([] as GenreModel[])
    const page = useRef(0);
    const flag = useRef(true);

    const sort = useRef("name");
    const filterName = useRef("");
    const filterGenre = useRef([] as GenreModel[]);



    useEffect(() => {
        fetchMovies();
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    async function fetchMovies() {
        setLoading(true);
        const genreFilter = filterGenre.current.map(i => i.id);
        const response = await fetch(`/api/movie?page=${page.current}&max=30&order=${sort.current}&filterName=${filterName.current}&filterGenres=${genreFilter}`);
        const data = await response.json();
        if (data.movies.length < 30) window.removeEventListener('scroll', handleScroll);
        setMovies((prevMovies) => [...prevMovies, ...(data.movies)]);
        setLoading(false);
        flag.current = true;
        page.current += 1;
    }

    function handleScroll() {
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
        filterGenre.current = [...genres, e];
        setGenres(filterGenre.current);
        handleFilterChange();
    }

    function handleGenreRemove(e: number) {
        filterGenre.current = genres.filter(i => i.id != e);
        setGenres(filterGenre.current);
        handleFilterChange()
    }

    return (
        <Layout>
            <Title>Filmek</Title>
            <div>
                <div style={{ marginBottom: "30px", display: "flex", justifyContent: "space-evenly" }}>
                    <span>
                        <label>Rendezés:</label><br />
                        <select name="sort" onChange={handleSortChange}>
                            <option value="name" defaultChecked>Név növekvő</option>
                            <option value="dname">Név csökkenő</option>
                            <option value="new">Új</option>
                            <option value="old">Régi</option>
                            <option value="top">Népszerűek</option>
                            <option value="hot">Felkapottak</option>
                        </select>
                    </span>
                    <span>
                        <label>Név:</label><br />
                        <RateLimitedInput value={filterName} timeout={300} onChange={handleFilterChange} />
                    </span>
                    <span>
                        <label>Műfajok: </label><br />
                        <GenreSelector onValueChange={handleGenreAdd} />
                    </span>
                </div>
                <div>
                    {genres.map(i => <div className={"genreTag"} key={i.id}>{i.name}<button onClick={() => handleGenreRemove(i.id)}>X</button></div>)}
                </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(175px, 1fr ))', gap: "30px", justifyContent: "space-evenly" }}>
                {movies.map(i => <MovieCard key={i.id} movie={i} />)}
                {loading && <div>Loading...</div>}
            </div >
        </Layout>

    );
}

export default MoviesPage