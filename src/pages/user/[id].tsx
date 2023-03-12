import Layout from '@/component/Layout';
import { ReviewModel } from '@/model/ReviewModel';
import { UserModel } from '@/model/UserModel';
import { Fetch } from '@/util/Fetch';
import { useRouter } from 'next/router'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

function UserFeed() {
    const { query: { id } } = useRouter();
    const [user, setUser] = useState({} as UserModel);
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
            {user && < div >
                <h2>{user.name}</h2>
                <p>{user.description}</p>
                <Image src={user.picturePath} alt="Profilkép" width={100} height={100} />
            </div>}
            <div><h2>Vélemények</h2>
                {JSON.stringify(reviews)}</div>
        </Layout >
    )
}

export default UserFeed