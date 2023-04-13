import MovieCardFr2 from '@/component/card/MovieCardFr2';
import Layout from '@/component/Layout';
import Title from '@/component/Title';
import { MovieWithDataModel } from '@/interface/MovieWithData';
import { Fetch } from '@/util/frontend/Fetch';
import Link from 'next/link';
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
        event.currentTarget.scrollBy({
            left: event.deltaY < 0 ? -30 : 30,
        });
    }

    return (
        <Layout>
            <Title>Főoldal</Title>
            <div>
                <div>
                    <h1>Üdvözöllek a ReviewRiot film értékelő honlapon!</h1>
                    <p>Az oldalunkon a legnépszerűbb filmeket, valamint az általunk legjobban ajánlott alkotásokat gyűjtöttük össze, hogy segítsünk neked megtalálni azokat a filmeket, amelyeket érdemes megnézni.</p>
                    <p>Az oldalunk folyamatosan frissülő tartalommal vár és célunk az, hogy minél szélesebb körű információkkal szolgáljunk a legkülönfélébb filmekkel kapcsolatban. Olvass el értékeléseket és írj te is véleményt a kedvenc filmjeidről, vagy fedezz fel új, izgalmas alkotásokat! Böngéssz az általunk ajánlott filmek között, vagy keress konkrét címeket a keresőmező segítségével.</p>
                    <p>Köszönjük, hogy velünk tartasz!</p>
                </div>
                <div>
                    <h2>Felkapott filmek 🔥</h2>
                    {hotMovies.length != 0 ? <div style={{ display: "flex", width: "100%", padding: "45px", overflowX: "auto", whiteSpace: "nowrap" }} onWheel={transformScroll}>
                        {hotMovies.map(i => <div key={i.id} style={{ height: "200px", margin: "0 20px" }}><MovieCardFr2 movie={i} /></div>)}
                    </div> : <p>Még nincs</p>}
                </div>
                <div>
                    <h2>Top filmek ⭐</h2>
                    {topMovies.length != 0 ? <div style={{ display: "flex", width: "100%", padding: "45px", overflowX: "auto", whiteSpace: "nowrap" }} onWheel={transformScroll}>
                        {topMovies.map(i => <div key={i.id} style={{ height: "200px", margin: "0 20px" }}><MovieCardFr2 movie={i} /></div>)}
                    </div> : <p>Még nincs</p>}
                </div>
                <footer style={{ textAlign: 'center' }}>
                    <p><Link href={"/dev"}>Fejlesztő vagyok</Link> | <Link href={"/docs.pdf"}>Dokumentáció</Link></p>
                    <p>Copyright © 2023 Pataki Dávid Ferenc. Minden jog fenntartva.</p>
                </footer>
            </div>
        </Layout >
    )
}

export default HomePage;