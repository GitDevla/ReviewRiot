import { MovieModel } from '@/model/MovieModel'
import React from 'react'
import Image from 'next/legacy/image';
import styles from '@/styles/movieCard.module.css';

function MovieCard(movie: MovieModel) {
    return (
        <div key={movie.id} className={styles.card}>
            <div>
                <Image src={movie.imagePath} alt={movie.name} layout="responsive" width={300} height={450}
                    quality={50}
                    priority={true} />
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