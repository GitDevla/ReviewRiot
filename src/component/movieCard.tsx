import { MovieModel } from '@/model/MovieModel'
import React from 'react'
import Image from 'next/legacy/image';
import styles from './movieCard.module.css';

function movieCard(movie: MovieModel) {
    return (
        <div key={movie.id} className={styles.card}>
            <div>
                <img src={movie.imagePath} alt="" />
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

export default movieCard