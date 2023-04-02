import Layout from '@/component/Layout';
import { MovieModel } from '@/model/MovieModel';
import { Fetch } from '@/util/frontend/Fetch';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Title from '@/component/Title';
import MovieReviewCard from '@/component/card/MovieReviewCard';
import { ReviewWithUserModel } from '@/interface/ReviewWithUser';
import ReviewFormForMovie from '@/component/form/ReviewFormForMovie';

function MovieFeed() {
    const { query: { id } } = useRouter();
    const [movie, setMovie] = useState(null as MovieModel | null);
    const [reviews, setReviews] = useState([] as ReviewWithUserModel[]);

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
                <h2>Vélemények</h2>
                {movie && <ReviewFormForMovie onSubmit={() => { }} movie={movie} />}
                {reviews.map(i => <MovieReviewCard key={i.id} review={i} permsLevel={-1} />)}
            </div>
        </Layout >
    )
}

export default MovieFeed