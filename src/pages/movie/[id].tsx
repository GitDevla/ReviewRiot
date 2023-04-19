import Bean from '@/component/Bean';
import MovieReviewCard from '@/component/card/MovieReviewCard';
import ReviewFormForMovie from '@/component/form/ReviewFormForMovie';
import StarRating from '@/component/input/StarRating';
import Layout from '@/component/Layout';
import Title from '@/component/Title';
import { MovieWithDataModel } from '@/interface/MovieWithData';
import { ReviewWithUserModel } from '@/interface/ReviewWithUser';
import style from "@/styles/movieProfile.module.scss";
import { Fetch } from '@/util/frontend/Fetch';
import { getUserPermission } from '@/util/frontend/isAdmin';
import { ScrollEventGen } from '@/util/frontend/ScrollEvent';
import { useLoading } from '@/util/frontend/useLoading';
import { PermissionLevel } from '@/util/PermissionLevels';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

function MovieFeed() {
    const { query: { id } } = useRouter();
    const [movie, setMovie] = useState(null as MovieWithDataModel | null);
    const [reviews, setReviews] = useState([] as ReviewWithUserModel[]);
    const [permLevel, setPermLevel] = useState(-1);

    const load = useLoading();
    const page = useRef(0);

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
            const res = await Fetch.GET(`/api/movie/${id}?page=0&max=0`);
            const json = await res.json();
            setMovie(json.movie);
        }
        async function getUser() {
            setPermLevel(await getUserPermission())
        }
        getUser();
        getMovie();
        fetchReviews()
            .then(() => window.addEventListener('scroll', handleScrollMovieReviews));

        return () => {
            window.removeEventListener('scroll', handleScrollMovieReviews);
        };
    }, [id])

    async function fetchReviews() {
        load.start();
        const response = await Fetch.GET(`/api/movie/${id}?page=${page.current}&max=5`);
        const data = await response.json();
        if (data.reviews.length < 5) window.removeEventListener('scroll', handleScrollMovieReviews);
        setReviews((prevReviews) => [...prevReviews, ...(data.reviews)]);
        load.stop();
        page.current++;
    }

    const handleScrollMovieReviews = ScrollEventGen(load.ref, fetchReviews);

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
                {reviews.map(i => <MovieReviewCard onDelete={handeDelete} key={i.id} review={i} permsLevel={permLevel} />)}
            </div>
            {load.state && <p className='error'>Töltés...</p>}
            {(!load.state && reviews.length == 0) && <p className='error'>Még nincs értékelés ezen a filmen, legyél te az első!</p>}
        </Layout >
    )
}

export default MovieFeed