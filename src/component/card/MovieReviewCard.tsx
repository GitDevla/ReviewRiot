
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Fetch } from '@/util/frontend/Fetch'
import { PermissionLevel } from '@/util/PermissionLevels'
import StarRating from '../input/StarRating'
import { ReviewWithUserModel } from '@/interface/ReviewWithUser'
import { tryGetLoggedIn } from '@/util/frontend/getLoggedIn'
import { SafeUserModel } from '@/interface/SafeUserModel'
import style from "@/styles/feedCard.module.scss"
import Bean from '../Bean'


function MovieReviewCard({ review, permsLevel }: { review: ReviewWithUserModel, permsLevel: number }) {
    const [user, setUser] = useState(null as SafeUserModel | null);

    useEffect(() => {
        tryGetLoggedIn().then(i => setUser(i))
    }, [])


    const handleDelete = async () => {
        await Fetch.DELETE("/api/review/" + review.id)
    }

    return (
        <div className={`${style.card} ${style.grid}`} >
            <div className={style.info}>
                <img className='round' src={review.author.picturePath} width={50} height={50} alt='Profilkép' />
                <p style={{ margin: "0" }}><>
                    <Link href={"/user/" + review.author.id}>{review.author.name}</Link> megnézte a filemt {new Date(review.create).toLocaleString()}
                    {
                        (user?.id == review.author.id || permsLevel >= PermissionLevel.moderator) &&
                        <Bean onClick={handleDelete}>Törlés ❌</Bean>
                    }</></p>
                <div>
                    <StarRating value={review.rating} />
                </div>

            </div>
            {review.description && <div className={style.review}>
                <b>Vélemény:</b>
                <p style={{ whiteSpace: "pre-wrap", maxHeight: "8em", overflowY: 'scroll' }}>{review.description}</p>
            </div>}

        </div >
    )
}

export default MovieReviewCard