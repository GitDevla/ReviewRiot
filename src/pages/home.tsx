import { FeedModel } from '@/model/FeedModel';
import { UserModel } from '@/model/UserModel';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

function Home() {
    const [userdata, setUserdata] = useState({} as UserModel)
    const [feed, setFeed] = useState([] as FeedModel[])
    const router = useRouter();

    useEffect(() => {
        fetch('/api/auth')
            .then(res => {
                if (!res.ok) throw new Error()
                return res.json()
            })
            .then(res => setUserdata(res.user))
            .catch(() => router.push("/auth"));
        fetch('/api/feed')
            .then(res => {
                if (!res.ok) throw new Error()
                return res.json()
            })
            .then(res => setFeed(res.feed));
        console.log('i fire once');
    }, []);

    return (
        <div>
            <p>Helló {userdata.name}</p>
            <div id='feed'>
                {feed.map(i => {
                    return <div key={i.id}>
                        <p>{i.author.name} a {i.movie.name} filmet nézte meg</p>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Home;