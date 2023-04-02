import Layout from '@/component/Layout'
import SettingsNavbar from '@/component/SettingsNavbar'
import Title from '@/component/Title';
import { MovieModel } from '@/model/MovieModel';
import { getUserPermission } from '@/util/frontend/isAdmin';
import Link from 'next/link';
import router from 'next/router';
import style from '@/styles/prettyList.module.scss';
import React, { useEffect, useState } from 'react'

function SettingsMoviePage() {
    const [movies, setMovies] = useState([] as MovieModel[])
    useEffect(() => {
        async function fetchMovies() {
            const response = await fetch(`/api/movie?page=$0&max=-1&order=name`);
            const data = await response.json();
            setMovies(data.movies);
        }

        getUserPermission().catch(() => router.push("/auth"));
        fetchMovies();
    }, [])

    return (
        <Layout>
            <Title>Filmek beállításai</Title>
            <SettingsNavbar />
            <div>
                <ul className={style.list}>
                    <Link href="movies/new">Új Film</Link>
                    {movies.map(i => <Link key={i.id} href={"movies/" + i.id}>{i.name}</Link>)}
                </ul>
            </div>
        </Layout>
    )
}

export default SettingsMoviePage