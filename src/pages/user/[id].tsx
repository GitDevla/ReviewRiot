import Layout from '@/component/Layout';
import { Fetch } from '@/util/frontend/Fetch';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Head from 'next/head';
import { tryGetLoggedIn } from '@/util/frontend/getLoggedIn';
import HeartSVG from '@/../public/icon/heart.svg';
import UserReviewCard from '@/component/card/UserReviewCard';
import { ReviewWithMovieModel } from '@/interface/ReviewWithMovie';
import { SafeUserModel } from '@/interface/SafeUserModel';

function UserFeed() {
    const { query: { id } } = useRouter();
    const [user, setUser] = useState({} as SafeUserModel);
    const [reviews, setReviews] = useState([] as ReviewWithMovieModel[]);
    const [ownProfile, setOwnProfile] = useState(false);
    const [isFollowed, setIsFollowed] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        if (!id) return;
        async function fetchUser() {
            const loggedIn = await tryGetLoggedIn();
            const res = await Fetch.GET("/api/user/" + id);
            const json = await res.json();
            setIsLoggedIn(loggedIn != null);
            setUser(json.user)
            setReviews(json.reviews)
            setOwnProfile(json.user.name == loggedIn?.name)
            const res2 = await Fetch.GET("/api/user/follow?id=" + id)
            const json2 = await res2.json();
            setIsFollowed(json2.exists);
            //TODODODO
        }
        fetchUser();
    }, [id])

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


    return (
        <Layout>
            <Head>
                <title>{user?.name} profilja</title>
            </Head>
            <div className="card">
                <h2>{user.name} {ownProfile && <>(ön profilja)</>}</h2>
                <p>{user.description}</p>
                <img src={user.picturePath} alt="Profilkép" width={100} height={100} />
                <div>{isLoggedIn && !ownProfile && <>
                    {isFollowed ?
                        <span style={{ cursor: "pointer" }} className='heart fill' onClick={() => handleUnfollow()}><HeartSVG />Követve</span>
                        : <span style={{ cursor: "pointer" }} className='heart' onClick={() => handleFollow()}><HeartSVG />Követés</span>}
                </>}</div>
            </div>

            <div>
                <h2>Vélemények</h2>
                {reviews.map(i => <UserReviewCard key={i.id} review={i} permsLevel={-1} />)}
            </div>
        </Layout >
    )
}

export default UserFeed