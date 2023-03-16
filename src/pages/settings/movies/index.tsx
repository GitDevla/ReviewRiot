import Layout from '@/component/Layout'
import SettingsNavbar from '@/component/SettingsNavbar'
import { MovieModel } from '@/model/MovieModel';
import { isAdmin } from '@/util/frontend/isAdmin';
import Link from 'next/link';
import router from 'next/router';
import React, { useEffect, useState } from 'react'

function SettingsMoviePage() {
    const [movies, setMovies] = useState([] as MovieModel[])
    useEffect(() => {
        async function fetchMovies() {
            const response = await fetch(`/api/movie?page=$0&max=-1&order=name`);
            const data = await response.json();
            setMovies(data.movies);
        }

        isAdmin().catch(() => router.push("/auth"));
        fetchMovies();
    }, [])

    return (
        <Layout>
            <SettingsNavbar />
            <div>
                <ul>
                    {movies.map(i => <li key={i.id}><Link href={"movies/" + i.id}>{i.name}</Link></li>)}
                </ul>
            </div>
        </Layout>
    )
}

export default SettingsMoviePage