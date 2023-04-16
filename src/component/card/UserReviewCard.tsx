import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Fetch } from '@/util/frontend/Fetch'
import { PermissionLevel } from '@/util/PermissionLevels'
import style from "@/styles/feedCard.module.scss"
import StarRating from '../input/StarRating'
import { ReviewWithMovieModel } from '@/interface/ReviewWithMovie'
import { tryGetLoggedIn } from '@/util/frontend/getLoggedIn'
import { SafeUserModel } from '@/interface/SafeUserModel'
import Bean from '../Bean'

function UserReviewCard({ review, permsLevel, onDelete = (i: number) => i }: { review: ReviewWithMovieModel, permsLevel: number, onDelete: Function }) {
    const [user, setUser] = useState(null as SafeUserModel | null);

    useEffect(() => {
        tryGetLoggedIn().then(i => setUser(i))
    }, [])

    const handleDelete = async () => {
        if (!confirm("Biztosan törölni akarja ez a posztot?")) return;
        await Fetch.DELETE("/api/review/" + review.id)
        onDelete(review.id);
    }

    return (
        <div className={`${style.card} ${style.grid}`} >
            <div className={style.cover}>
                <img src={review.movie.imagePath} width={50} height={50} alt='Filmkép' />
            </div>
            <div className={style.info}>
                <p style={{ margin: "0" }}><>
                    <Link href={"/movie/" + review.movie.id} >{review.movie.name}</Link> filmet nézte meg {new Date(review.create).toLocaleString()}
                    {
                        (user?.id == review.authorID || permsLevel >= PermissionLevel.moderator) &&
                        <Bean onClick={handleDelete}>Törlés ❌</Bean>
                    }</></p>
                <div>
                    <StarRating value={review.rating} />
                </div>

            </div>
            {review.description && <div className={style.review}>
                <b>Vélemény:</b>
                <p>{review.description}</p>
            </div>}

        </div >
    )
}

export default UserReviewCard