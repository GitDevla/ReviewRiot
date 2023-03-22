import MovieCard from '@/component/card/MovieCard';
import { GenreModel } from '@/model/GenreModel';
import { MovieModel } from '@/model/MovieModel';
import React, { useEffect, useRef, useState } from 'react'
import Layout from '@/component/Layout';
import Title from '@/component/Title';

function MoviesPage() {
    const [movies, setMovies] = useState([] as MovieModel[]);
    const [genres, setGenres] = useState([] as GenreModel[]);
    const [loading, setLoading] = useState(false);
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
        const response = await fetch(`/api/movie?page=${page.current}&max=30&order=dname`);
        const data = await response.json();
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

    return (
        <Layout>
            <Title>Filmek</Title>
            <div>
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
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: "30px" }}>
                {movies.map(i => <MovieCard key={i.id} movie={i} />)}
                {loading && <div>Loading...</div>}
            </div >
        </Layout>

    );
}

export default MoviesPage