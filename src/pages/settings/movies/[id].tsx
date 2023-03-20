import MovieEditForm from '@/component/form/MovieEditForm';
import Layout from '@/component/Layout'
import SettingsNavbar from '@/component/SettingsNavbar'
import { MovieModel } from '@/model/MovieModel';
import { Fetch } from '@/util/frontend/Fetch';
import { isAdmin } from '@/util/frontend/isAdmin';
import Head from 'next/head';
import router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

function MovieEditPage() {
    const { query: { id } } = useRouter();
    const [movie, setMovie] = useState(null as MovieModel | null);

    useEffect(() => {
        if (!id) return;
        async function getMovie() {
            const res = await Fetch.GET("/api/movie/" + id);
            const json = await res.json();
            setMovie(json.movie)
        }

        isAdmin().catch(() => router.push("/auth"));
        getMovie();
    }, [id])

    const title = `${movie?.name} értékelések`;
    return (
        <Layout>
            <Head>
                <title>{title}</title>
            </Head>
            <SettingsNavbar />
            {movie && <MovieEditForm movie={movie} />}
        </Layout>
    )
}

export default MovieEditPage