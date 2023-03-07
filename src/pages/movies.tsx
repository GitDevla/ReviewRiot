import movieCard from '@/component/movieCard';
import { MovieModel } from '@/model/MovieModel';
import React, { useEffect, useRef, useState } from 'react'

function movies() {
    const [movies, setMovies] = useState([] as MovieModel[]);
    const [loading, setLoading] = useState(false);
    const page = useRef(0);
    const flag = useRef(true);

    useEffect(() => {
        fetchMovies();
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    async function fetchMovies() {
        setLoading(true);
        const response = await fetch(`/api/movie?page=${page.current}&max=20&order=dname`);
        const data = await response.json();
        setMovies((prevMovies) => [...prevMovies, ...(data.movies)]);
        setLoading(false);
        flag.current = true;
        page.current += 1;
    }

    function handleScroll() {
        const offset = 300;
        if (
            window.innerHeight + document.documentElement.scrollTop > document.documentElement.offsetHeight - offset
        ) {
            if (flag.current && !loading) {
                flag.current = false;
                fetchMovies();
            }
        }
    }

    return (<div>
        <div>

        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: "10px" }}>
            {movies.map((movie) => movieCard(movie))}
            {loading && <div>Loading...</div>}
        </div >
    </div>

    );
}

export default movies