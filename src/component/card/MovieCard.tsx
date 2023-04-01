import React from 'react'
import styles from '@/styles/movieCard.module.scss';
import router from 'next/router';
import { MovieWithData } from '@/interface/MovieWithData';

function MovieCard({ movie }: { movie: MovieWithData }) {
    function open() {
        router.push("/movie/" + movie.id)
    }

    return (
        <div key={movie.id} className={styles.card} onClick={() => open()}>
            <div className={styles.card_inside}>
                <div>
                    <img className='movieCover' src={movie.imagePath} alt={movie.name} width={880} height={640} />
                </div>
                <div><span><>{movie.name} ({movie.release})</></span></div>
            </div>
            <div className={styles.card_hover}>
                <div><>{movie.name}</></div>
                <div>
                    <>Kiadási dátum: {movie.release}</>
                </div>
                <div>
                    Műfajok: {movie.genres.map(i => <div className={"genreTag"} key={i.id}>{i.name}</div>)}
                </div>
                <div>
                    {movie.data.rating ? <>⭐: {movie.data.rating} a {movie.data.NOReviews} értékelésből</> : null}
                </div>
            </div>
        </div>
    )
}

export default MovieCard