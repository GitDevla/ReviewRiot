import Layout from '@/component/Layout';
import MovieBar from '@/component/MovieBar';
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
                    <MovieBar movies={hotMovies} />
                </div>
                <div>
                    <h2>Top filmek ⭐</h2>
                    <MovieBar movies={topMovies} />
                </div>
                <footer className='center'>
                    <p><Link href={"/dev"}>Fejlesztő vagyok</Link> | <Link href={"/docs.pdf"} target={'_blank'}>Dokumentáció</Link> | <Link href={"https://github.com/GitDevla/ReviewRiot"} target={'_blank'}>GitHub</Link></p>
                    <p> Copyright © 2023 Pataki Dávid Ferenc. Minden jog fenntartva.</p>
                </footer>
            </div>
        </Layout >
    )
}

export default HomePage;