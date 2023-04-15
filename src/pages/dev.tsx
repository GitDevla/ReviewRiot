import Layout from '@/component/Layout'
import Title from '@/component/Title'
import Link from 'next/link';
import React from 'react'

function DevPage() {
    function format(i: any) {
        return JSON.stringify(i, null, 4);
    }
    return (
        <Layout>
            <Title>api</Title>
            <div>
                <h1>/api/</h1>
                <p>Ez az oldal programozóknak van akik fel akarják használni az adatbázisban található adatokat.</p>
                <p>A backend teszteléséhez használjon <a href="https://insomnia.rest/" target={'_blank'}>Insomnia</a> vagy <a href="https://www.postman.com/" target={'_blank'}>Postman</a> nevezetű API tesztelő programokat.</p>
                <p>A backend a <a href="/api">/api</a> URL-en található</p>
                <details>
                    <summary>
                        <h2>API kézikönyv és jelmagyarázat</h2>
                        <span className="icon">👇</span>
                    </summary>
                    <div>
                        <h3>Jogi szintek</h3>
                        <ul>
                            <li>(semmi): Nincsen joghoz kötve</li>
                            <li>👤: Bejelentkezés kötelező</li>
                            <li>🛡️: Minimum moderátori fiókkal</li>
                            <li>🛠️: Csak admin fiókkal</li>
                        </ul>
                    </div>
                    <div>
                        <h3>Paraméter / Body / Form Jelentése</h3>
                        <p>A <b>paramétereket</b> az URLbe adjuk át, egy kérdőjellel (?) elválasztva az oldaltól és a paraméterek "és jellel" (&) elválasztva egymástol az alábbi módon:</p>
                        <pre>       /api/feed?page=0&max=20</pre>
                        <p>A <b>body</b> adatait ezzel szemben egy JSON objektumban küldjük át a kérés "body" paraméterében.</p>
                        <p>Amikor <b>form</b> paraméterről beszélek akkor pedig a "multipart/form-data" paramétereiről van szó.</p>
                    </div>
                    <div>
                        <h3>Válasz formája</h3>
                        <p>Az api válasza minding egy JSON objektum. Hiba esetén mindig hasonló a válasz teste.</p>
                        <pre>
                            {format(
                                {
                                    "error": "Mi a hiba"
                                })}
                        </pre>
                        <p>A válasz küldésekor a <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Status" target={'_blank'}>HTTP status codes</a>-által meghatározott státusz kódok be vannak tartva.</p>
                    </div>
                </details>
                <hr />
                <details>
                    <summary>
                        <h2>/auth</h2>
                        <hr />
                        <span className="icon">👇</span>
                    </summary>
                    <div>
                        <h3>POST /auth</h3>
                        <div className="card">
                            <p>A felhasználó bejelentkezéséért szolgál</p>
                            <p><b>Body</b>:</p>
                            <ul>
                                <li><b>username</b>: felhasználónév</li>
                                <li><b>password</b>: jelszó</li>
                            </ul>

                            <p><b>Válasz</b>: Token, ez set-cookie-val be is kerül a sütik közzé</p>
                        </div>
                    </div>
                    <div>
                        <h3>GET /auth 👤</h3>
                        <div className="card">
                            <p>A belépett felhasználó adatit írja ki</p>
                            <p><b>Válasz</b>: Objektum</p>
                            <pre>
                                {format(
                                    {
                                        "user": {
                                            "id": "ID",
                                            "name": "Felhasználónév",
                                            "created": "Létrehozás idő",
                                            "description": "Leírás",
                                            "picturePath": "Profilkép"
                                        }
                                    }
                                )}
                            </pre>
                        </div>
                    </div>
                </details>
                <details>
                    <summary>
                        <h2>/feed</h2>
                        <hr />
                        <span className="icon">👇</span>
                    </summary>
                    <div>
                        <h3>GET /feed 👤</h3>
                        <div className='card'>
                            <p>A bejelentkezett felhasználó bejegyzéslistája. Ez lehetőseg "oldalakra" van tördelve</p>
                            <p><b>Paraméterek</b>:</p>
                            <ul>
                                <li><b>page</b>: oldal száma (alapból:0)</li>
                                <li><b>max</b>: egy oldalon mennyi bejegyzés legyen (alapból:20) (-1 megadása esetén mindent kiír)</li>
                            </ul>
                            <p><b>Válasz</b>: Objektum tömb</p>
                            <pre>
                                {format(
                                    {
                                        "id": "ID",
                                        "rating": "Értékelés 1-5",
                                        "description": "Értéklés szövege",
                                        "createDate": "Értéklés létrehozásának dátuma",
                                        "author": {
                                            "id": "Szerző ID",
                                            "name": "Fehasználónév",
                                            "picturePath": "Profilkép"
                                        },
                                        "movie": {
                                            "id": "Értékelt film ID",
                                            "name": "Film név",
                                            "genres": ["Műfaj tömb"],
                                            "imagePath": "Film borítókép"
                                        }
                                    }
                                )}[]
                            </pre>
                            <p><b>Példa:</b></p>
                            <div className='code'>
                                <span>/api/feed?page=0&max=1</span>
                                <pre>{
                                    format({
                                        "feed": [
                                            {
                                                "id": 12,
                                                "rating": 5,
                                                "description": "Nagyon ajánlom mindenkinek!",
                                                "createDate": "2023-04-12T18:17:27.000Z",
                                                "author": {
                                                    "id": 1,
                                                    "name": "admin",
                                                    "picturePath": "/image/user/default.png"
                                                },
                                                "movie": {
                                                    "id": 82,
                                                    "name": "Your Name.",
                                                    "genres": [],
                                                    "imagePath": "/image/movie/012b2a66-a3b6-416c-bd05-9a176e4c4f78.jpg"
                                                }
                                            }
                                        ]
                                    })}
                                </pre>
                            </div>
                        </div>
                    </div>
                </details>
                <details>
                    <summary>
                        <h2>/genre</h2>
                        <hr />
                        <span className="icon">👇</span>
                    </summary>
                    <div>
                        <h3>GET /genre</h3>
                        <div className='card'>
                            <p>Összes műfaj kilistázva</p>
                            <p><b>Válasz</b>: Objektum tömb {format({ "id": "ID", "name": "Név" })}[]</p>
                        </div>
                    </div>
                </details>
                <details>
                    <summary>
                        <h2>/movie</h2>
                        <hr />
                        <span className="icon">👇</span>
                    </summary>
                    <h3>GET /movie</h3>
                    <div className='card'>
                        <p>Filmek listázása és filterezése</p>
                        <p><b>Paraméterek</b>:</p>
                        <ul>
                            <li><b>page</b>: oldal száma (alapból:0)</li>
                            <li><b>max</b>: egy oldalon mennyi film legyen (alapból:20) (-1 megadása esetén mindent kiír)</li>
                            <li><b>order</b>: milyen sorrendben írja ki a filmeket:
                                <ol>
                                    <li><b>name</b>: ABC sorrend (alap)</li>
                                    <li><b>dname</b>: ABC sorrend visszafele</li>
                                    <li><b>new</b>: legújabak szerint</li>
                                    <li><b>old</b>: legrégebbiek szerint</li>
                                    <li><b>top</b>: toplista szerint</li>
                                    <li><b>hot</b>: legfelkapottak szerint</li>
                                </ol>
                            </li>
                            <li><b>filterName</b>: Milyen szónak kell benne lennie a filmben</li>
                            <li><b>filterGenres</b>: Egy szám tömb ami meghatározza milyen műfajainak kell lennie a filmnek</li>
                            <li><b>onlyName</b>: Ha igaz, akkor az összes film nevét és id-jét kapjuk vissza csak</li>
                        </ul>

                        <p><b>Válasz</b>: Komplex objektum</p>
                        <pre>
                            {format(
                                {
                                    "movies": [
                                        {
                                            "id": "ID",
                                            "name": "Film név",
                                            "release": "Kijövetélen éve",
                                            "genres": ["Műfaj tömb"],
                                            "imagePath": "Borítókép",
                                            "data": {
                                                "rating": "Átlag értékelés",
                                                "NOReviews": "Értéklések száma",
                                                "NOReviewsLastWeek": "Értéklések az utolsó hétben",
                                                "rank": "Hanyadik a toplistán"
                                            }
                                        }
                                    ]
                                })}
                        </pre>
                        <p><b>Példa:</b></p>
                        <div className='code'>
                            <span>/api/movie?page=0&max=1&order=name&filterName=12&filterGenres=10</span>
                            <pre>{
                                format({
                                    "movies": [
                                        {
                                            "id": 5,
                                            "name": "12 Angry Men",
                                            "release": 1957,
                                            "genres": [
                                                {
                                                    "id": "10",
                                                    "name": "Krimi"
                                                },
                                                {
                                                    "id": "3",
                                                    "name": "Dráma"
                                                }
                                            ],
                                            "imagePath": "/image/movie/78e437e3-1050-4542-ab72-00a5e897e446.jpg",
                                            "data": {
                                                "rating": null,
                                                "NOReviews": 0,
                                                "NOReviewsLastWeek": 0,
                                                "rank": null
                                            }
                                        }
                                    ]
                                })}
                            </pre>
                        </div>
                    </div>
                    <h3>GET /movie/[id]</h3>
                    <div className='card'>
                        <p>Egy film lekérése és értékeléseinek listázása</p>
                        <p><b>Paraméterek</b>:</p>
                        <ul>
                            <li><b>page</b>: oldal száma (alapból:0)</li>
                            <li><b>max</b>: egy oldalon mennyi értékelés legyen (alapból:20) (-1 megadása esetén mindent kiír)</li>
                        </ul>

                        <p><b>Válasz</b>: Komplex objektum</p>
                        <pre>
                            {format(
                                {
                                    "movie": {
                                        "id": "ID",
                                        "name": "Film név",
                                        "release": "Kijövetélen éve",
                                        "genres": ["Műfaj tömb"],
                                        "imagePath": "Borítókép",
                                        "data": {
                                            "rating": "Átlag értékelés",
                                            "NOReviews": "Értéklések száma",
                                            "NOReviewsLastWeek": "Értéklések az utolsó hétben",
                                            "rank": "Hanyadik a toplistán"
                                        }
                                    },
                                    "reviews": [
                                        {
                                            "id": "ID",
                                            "rating": "Értékelés 1-5",
                                            "description": "Értéklés szövege",
                                            "create": "Értéklés létrehozásának dátuma",
                                            "author": {
                                                "id": "Szerző ID",
                                                "name": "Fehasználónév",
                                                "picturePath": "Profilkép"
                                            },
                                        }
                                    ]
                                })}
                        </pre>
                        <p><b>Példa:</b></p>
                        <div className='code'>
                            <span>/api/movie/180?page=0&max=1</span>
                            <pre>{
                                format({
                                    "movie": {
                                        "id": 180,
                                        "name": "12 Years a Slave",
                                        "release": 2013,
                                        "genres": [
                                            {
                                                "id": "34",
                                                "name": "Disztópia"
                                            },
                                            {
                                                "id": "3",
                                                "name": "Dráma"
                                            }
                                        ],
                                        "imagePath": "/image/movie/7e690b44-206c-4da6-80d5-9fabcd906d7b.jpg",
                                        "data": {
                                            "rating": 3,
                                            "NOReviews": 1,
                                            "NOReviewsLastWeek": 1,
                                            "rank": 2
                                        }
                                    },
                                    "reviews": [
                                        {
                                            "id": 12,
                                            "authorID": 1,
                                            "movieID": 180,
                                            "rating": 3,
                                            "description": "Nagyon ajánlom mindenkinek!",
                                            "create": "2023-04-12T18:17:27.000Z",
                                            "author": {
                                                "id": 1,
                                                "name": "admin",
                                                "picturePath": "/image/user/default.webp",
                                            }
                                        }
                                    ]
                                })}
                            </pre>
                        </div>
                    </div>
                    <h3>POST /movie</h3>
                    <div className='card'>
                        <p>Új film készítése</p>
                        <p><b>Body</b>:</p>
                        <ul>
                            <li><b>name</b>: Film neve</li>
                            <li><b>date</b>: Film kíjövetelének éve</li>
                        </ul>
                    </div>
                    <h3>PUT /movie/[id]</h3>
                    <div className='card'>
                        <p>Film frissitése</p>
                        <p><b>Form</b>:</p>
                        <ul>
                            <li><b>name</b>: Film neve</li>
                            <li><b>release</b>: Film kíjövetelének éve</li>
                            <li><b>genres</b>: Műfaj, számtömb</li>
                            <li><b>file</b>: Borítókép, kép fájl 2mb alatt</li>
                        </ul>
                    </div>
                </details>
                <details>
                    <summary>
                        <h2>/permission</h2>
                        <hr />
                        <span className="icon">👇</span>
                    </summary>
                    <div>
                        <h3>GET /permission 👤</h3>
                        <div className='card'>
                            <p>A belépett fiók jogi szintjét adja vissza</p>
                            <p><b>Válasz</b>: Objektum {format({ "level": "Szint" })}</p>
                        </div>
                    </div>
                    <div>
                        <h3>GET /permission?all=true</h3>
                        <div className='card'>
                            <p>Az összes lehetséges jogi szint listázása</p>
                            <p><b>Válasz</b>: Objektum tömb {format({ "id": "ID", "name": "Név", "level": "Szint" })}[]</p>
                        </div>
                    </div>
                    <div>
                        <h3>PUT /permission 🛠️</h3>
                        <div className='card'>
                            <p>Más fiókok jogi szintjének változatása</p>
                            <p><b>Paraméterek</b>:</p>
                            <ul>
                                <li><b>whom</b>: melyik felhasználót akarjuk módosítani</li>
                                <li><b>permID</b>: milyen szinte akarjuk emelni</li>
                            </ul>
                        </div>
                    </div>
                </details>
                <details>
                    <summary>
                        <h2>/review</h2>
                        <hr />
                        <span className="icon">👇</span>
                    </summary>
                    <div>
                        TODO
                    </div>
                </details>
                <details>
                    <summary>
                        <h2>/search</h2>
                        <hr />
                        <span className="icon">👇</span>
                    </summary>
                    <div>
                        <h3>GET /search</h3>
                        <div className='card'>
                            <p>A keresett szövegre hasonló felhasználókat és filmek listázza</p>
                            <p><b>Paraméterek</b>:</p>
                            <ul>
                                <li><b>name</b>: a keresés szövege</li>
                            </ul>
                            <p><b>Válasz</b>: Objektum tömb {format({ "id": "ID", "name": "Név", "picture": "Kép", "type": "Felhasználó vagy film" })}[]</p>
                            <p><b>Példa:</b></p>
                            <div className='code'>
                                <span>/api/search?name=12</span>
                                <pre>{
                                    format([
                                        { "id": 3, "name": "123456789012345678901234567890", "picture": null, "type": "user" },
                                        { "id": 5, "name": "12 Angry Men", "picture": "78e437e3-1050-4542-ab72-00a5e897e446.jpg", "type": "movie" },
                                    ])}
                                </pre>
                            </div>
                        </div>
                    </div>
                </details>
                <details>
                    <summary>
                        <h2>/user</h2>
                        <hr />
                        <span className="icon">👇</span>
                    </summary>
                    <div>
                        TODO
                    </div>
                </details>
            </div>
        </Layout >
    )
}

export default DevPage