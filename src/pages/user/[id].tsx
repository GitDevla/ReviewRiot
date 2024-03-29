import Layout from '@/component/Layout';
import { Fetch } from '@/util/frontend/Fetch';
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import Head from 'next/head';
import { tryGetLoggedIn } from '@/util/frontend/getLoggedIn';
import HeartSVG from '@/../public/icon/heart.svg';
import UserReviewCard from '@/component/card/UserReviewCard';
import { ReviewWithMovieModel } from '@/interface/ReviewWithMovie';
import { SafeUserModel } from '@/interface/SafeUserModel';
import style from "@/styles/movieProfile.module.scss"
import { ScrollEventGen } from '@/util/frontend/ScrollEvent';
import { useLoading } from '@/util/frontend/useLoading';

function UserFeed() {
    const { query: { id } } = useRouter();
    const [user, setUser] = useState({} as SafeUserModel);
    const [reviews, setReviews] = useState([] as ReviewWithMovieModel[]);
    const [ownProfile, setOwnProfile] = useState(false);
    const [isFollowed, setIsFollowed] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const load = useLoading();
    const page = useRef(0);

    useEffect(() => {
        if (!id) return;
        async function fetchUser() {
            const loggedIn = await tryGetLoggedIn();
            const res = await Fetch.GET(`/api/user/${id}?page=0&max=0`);
            const json = await res.json();
            setIsLoggedIn(loggedIn != null);
            setUser(json.user)
            setOwnProfile(json.user.name == loggedIn?.name)
            const res2 = await Fetch.GET("/api/user/follow?id=" + id)
            const json2 = await res2.json();
            setIsFollowed(json2.exists);
        }
        fetchUser();
        fetchReviews().then(
            () => window.addEventListener('scroll', handleScrollUserReview)
        );

        return () => {
            window.removeEventListener('scroll', handleScrollUserReview);
        };
    }, [id])



    async function fetchReviews() {
        load.start();
        const response = await Fetch.GET(`/api/user/${id}?page=${page.current}&max=5`);
        const data = await response.json();
        if (data.reviews.length < 5) window.removeEventListener('scroll', handleScrollUserReview);
        setReviews((prevReviews) => [...prevReviews, ...(data.reviews)]);
        load.stop();
        page.current += 1;
    }

    const handleScrollUserReview = ScrollEventGen(load.ref, fetchReviews);

    async function handleFollow() {
        const res = await Fetch.POST("/api/user/follow", { whom: user.id });
        if (!res.ok) alert("Valami hiba történt");
        setIsFollowed(true);
    }

    async function handleUnfollow() {
        const res = await Fetch.POST("/api/user/unfollow", { whom: user.id });
        if (!res.ok) alert("Valami hiba történt");
        setIsFollowed(false);
    }

    async function handeDelete(id: number) {
        setReviews((prevReviews) => prevReviews.filter(i => i.id != id));
    }

    return (
        <Layout>
            <Head>
                <title>{user?.name} profilja</title>
            </Head>
            <div className={`card ${style.movieProfile}`}>
                <div className='overflow-break'>
                    <h2>{user.name} {ownProfile && <>(ön profilja)</>}</h2>
                    <span>{isLoggedIn && !ownProfile && <>
                        {isFollowed ?
                            <span className='heart fill pointer' onClick={() => handleUnfollow()}><HeartSVG />Követve</span>
                            : <span className='heart pointer' onClick={() => handleFollow()}><HeartSVG />Követés</span>}
                    </>}</span>
                    <p><b>Leírás</b>: {!user.description && "Nincs"}</p>
                    <p>{user.description}</p>
                </div>
                <img className='pfp' src={user.picturePath} alt="Profilkép" />
            </div>
            <div>
                <h2>Vélemények</h2>
                {reviews.map(i => <UserReviewCard onDelete={handeDelete} key={i.id} review={i} permsLevel={-1} />)}
            </div>
            {(!load.state && reviews.length == 0) && <p className='error'>Ennek a felhasználónak még nincs értékelése!</p>}
            {load.state && <p className='error'>Töltés...</p>}
        </Layout >
    )
}

export default UserFeed