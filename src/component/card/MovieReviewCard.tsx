
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


function MovieReviewCard({ review, permsLevel, onDelete = (i: number) => i }: { review: ReviewWithUserModel, permsLevel: number, onDelete: Function }) {
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
            <div className={style.info}>
                <img className='pfp' src={review.author.picturePath} width={50} alt='Profilkép' />
                <p className='m-0'><>
                    <Link href={"/user/" + review.author.id}>{review.author.name}</Link> megnézte a filmet {new Date(review.create).toLocaleString()}
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
                <p>{review.description}</p>
            </div>}

        </div >
    )
}

export default MovieReviewCard