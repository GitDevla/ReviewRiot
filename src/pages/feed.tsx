import { FeedModel } from '@/model/FeedModel';
import router from 'next/router';
import Layout from '@/component/Layout';
import React, { useEffect, useRef, useState } from 'react'
import { Fetch } from '@/util/frontend/Fetch';
import FeedCard from '@/component/card/FeedCard';
import ReviewForm from '@/component/form/ReviewForm';
import { UserModel } from '@/model/UserModel';
import { getLoggedIn } from '@/util/frontend/getLoggedIn';
import { PermissionLevel } from '@/util/PermissionLevels';
import Title from '@/component/Title';


function FeedPage() {
    const [user, setUser] = useState(null as UserModel | null)
    const [permissionLevel, setPermissionLevel] = useState(PermissionLevel.user)
    const [feed, setFeed] = useState([] as FeedModel[])
    const interval = useRef(null as any);
    const cd = 10000;

    async function getFeed() {
        const res = await Fetch.GET('/api/feed');
        if (!res.ok) throw new Error()
        setFeed((await res.json()).feed)
    }

    useEffect(() => {
        async function getPerms() {
            let res = await Fetch.GET("/api/permission");
            if (!res.ok) throw new Error()
            setPermissionLevel((await res.json()).level);
        }

        getLoggedIn().then(i => setUser(i))
            .then(() => getPerms())
            .then(() => getFeed())
            .catch(() => router.push("/auth"));

        interval.current = setInterval(getFeed, cd)

        return () => {
            clearInterval(interval.current);
        }
    }, []);

    return (
        <Layout>
            <Title>Bejegyzéslista</Title>
            <div>
                <ReviewForm onSubmit={getFeed} />
            </div>
            <div id='feed'>
                {feed.map(i => <FeedCard onDelete={getFeed} feed={i} key={i.id} userID={user!.id} permsLevel={permissionLevel} />)}
            </div>
        </Layout>
    )
}

export default FeedPage;