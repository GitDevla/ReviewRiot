import { FeedModel } from '@/model/FeedModel';
import router from 'next/router';
import Layout from '@/component/Layout';
import React, { useEffect, useRef, useState } from 'react'
import { Fetch } from '@/util/frontend/Fetch';
import FeedCard from '@/component/card/FeedCard';
import Head from 'next/head';
import ReviewForm from '@/component/form/ReviewForm';


function FeedPage() {
    const [feed, setFeed] = useState([] as FeedModel[])
    const interval = useRef(null as any);
    const cd = 10000;

    useEffect(() => {
        async function getFeed() {
            const res = await Fetch.GET('/api/feed');
            if (!res.ok) throw new Error()
            setFeed((await res.json()).feed)
        }
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
                {feed.map(i => <FeedCard feed={i} key={i.id} />)}
            </div>
        </Layout>
    )
}

export default FeedPage;