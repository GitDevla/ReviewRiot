import Layout from '@/component/Layout';
import { MovieModel } from '@/model/MovieModel';
import { ReviewModel } from '@/model/ReviewModel';
import { Fetch } from '@/util/frontend/Fetch';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Title from '@/component/Title';

function MovieFeed() {
    const { query: { id } } = useRouter();
    const [movie, setMovie] = useState(null as MovieModel | null);
    const [reviews, setReviews] = useState([] as ReviewModel[]);

    useEffect(() => {
        if (!id) return;
        async function getMovie() {
            const res = await Fetch.GET("/api/movie/" + id);
            const json = await res.json();
            setMovie(json.movie)
            setReviews(json.reviews)
        }
        getMovie();
    }, [id])

    return (
        <Layout>
            <Title>{movie?.name} értékelések</Title>
            <div>
                <h2>{movie?.name}</h2>
                <p><>Kiadás: {movie?.release}</></p>
                <img src={movie?.imagePath} alt="Borítókép" width={330} height={440} />
            </div>
            <div>
                <h2>Vélemények</h2>{JSON.stringify(reviews)}
            </div>
        </Layout >
    )
}

export default MovieFeed