import { FeedModel } from '@/model/FeedModel'
import React from 'react'
import Link from 'next/link'
import { Fetch } from '@/util/frontend/Fetch'
import { PermissionLevel } from '@/util/PermissionLevels'

function FeedCard({ feed, userID, permsLevel }: { feed: FeedModel, userID: number, permsLevel: number }) {
    const handleDelete = async () => {
        await Fetch.DELETE("/api/review?id=" + feed.id)
    }

    return (
        <div style={{ border: "3px solid black" }}>
            <div style={{ display: "flex" }}>
                <img className='round' src={feed.author.picturePath} width={50} height={50} alt='Profilkép' />
                <p><>
                    <Link href={"/user/" + feed.author.id}>{feed.author.name}</Link> a <Link href={"/movie/" + feed.movie.id} >{feed.movie.name}</Link> filmet nézte meg {feed.createDate}
                    <br />
                    {feed.rating}/10
                </></p>
            </div>
            <div>
                <p>{feed.description}</p>
            </div>
            <div style={{ float: "right" }}>
                <img src={feed.movie.imagePath} width={50} height={50} alt='Filmkép' />
            </div>
            {(userID == feed.author.id || permsLevel >= PermissionLevel.moderator) && <div>
                <button onClick={handleDelete}>Törlés</button></div>}
        </div>
    )
}

export default FeedCard