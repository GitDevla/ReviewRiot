import { FeedModel } from '@/model/FeedModel';
import router from 'next/router';
import Layout from '@/component/Layout';
import React, { useEffect, useRef, useState } from 'react'
import { Fetch } from '@/util/frontend/Fetch';
import FeedCard from '@/component/card/FeedCard';
import Head from 'next/head';
import ReviewForm from '@/component/form/ReviewForm';
import { UserModel } from '@/model/UserModel';
import { useUser } from '@/util/frontend/useUser';
import { PermissionLevel } from '@/util/PermissionLevels';


function FeedPage() {
    const [user, setUser] = useState(null as UserModel | null)
    const [permissionLevel, setPermissionLevel] = useState(PermissionLevel.user)
    const [feed, setFeed] = useState([] as FeedModel[])
    const interval = useRef(null as any);
    const cd = 10000;

    useEffect(() => {
        async function Auth() {
            const userRes = await useUser();
            setUser(userRes);
            let res = await Fetch.GET("/api/permission");
            if (!res.ok) throw new Error()
            setPermissionLevel((await res.json()).level);
        }
        async function getFeed() {
            const res = await Fetch.GET('/api/feed');
            if (!res.ok) throw new Error()
            setFeed((await res.json()).feed)
        }
        Auth().catch(() => router.push("/auth"));
        getFeed().catch(() => router.push("/auth"));

        interval.current = setInterval(getFeed, cd)

        return () => {
            clearInterval(interval.current);
        }
    }, []);



    return (
        <Layout>
            <Head>
                <title>Bejegyzéslista</title>
            </Head>
            <div>
                <ReviewForm />
            </div>
            <div id='feed'>
                {feed.map(i => <FeedCard feed={i} key={i.id} userID={user!.id} permsLevel={permissionLevel} />)}
            </div>
        </Layout>
    )
}

export default FeedPage;