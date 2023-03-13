import Layout from '@/component/Layout';
import { MovieModel } from '@/model/MovieModel';
import { ReviewModel } from '@/model/ReviewModel';
import { Fetch } from '@/util/Fetch';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Head from 'next/head';

function MovieFeed() {
    const { query: { id } } = useRouter();
    const [movie, setMovie] = useState({} as MovieModel);
    const [reviews, setReviews] = useState([] as ReviewModel[]);

    useEffect(() => {
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
            <Head>
                <title>{movie?.name} értékelések</title>
            </Head>
            {movie && < div >
                <h2>{movie.name}</h2>
                <p><>Kiadás: {movie.release}</></p>
                <Image src={movie.imagePath} alt="Borítókép" width={330} height={440} />
            </div>}
            <div><h2>Vélemények</h2>{JSON.stringify(reviews)}</div>
        </Layout >
    )
}

export default MovieFeed