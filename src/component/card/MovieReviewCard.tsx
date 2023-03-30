
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Fetch } from '@/util/frontend/Fetch'
import { PermissionLevel } from '@/util/PermissionLevels'
import style from "@/styles/feedCard.module.scss"
import StarRating from '../StarRating'
import { ReviewWithUser } from '@/interface/ReviewWithUser'
import { UserModel } from '@/model/UserModel'
import { tryGetLoggedIn } from '@/util/frontend/getLoggedIn'

function MovieReviewCard({ review, permsLevel }: { review: ReviewWithUser, permsLevel: number }) {
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
                <img className='round' src={review.author.picturePath} width={50} height={50} alt='Profilkép' />
                <p><>
                    <Link href={"/user/" + review.authorID}>{review.author.name}</Link> {new Date(review.create).toLocaleString()}
                    <br />
                    <StarRating value={review.rating} />
                </></p>
            </div>
            <div>
                <p style={{ whiteSpace: "pre-wrap" }}>{review.description}</p>
            </div>
            {
                (user?.id == review.authorID || permsLevel >= PermissionLevel.moderator) && <div>
                    <button onClick={handleDelete}>Törlés</button></div>
            }
        </div >
    )
}

export default MovieReviewCard