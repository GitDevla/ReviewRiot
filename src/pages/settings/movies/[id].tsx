import MovieEditForm from '@/component/form/MovieEditForm';
import Layout from '@/component/Layout'
import SettingsNavbar from '@/component/SettingsNavbar'
import Title from '@/component/Title';
import { MovieModel } from '@/model/MovieModel';
import { Fetch } from '@/util/frontend/Fetch';
import { getIsAdmin } from '@/util/frontend/isAdmin';
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

        getIsAdmin().catch(() => router.push("/auth"));
        getMovie();
    }, [id])

    return (
        <Layout>
            <Title>{movie?.name} értékelések</Title>
            <SettingsNavbar />
            {movie && <MovieEditForm movie={movie} />}
        </Layout>
    )
}

export default MovieEditPage