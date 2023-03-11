import { FeedModel } from '@/model/FeedModel';
import { useRouter } from 'next/router';
import Layout from '@/component/Layout';
import React, { useEffect, useState } from 'react'
import { Fetch } from '@/util/Fetch';

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
    }, []);

    return (
        <Layout>
            <div id='feed'>
                {feed.map(i => {
                    return <div key={i.id}>
                        <p>{i.author.name} a {i.movie.name} filmet nézte meg</p>
                        <p>{i.description}</p>
                    </div>
                })}
            </div>
        </Layout>
    )
}

export default FeedPage;