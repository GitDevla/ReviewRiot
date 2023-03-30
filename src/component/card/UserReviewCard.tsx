import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Fetch } from '@/util/frontend/Fetch'
import { PermissionLevel } from '@/util/PermissionLevels'
import style from "@/styles/feedCard.module.scss"
import StarRating from '../StarRating'
import { ReviewWithMovie } from '@/interface/ReviewWithMovie'
import { tryGetLoggedIn } from '@/util/frontend/getLoggedIn'
import { UserModel } from '@/model/UserModel'

function UserReviewCard({ review, permsLevel }: { review: ReviewWithMovie, permsLevel: number }) {
    const [user, setUser] = useState(null as UserModel | null);

    useEffect(() => {
        tryGetLoggedIn().then(i => setUser(i))
    }, [])

    const handleDelete = async () => {
        await Fetch.DELETE("/api/review/" + review.id)
    }

    return (
        <div className={style.card}>
            <div className="flex">
                <p><>
                    <Link href={"/movie/" + review.movie.id} >{review.movie.name}</Link> filmet nézte meg {new Date(review.create).toLocaleString()}
                    <br />
                    <StarRating value={review.rating} />
                </></p>
            </div>
            <div>
                <p style={{ whiteSpace: "pre-wrap" }}>{review.description}</p>
            </div>
            <div className={style.cover}>
                <img src={review.movie.imagePath} width={50} height={50} alt='Filmkép' />
            </div>
            {
                (user?.id == review.authorID || permsLevel >= PermissionLevel.moderator) && <div>
                    <button onClick={handleDelete}>Törlés</button></div>
            }
        </div >
    )
}

export default UserReviewCard