import Layout from '@/component/Layout';
import { ReviewModel } from '@/model/ReviewModel';
import { UserModel } from '@/model/UserModel';
import { Fetch } from '@/util/Fetch';
import { useRouter } from 'next/router'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import Head from 'next/head';
import { useUser } from '@/util/useUser';

function UserFeed() {
    const { query: { id } } = useRouter();
    const [user, setUser] = useState({} as UserModel);
    const [reviews, setReviews] = useState([] as ReviewModel[]);
    const [ownProfile, setOwnProfile] = useState(false);

    useEffect(() => {
        async function fetchUser() {
            const loggedIn = useUser();
            const res = await Fetch.GET("/api/user/" + id);
            const json = await res.json();
            setUser(json.user)
            setReviews(json.reviews)
            setOwnProfile(json.user.name == (await loggedIn)?.name)
        }
        fetchUser();
    }, [id])

    async function handleFollow() {
        const res = await Fetch.POST("/api/user/follow", { whom: user.id });
        if (!res.ok) alert("XDDDDDDDD");
    }

    async function handleUnfollow() {
        const res = await Fetch.POST("/api/user/unfollow", { whom: user.id });
        if (!res.ok) alert("XDDDDDDDD");
    }


    return (
        <Layout>
            <Head>
                <title>{user?.name} profilja</title>
            </Head>
            {user && < div >
                <h2>{user.name}</h2>
                <p>{user.description}</p>
                <Image src={user.picturePath} alt="Profilkép" width={100} height={100} />
            </div>}
            <div>{!ownProfile && <>
                <button onClick={() => handleFollow()}>Követés</button>
                <button onClick={() => handleUnfollow()}>Követés abbahagyása</button>
            </>}</div>
            <div><h2>Vélemények</h2>
                {JSON.stringify(reviews)}</div>
        </Layout >
    )
}

export default UserFeed