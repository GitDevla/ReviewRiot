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
        console.log("run once");

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    async function fetchMovies() {
        setLoading(true);
        const response = await fetch(`/api/movie?page=${page.current}&max=20&order=name`);
        const data = await response.json();
        setMovies((prevMovies) => [...prevMovies, ...(data.movies)]);
        setLoading(false);
        flag.current = true;
        page.current += 1;
    }

    function handleScroll() {

        if (
            window.innerHeight + document.documentElement.scrollTop > document.documentElement.offsetHeight - 100
        ) {

            if (flag.current && !loading) {
                flag.current = false;
                fetchMovies();
            }
        }
    }

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {movies.map((movie) => (
                <div key={movie.id}>
                    <img src={"/movie/" + movie.imagePath} alt="" width="250px" />
                    <p>{movie.name}</p>
                </div>
            ))
            }
            {loading && <div>Loading...</div>}
        </div >
    );
}

export default movies