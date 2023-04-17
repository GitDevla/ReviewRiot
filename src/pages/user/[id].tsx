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

function UserFeed() {
    const { query: { id } } = useRouter();
    const [user, setUser] = useState({} as SafeUserModel);
    const [reviews, setReviews] = useState([] as ReviewWithMovieModel[]);
    const [ownProfile, setOwnProfile] = useState(false);
    const [isFollowed, setIsFollowed] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [loading, setLoading] = useState(false);
    const page = useRef(0);
    const flag = useRef(true);

    useEffect(() => {
        if (!id) return;
        async function fetchUser() {
            const loggedIn = await tryGetLoggedIn();
            const res = await Fetch.GET(`/api/user/${id}?page=${page.current}&max=5`);
            const json = await res.json();
            setIsLoggedIn(loggedIn != null);
            setUser(json.user)
            setReviews(json.reviews)
            setOwnProfile(json.user.name == loggedIn?.name)
            const res2 = await Fetch.GET("/api/user/follow?id=" + id)
            const json2 = await res2.json();
            setIsFollowed(json2.exists);
            page.current++;
        }
        fetchUser();
        window.addEventListener('scroll', handleScrollUserReview);

        return () => {
            window.removeEventListener('scroll', handleScrollUserReview);
        };
    }, [id])



    async function fetchReviews() {
        setLoading(true);
        const response = await Fetch.GET(`/api/user/${id}?page=${page.current}&max=5`);
        const data = await response.json();
        if (data.reviews.length < 5) window.removeEventListener('scroll', handleScrollUserReview);
        setReviews((prevReviews) => [...prevReviews, ...(data.reviews)]);
        setLoading(false);
        flag.current = true;
        page.current += 1;
    }

    function handleScrollUserReview() {
        const offset = 900;
        if (
            window.innerHeight + document.documentElement.scrollTop > document.documentElement.offsetHeight - offset
        ) {
            if (flag.current && !loading) {
                flag.current = false;
                fetchReviews();
            }
        }
    }

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
                <div style={{ whiteSpace: "pre-wrap", lineBreak: "anywhere", wordBreak: "break-word" }}>
                    <h2>{user.name} {ownProfile && <>(ön profilja)</>}</h2>
                    <span>{isLoggedIn && !ownProfile && <>
                        {isFollowed ?
                            <span style={{ cursor: "pointer" }} className='heart fill' onClick={() => handleUnfollow()}><HeartSVG />Követve</span>
                            : <span style={{ cursor: "pointer" }} className='heart' onClick={() => handleFollow()}><HeartSVG />Követés</span>}
                    </>}</span>
                    <p><b>Leírás</b>: {!user.description && "Nincs"}</p>
                    <p>{user.description}</p>
                </div>
                <img className='round' style={{ aspectRatio: "1/1" }} src={user.picturePath} alt="Profilkép" />
            </div>

            <div>
                <h2>Vélemények</h2>
                {reviews.length == 0 && <p>Ennek a felhasználónak még nincs értékelése!</p>}
                {reviews.map(i => <UserReviewCard onDelete={handeDelete} key={i.id} review={i} permsLevel={-1} />)}
            </div>
        </Layout >
    )
}

export default UserFeed