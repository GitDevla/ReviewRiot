import { FeedModel } from '@/model/FeedModel'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Fetch } from '@/util/frontend/Fetch'
import { PermissionLevel } from '@/util/PermissionLevels'
import style from "@/styles/feedCard.module.scss"
import StarRating from '../input/StarRating'
import { tryGetLoggedIn } from '@/util/frontend/getLoggedIn'
import { SafeUserModel } from '@/interface/SafeUserModel'

function FeedCard({ feed, permsLevel, onDelete = () => { } }: { feed: FeedModel, permsLevel: number, onDelete: Function }) {
    const [user, setUser] = useState(null as SafeUserModel | null);

    useEffect(() => {
        tryGetLoggedIn().then(i => setUser(i))
    }, [])

    const handleDelete = async () => {
        await Fetch.DELETE("/api/review/" + feed.id)
        onDelete(feed.id);
    }

    return (
        <div className={style.card}>
            <div className={style.cover}>
                <img src={feed.movie.imagePath} width={50} height={50} alt='Filmkép' />
            </div>
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
            {
                (user?.id == feed.author.id || permsLevel >= PermissionLevel.moderator) && <div>
                    <button onClick={handleDelete}>Törlés</button></div>
            }
        </div >
    )
}

export default FeedCard