import React from 'react'
import styles from '@/styles/movieCard.module.scss';
import cardStyle from '@/styles/feedCard.module.scss';
import router from 'next/router';
import { MovieWithDataModel } from '@/interface/MovieWithData';
import StarRating from '../input/StarRating';

function MovieCardFr2({ movie }: { movie: MovieWithDataModel }) {
    function open() {
        router.push("/movie/" + movie.id)
    }

    return (
        <div key={movie.id} className={`${styles.card} ${cardStyle.card}`} style={{ boxSizing: "border-box", position: "relative", textAlign: "center", display: "flex", height: "100%", margin: 0 }} onClick={() => open()}>
            <div style={{ width: "fit-content", maxWidth: "80%", position: "relative", display: "flex", flexDirection: "column", padding: "5px" }}>
                <div><b>{movie.name}</b></div>
                <div><>({movie.release})</></div>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                    {movie.genres.map(i => <div className={"genreTag"} key={i.id}>{i.name}</div>)}
                </div>
                <div style={{ marginTop: "auto" }}><StarRating value={movie.data.rating} /></div>
            </div>
            <div style={{ height: "100%" }}>
                <img className='movieCover' style={{ height: "100%", width: "auto" }} src={movie.imagePath} alt={movie.name} width={880} height={640} />
            </div>
        </div >
    )
}

export default MovieCardFr2