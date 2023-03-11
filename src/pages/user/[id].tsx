import Layout from '@/component/Layout';
import { MovieModel } from '@/model/MovieModel';
import { ReviewModel } from '@/model/ReviewModel';
import { Fetch } from '@/util/Fetch';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

function UserFeed() {
    const { query: { id } } = useRouter();
    const [user, setUser] = useState({} as MovieModel);
    const [reviews, setReviews] = useState([] as ReviewModel[]);

    useEffect(() => {
        async function getMovie() {
            const res = await Fetch.GET("/api/user/" + id);
            const json = await res.json();
            setUser(json.user)
            setReviews(json.reviews)
        }
        getMovie();
    }, [id])


    return (
        <Layout>
            <div>{JSON.stringify(user)}</div>
            <div>{JSON.stringify(reviews)}</div>
        </Layout>
    )
}

export default UserFeed