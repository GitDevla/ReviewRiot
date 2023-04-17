import Layout from '@/component/Layout';
import { Fetch } from '@/util/frontend/Fetch';
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
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
import Bean from '@/component/Bean';

function MovieFeed() {
    const { query: { id } } = useRouter();
    const [movie, setMovie] = useState(null as MovieWithDataModel | null);
    const [reviews, setReviews] = useState([] as ReviewWithUserModel[]);
    const [permLevel, setPermLevel] = useState(-1);

    const [loading, setLoading] = useState(false);
    const page = useRef(0);
    const flag = useRef(true);

    async function getNewReviews() {
        const res = await Fetch.GET(`/api/movie/${id}?page=0&max=5`);
        if (!res.ok) throw new Error();
        let newReviews = (await res.json()).reviews;

        setReviews((prevReviews => {
            if (prevReviews.length == 0) {
                return newReviews;
            }
            let startOfNewFeed = -1;
            for (let i = 0; i < newReviews.length; i++) {
                if (newReviews[i].id == prevReviews[0]?.id) {
                    startOfNewFeed = i;
                    break;
                }
            }
            if (startOfNewFeed != 0) {
                let newFeeds = newReviews.splice(0, startOfNewFeed);
                return [...newFeeds, ...prevReviews];
            }
            return prevReviews;
        }))
    }

    useEffect(() => {
        if (!id) return;
        async function getMovie() {
            const res = await Fetch.GET(`/api/movie/${id}?page=${page.current}&max=5`);
            const json = await res.json();
            setMovie(json.movie)
            setReviews(json.reviews);
            page.current++;
        }
        async function getUser() {
            setPermLevel(await getUserPermission())
        }
        getUser();
        getMovie();
        window.addEventListener('scroll', handleScrollMovieReviews);
        return () => {
            window.removeEventListener('scroll', handleScrollMovieReviews);
        };
    }, [id])

    async function fetchMovies() {
        setLoading(true);
        const response = await Fetch.GET(`/api/movie/${id}?page=${page.current}&max=5`);
        const data = await response.json();
        if (data.reviews.length < 5) window.removeEventListener('scroll', handleScrollMovieReviews);
        setReviews((prevReviews) => [...prevReviews, ...(data.reviews)]);
        setLoading(false);
        flag.current = true;
        page.current += 1;
    }

    function handleScrollMovieReviews() {
        const offset = 900;
        if (
            window.innerHeight + document.documentElement.scrollTop > document.documentElement.offsetHeight - offset
        ) {
            if (flag.current && !loading) {
                flag.current = false;
                fetchMovies();
            }
        }
    }

    async function handeDelete(id: number) {
        setReviews((prevReviews) => prevReviews.filter(i => i.id != id));
    }

    return (
        <Layout>
            <Title>{movie?.name} értékelések</Title>
            <div className={`card ${style.movieProfile}`}>
                <div className='overflow-break'>
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
                    {permLevel >= PermissionLevel.admin && <Link href={"/settings/movies/" + id}><Bean>🔧 Módosítás</Bean></Link>}
                </div>
                <img src={movie?.imagePath} className="movieCover" alt="Borítókép" />
            </div>
            <div>
                <h2>Vélemények</h2>
                {(movie && permLevel != -1) && <ReviewFormForMovie onSubmit={getNewReviews} movie={movie} />}
                {reviews.length == 0 && <p>Még nincs értékelés ezen a filmen, legyél te az első!</p>}
                {reviews.map(i => <MovieReviewCard onDelete={handeDelete} key={i.id} review={i} permsLevel={permLevel} />)}
            </div>
        </Layout >
    )
}

export default MovieFeed