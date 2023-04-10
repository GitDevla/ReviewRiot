import React from 'react'
import styles from '@/styles/movieCard.module.scss';
import router from 'next/router';
import { MovieWithDataModel } from '@/interface/MovieWithData';
import StarRating from '../input/StarRating';

function MovieCard({ movie }: { movie: MovieWithDataModel }) {
    function open() {
        router.push("/movie/" + movie.id)
    }

    return (
        <div key={movie.id} className={styles.card} style={{ textAlign: "center" }} onClick={() => open()}>
            <div className={styles.card_inside}>
                <div>
                    <img className='movieCover' src={movie.imagePath} alt={movie.name} width={880} height={640} />
                </div>
                <span style={{ whiteSpace: "nowrap" }}><>{movie.name} ({movie.release})</></span>
            </div>
            <div className={styles.card_hover}>
                <div><b>{movie.name}</b></div>
                <div><>({movie.release})</></div>
                <div>
                    {movie.genres.map(i => <div className={"genreTag"} key={i.id}>{i.name}</div>)}
                </div>
                <div style={{ position: "absolute", "bottom": "0", left: "0", right: "0" }}><StarRating value={movie.data.rating} /></div>
            </div>
        </div>
    )
}

export default MovieCard