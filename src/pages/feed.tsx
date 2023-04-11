import { FeedModel } from '@/model/FeedModel';
import router from 'next/router';
import Layout from '@/component/Layout';
import React, { useEffect, useRef, useState } from 'react'
import { Fetch } from '@/util/frontend/Fetch';
import FeedCard from '@/component/card/FeedCard';
import ReviewForm from '@/component/form/ReviewForm';
import { getLoggedIn } from '@/util/frontend/getLoggedIn';
import { PermissionLevel } from '@/util/PermissionLevels';
import Title from '@/component/Title';


function FeedPage() {
    const [permissionLevel, setPermissionLevel] = useState(PermissionLevel.user)
    const [feed, setFeed] = useState([] as FeedModel[])
    const interval = useRef(null as any);
    const cd = 10000;

    const [loading, setLoading] = useState(false);
    const page = useRef(0);
    const flag = useRef(true);
    const offset = useRef(0);
    const perPage = 1;

    async function getNewFeed() {
        const res = await Fetch.GET(`/api/feed?page=0&max=10`);
        if (!res.ok) throw new Error();
        let newFeed = (await res.json()).feed;

        setFeed((prevFeed => {
            if (prevFeed.length == 0) {
                offset.current = newFeed.length;
                return newFeed;
            }

            let startOfNewFeed = -1;
            for (let i = 0; i < newFeed.length; i++) {
                if (newFeed[i].id == prevFeed[0]?.id) {
                    startOfNewFeed = i;
                    break;
                }
            }
            if (startOfNewFeed != 0) {
                let newFeeds = newFeed.splice(0, startOfNewFeed);
                offset.current += startOfNewFeed;
                return [...newFeeds, ...prevFeed];
            }
            return prevFeed;
        }))
    }


    async function fetchscrollFeed() {
        setLoading(true);
        const response = await fetch(`/api/feed?page=${page.current + Math.ceil(offset.current / perPage)}&max=${perPage}`);
        const data = await response.json();
        if (data.feed.length < perPage) window.removeEventListener('scroll', handleScrollFeed);
        setFeed((prevFeed) => [...prevFeed, ...(data.feed)]);
        setLoading(false);
        flag.current = true;
        page.current += 1;
    }

    function handleScrollFeed() {
        const offset = 900;
        if (
            window.innerHeight + document.documentElement.scrollTop > document.documentElement.offsetHeight - offset
        ) {
            if (flag.current && !loading) {
                flag.current = false;
                fetchscrollFeed();
            }
        }
    }


    useEffect(() => {
        async function getPerms() {
            let res = await Fetch.GET("/api/permission");
            if (!res.ok) throw new Error()
            setPermissionLevel((await res.json()).level);
        }

        getLoggedIn().then(() => getPerms())
            .then(() => getNewFeed())
            .then(() => {
                interval.current = setInterval(getNewFeed, cd)
                window.addEventListener('scroll', handleScrollFeed);
            })
            .catch(() => router.push("/auth"));

        return () => {
            window.removeEventListener('scroll', handleScrollFeed);
            clearInterval(interval.current);
        }
    }, []);

    return (
        <Layout>
            <Title>Bejegyzéslista</Title>
            <div>
                <ReviewForm onSubmit={getNewFeed} />
            </div>
            <div id='feed'>
                {feed.map(i => <FeedCard onDelete={getNewFeed} feed={i} key={i.id} permsLevel={permissionLevel} />)}
                {loading && <div>Töltés...</div>}
            </div>
        </Layout>
    )
}

export default FeedPage;