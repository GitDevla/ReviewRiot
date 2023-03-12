import { FeedModel } from '@/model/FeedModel';
import { useRouter } from 'next/router';
import Layout from '@/component/Layout';
import React, { useEffect, useState } from 'react'
import { Fetch } from '@/util/Fetch';
import FeedCard from '@/component/card/FeedCard';
import Head from 'next/head';
import ReviewForm from '@/component/form/ReviewForm';

function FeedPage() {
    const [feed, setFeed] = useState([] as FeedModel[])
    const router = useRouter();

    useEffect(() => {
        async function getFeed() {
            const res = await Fetch.GET('/api/feed');
            if (!res.ok) throw new Error()
            setFeed((await res.json()).feed)
        }
        getFeed().catch(() => router.push("/auth"));

        setInterval(getFeed, 10000)
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