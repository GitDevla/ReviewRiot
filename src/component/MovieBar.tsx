import { MovieWithDataModel } from '@/interface/MovieWithData'
import React from 'react'
import MovieCardFr2 from './card/MovieCardFr2'

function MovieBar({ movies }: { movies: MovieWithDataModel[] }) {
    function transformScroll(event: any) {
        event.currentTarget.scrollBy({
            left: event.deltaY < 0 ? -30 : 30,
        });
    }
    return (
        movies.length != 0 ?
            <div className='flex w-100' style={{ padding: "45px", overflowX: "auto", whiteSpace: "nowrap" }} onWheel={transformScroll}>
                {movies.map(i => <div key={i.id} style={{ height: "200px", margin: "0 20px" }}><MovieCardFr2 movie={i} /></div>)}
            </div> :
            <p>Még nincs</p>
    )
}

export default MovieBar