import { MovieModel } from '@/model/MovieModel'
import React from 'react'
import styles from '@/styles/movieCard.module.css';
import { useRouter } from 'next/router';

function MovieCard({ movie }: { movie: MovieModel }) {
    const router = useRouter();
    function open() {
        router.push("/movie/" + movie.id)
    }

    return (
        <div key={movie.id} className={styles.card} onClick={() => open()}>
            <div>
                <img src={movie.imagePath} alt={movie.name} width={880} height={640} />
            </div>
            <div><>{movie.name} ({movie.release})</></div>
            <div>
                {movie.rating ? <>⭐: {movie.rating} a {movie.NOReviews} értékelésből</> : null}
            </div>
            <div>
                {movie.genres}
            </div>
        </div>
    )
}

export default MovieCard