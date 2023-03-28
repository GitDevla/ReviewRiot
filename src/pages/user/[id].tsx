import Layout from '@/component/Layout';
import { UserModel } from '@/model/UserModel';
import { Fetch } from '@/util/frontend/Fetch';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Head from 'next/head';
import { tryGetLoggedIn } from '@/util/frontend/getLoggedIn';
import HeartSVG from '@/../public/icon/heart.svg';
import UserReviewCard from '@/component/card/UserReviewCard';
import { ReviewWithMovie } from '@/interface/ReviewWithMovie';


function UserFeed() {
    const { query: { id } } = useRouter();
    const [user, setUser] = useState({} as UserModel);
    const [reviews, setReviews] = useState([] as ReviewWithMovie[]);
    const [ownProfile, setOwnProfile] = useState(false);
    const [isFollowed, setIsFollowed] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        if (!id) return
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
        if (!res.ok) alert("XDDDDDDDD");
        setIsFollowed(true);
    }

    async function handleUnfollow() {
        const res = await Fetch.POST("/api/user/unfollow", { whom: user.id });
        if (!res.ok) alert("XDDDDDDDD");
        setIsFollowed(false);
    }


    return (
        <Layout>
            <Head>
                <title>{user?.name} profilja</title>
            </Head>
            {user && < div >
                <h2>{user.name}</h2>
                <p>{user.description}</p>
                <img src={user.picturePath} alt="Profilkép" width={100} height={100} />
            </div>}
            <div>{isLoggedIn && !ownProfile && <>
                {isFollowed ?
                    <span className='heart fill' onClick={() => handleUnfollow()}><HeartSVG />Követve</span>
                    : <span className='heart' onClick={() => handleFollow()}><HeartSVG />Követés</span>}
            </>}</div>
            <div>
                <h2>Vélemények</h2>
                {reviews.map(i => <UserReviewCard key={i.id} review={i} userID={-1} permsLevel={-1} />)}
            </div>
        </Layout >
    )
}

export default UserFeed