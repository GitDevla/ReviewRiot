import Layout from '@/component/Layout';
import { Fetch } from '@/util/frontend/Fetch';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Title from '@/component/Title';
import MovieReviewCard from '@/component/card/MovieReviewCard';
import style from "@/styles/movieProfile.module.scss"

import { ReviewWithUserModel } from '@/interface/ReviewWithUser';
import ReviewFormForMovie from '@/component/form/ReviewFormForMovie';
import { MovieWithDataModel } from '@/interface/MovieWithData';
import StarRating from '@/component/input/StarRating';
import { getUserPermission } from '@/util/frontend/isAdmin';
import { PermissionLevel } from '@/util/PermissionLevels';
import Link from 'next/link';

function MovieFeed() {
    const { query: { id } } = useRouter();
    const [movie, setMovie] = useState(null as MovieWithDataModel | null);
    const [reviews, setReviews] = useState([] as ReviewWithUserModel[]);
    const [permLevel, setPermLevel] = useState(-1);

    useEffect(() => {
        if (!id) return;
        async function getMovie() {
            const res = await Fetch.GET("/api/movie/" + id);
            const json = await res.json();
            setMovie(json.movie)
            setReviews(json.reviews)
        }
        async function getUser() {
            setPermLevel(await getUserPermission())
        }
        getUser();
        getMovie();
    }, [id])

    return (
        <Layout>
            <Title>{movie?.name} értékelések</Title>
            <div className={`card ${style.movieProfile}`}>
                <div>
                    <h2>Név: {movie?.name}</h2>
                    <div>
                        {movie?.data.rank && <p>Top #{movie?.data.rank}</p>}
                        <p><>Kiadás: {movie?.release}</></p>
                        {movie?.genres.length != 0 && <p>Műfajok: {movie?.genres.map(i => <div className={"genreTag"} key={i.id}>{i.name}</div>)}</p>}
                        <h3>Értékelés adatok:</h3>
                        <p>Értékelés: <StarRating value={movie?.data.rating} /></p>
                        <p>Értékelések száma: {movie?.data.NOReviews}</p>
                        <p>Utolsó hétben történt értékelések száma: {movie?.data.NOReviewsLastWeek}</p>
                    </div>
                    {permLevel >= PermissionLevel.admin && <Link href={"/settings/movies/" + id}><button>Módosítás</button></Link>}
                </div>
                <img src={movie?.imagePath} alt="Borítókép" width={330} height={440} />
            </div>
            <div>
                <h2>Vélemények</h2>
                {(movie && permLevel != -1) && <ReviewFormForMovie onSubmit={() => { }} movie={movie} />}
                {reviews.map(i => <MovieReviewCard key={i.id} review={i} permsLevel={permLevel} />)}
            </div>
        </Layout >
    )
}

export default MovieFeed