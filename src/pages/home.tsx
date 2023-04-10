import MovieCardFr2 from '@/component/card/MovieCardFr2';
import Layout from '@/component/Layout';
import Title from '@/component/Title';
import { MovieWithDataModel } from '@/interface/MovieWithData';
import { Fetch } from '@/util/frontend/Fetch';
import React, { useEffect, useState } from 'react'

function HomePage() {
    const [hotMovies, setHotMovies] = useState([] as MovieWithDataModel[])
    const [topMovies, setTopMovies] = useState([] as MovieWithDataModel[])

    useEffect(() => {
        async function getHotMovies() {
            const res = await Fetch.GET("/api/movie?page=0&max=5&order=hot");
            const json = await res.json();
            setHotMovies(json.movies);
        }

        async function getTopMovies() {
            const res = await Fetch.GET("/api/movie?page=0&max=5&order=top");
            const json = await res.json();
            setTopMovies(json.movies.filter((i: MovieWithDataModel) => i.data.rating));
        }
        getHotMovies();
        getTopMovies();
    }, [])

    function transformScroll(event: any) {
        const scrollAmount = event.deltaY * 4;
        const currentScrollLeft = event.currentTarget.scrollLeft;
        const newScrollLeft = currentScrollLeft + scrollAmount;
        event.currentTarget.scrollTo({
            left: newScrollLeft,
            behavior: 'smooth',
        });
    }

    return (
        <Layout>
            <Title>Főoldal</Title>
            <div>
                <div>
                    <h1>Hello World!</h1>
                    <p>A backend teszteléséhez használjon <a href="https://insomnia.rest/">Insomnia</a> vagy <a href="https://www.postman.com/">Postman</a> nevezetű API tesztelő programokat.</p>
                    <p>A backend a <a href="http://localhost:3000/api">localhost:3000/api</a> URL-en találhatóak</p>
                </div>
                <div>
                    <h2>Felkapott filmek 🔥</h2>
                    <div style={{ display: "flex", width: "100%", padding: "45px", overflow: "hidden", whiteSpace: "nowrap" }} onWheel={transformScroll}>
                        {hotMovies.map(i => <div key={i.id} style={{ height: "200px", margin: "0 20px" }}><MovieCardFr2 movie={i} /></div>)}
                    </div>
                </div>
                <div>
                    <h2>Top filmek ⭐</h2>
                    <div style={{ display: "flex", width: "100%", padding: "45px", overflow: "hidden", whiteSpace: "nowrap" }} onWheel={transformScroll}>
                        {topMovies.map(i => <div key={i.id} style={{ height: "200px", margin: "0 20px" }}><MovieCardFr2 movie={i} /></div>)}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default HomePage;