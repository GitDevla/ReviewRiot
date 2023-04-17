import React from 'react'
import styles from '@/styles/movieCard.module.scss';
import router from 'next/router';
import { MovieWithDataModel } from '@/interface/MovieWithData';
import StarRating from '../input/StarRating';

function MovieCardFr2({ movie }: { movie: MovieWithDataModel }) {
    function open() {
        router.push("/movie/" + movie.id)
    }

    return (
        <div key={movie.id} className={`${styles.card} card flex h-100 m-0`} style={{ textAlign: "center", maxWidth: "400px" }} onClick={() => open()}>
            <div className='flex' style={{ width: "fit-content", maxWidth: "80%", flexDirection: "column", padding: "5px" }}>
                <div className='overflow-break'><b>{movie.name}</b></div>
                <div><>({movie.release})</></div>
                <div className='flex center flex-wrap'>
                    {movie.genres.slice(0, 3).map(i => <div className={"genreTag"} key={i.id}>{i.name}</div>)}
                </div>
                <div style={{ marginTop: "auto" }}><StarRating value={movie.data.rating} /></div>
            </div>
            <img className='movieCover h-100 w-auto' src={movie.imagePath} alt={movie.name} width={880} height={640} />
        </div >
    )
}

export default MovieCardFr2