import MovieCard from '@/component/card/MovieCard';
import { GenreModel } from '@/model/GenreModel';
import { MovieModel } from '@/model/MovieModel';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import Layout from '@/component/Layout';
import Title from '@/component/Title';

function MoviesPage() {
    const [movies, setMovies] = useState([] as MovieModel[]);
    const [genres, setGenres] = useState([] as GenreModel[]);
    const [loading, setLoading] = useState(false);
    const sort = useRef("name");
    const page = useRef(0);
    const flag = useRef(true);

    useEffect(() => {
        fetchMovies();
        fetchGenres();
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    async function fetchGenres() {
        const response = await fetch(`/api/genre`);
        const data = await response.json();
        setGenres(data.genres);
    }

    async function fetchMovies() {
        setLoading(true);
        const response = await fetch(`/api/movie?page=${page.current}&max=30&order=${sort.current}`);
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

    async function handleSortChange(e: ChangeEvent<HTMLSelectElement>) {
        sort.current = e.target.value
        setMovies([]);
        page.current = 0;
        fetchMovies();
    }

    return (
        <Layout>
            <Title>Filmek</Title>
            <div>
                <div>
                    <label>Rendezés:</label>
                    <select name="sort" onChange={handleSortChange}>
                        <option value="name" defaultChecked>Név növekvő</option>
                        <option value="dname">Név csökkenő</option>
                        <option value="new">Új</option>
                        <option value="old">Régi</option>
                        <option value="top">Népszerűek</option>
                        <option value="hot">Felkapottak</option>
                    </select>
                </div>
                <div>
                    <label>Név:</label>
                    <input type="text" />
                </div>
                <div>
                    <label>Műfaj:</label>
                    <select name="genre" id="">
                        <option value="0" defaultChecked></option>
                        {genres.map(i =>
                            <option key={i.id} value={i.id}>{i.name}</option>
                        )}
                    </select>
                </div>
                <div>
                    <label>Név:</label>
                    <input type="range" min={Math.min(...movies.flatMap(i => (i.release) as any))} max={Math.max(...movies.flatMap(i => (i.release) as any))} name="" id="" />
                </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 2fr))', gap: "30px" }}>
                {movies.map(i => <MovieCard key={i.id} movie={i} />)}
                {loading && <div>Loading...</div>}
            </div >
        </Layout>

    );
}

export default MoviesPage