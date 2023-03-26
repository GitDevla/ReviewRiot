import { FeedModel } from '@/model/FeedModel'
import React from 'react'
import Link from 'next/link'
import { Fetch } from '@/util/frontend/Fetch'
import { PermissionLevel } from '@/util/PermissionLevels'
import style from "@/styles/feedCard.module.scss"
import StarRating from '../StarRating'

function FeedCard({ feed, userID, permsLevel }: { feed: FeedModel, userID: number, permsLevel: number }) {
    const handleDelete = async () => {
        await Fetch.DELETE("/api/review/" + feed.id)
    }

    return (
        <div className={style.card}>
            <div className="flex">
                <img className='round' src={feed.author.picturePath} width={50} height={50} alt='Profilkép' />
                <p><>
                    <Link href={"/user/" + feed.author.id}>{feed.author.name}</Link> a <Link href={"/movie/" + feed.movie.id} >{feed.movie.name}</Link> filmet nézte meg {new Date(feed.createDate).toLocaleString()}
                    <br />
                    <StarRating value={feed.rating} />
                </></p>
            </div>
            <div>
                <p style={{ whiteSpace: "pre-wrap" }}>{feed.description}</p>
            </div>
            <div className={style.cover}>
                <img src={feed.movie.imagePath} width={50} height={50} alt='Filmkép' />
            </div>
            {
                (userID == feed.author.id || permsLevel >= PermissionLevel.moderator) && <div>
                    <button onClick={handleDelete}>Törlés</button></div>
            }
        </div >
    )
}

export default FeedCard